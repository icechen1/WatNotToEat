'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Restaurant Schema
 */
var RestaurantSchema = new Schema({
    FACILITYID : String,
    BUSINESS_NAME : String,
    TELEPHONE : String,
    ADDR : String,
    CITY : String,
    EATSMART : String,
    OPEN_DATE : String,
    DESCRIPTION : String
});

mongoose.model('facilities', RestaurantSchema);