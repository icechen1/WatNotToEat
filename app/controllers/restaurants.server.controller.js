'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Restaurant = mongoose.model('facilities'),
    Infraction = mongoose.model('infractions'),
    Inspection = mongoose.model('inspections'),
	_ = require('lodash'),
    async = require('async');
/**
 * Show the current Restaurant
 */
exports.read = function(req, res) {
	res.jsonp(req.restaurant);
};

/**
 * Update a Restaurant
 */
exports.update = function(req, res) {
	var restaurant = req.restaurant ;

	restaurant = _.extend(restaurant , req.body);

	restaurant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restaurant);
		}
	});
};

/**
 * List of Restaurants
 * .populate('ADDR', 'CITY')
 */
exports.list = function(req, res) { 
	Restaurant.find().sort('BUSINESS_NAME').exec(function(err, restaurants) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(restaurants);
		}
	});
};

/**
 * Find Restaurants By Name
 */
exports.search = function(req, res) {
	res.jsonp(req.results);
};

/**
 * Restaurant middleware
 * .populate('ADDR', 'CITY')
 */
exports.findByName = function(req, res, next, val) {
    console.log('Search for '+ val);
	Restaurant.find({BUSINESS_NAME:new RegExp(val, 'i')}).limit(10).select('BUSINESS_NAME _id').sort('BUSINESS_NAME').exec(function(err, restaurants) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.results = (restaurants);
            console.log('Results '+ restaurants);
            next();
		}
	});
};

exports.findInfractions = function(inspection,callback) {
    var Id = inspection.INSPECTION_ID.toString();
    inspection = inspection.toObject();
    //console.log('Finding: ' + Id);
    //console.log('Finding: ' + '{1B5F190A-0B96-4041-BF97-0000A4BA5DC3}');
    //find infractions
    Infraction.find({INSPECTION_ID:Id}).exec(function(err, infraction) {
    if (err) return callback(err,null);
    if (! infraction) return callback(new Error('Failed to load infraction ' + Id),null);
        //console.log('Found: ' + infraction);
        inspection.infraction = infraction;
        callback(null,inspection);
    });
};
/**
 * Restaurant middleware
 * .populate('ADDR', 'CITY')
 */
exports.restaurantByID = function(req, res, next, id) { 
	Restaurant.findById(id).exec(function(err, restaurant) {
		if (err) return next(err);
		if (! restaurant) return next(new Error('Failed to load Restaurant ' + id));
		req.restaurant = restaurant.toObject() ;
        //console.log(restaurant);
        //find inspections
        Inspection.find({FACILITYID:req.restaurant.FACILITYID}).exec(function(err, inspection) {
        if (err) return next(err);
        if (! inspection) return next(new Error('Failed to load Inspection ' + id));
            //req.restaurant.inspection = inspection;
            async.map(inspection, exports.findInfractions, function (err, result) {
              if(!err) {
                req.restaurant.inspection = result;
                //console.log('Finished: ' + result);
                next();
              } else {
                console.log('Error: ' + err);
                next(err);
              }

            });
        });
	});
};

/**
 * Restaurant authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.restaurant.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
