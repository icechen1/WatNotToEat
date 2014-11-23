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
exports.findInfractions = function(inspection,callback) {
    console.log('Finding: ' + inspection.INSPECTION_ID);
    //find infractions
    Infraction.find({INSPECTION_ID:inspection.INSPECTION_ID}).exec(function(err, infraction) {
    if (err) return callback(err,null);
    if (! infraction) return callback(new Error('Failed to load infraction ' + id),null);
        console.log('Found: ' + infraction);
        callback(null,infraction);
    });
}
/**
 * Restaurant middleware
 * .populate('ADDR', 'CITY')
 */
exports.restaurantByID = function(req, res, next, id) { 
	Restaurant.findById(id).exec(function(err, restaurant) {
		if (err) return next(err);
		if (! restaurant) return next(new Error('Failed to load Restaurant ' + id));
		req.restaurant = restaurant ;
        //console.log(restaurant);
        //find inspections
        Inspection.find({FACILITYID:restaurant.FACILITYID}).exec(function(err, inspection) {
        if (err) return next(err);
        if (! inspection) return next(new Error('Failed to load Inspection ' + id));
            req.restaurant.inspection = inspection;
            async.map(inspection, exports.findInfractions, function (err, result) {
              if(!err) {
                console.log('Finished: ' + result);
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
