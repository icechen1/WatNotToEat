'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Infractions Schema
 */
var InfractionsSchema = new Schema({
	// Infractions model fields
    _id : String,
    INFRACTION_ID : String,
    INSPECTION_ID : String,
    INFRACTION_TYPE : String,
    category_code : String,
    letter_code : String,
    Description1 : String,
    InspectionDate : String,
    ChargeDetails : String
});

mongoose.model('infractions', InfractionsSchema);
