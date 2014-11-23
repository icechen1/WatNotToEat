'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inspections Schema
 */
var InspectionsSchema = new Schema({
	// Inspections model fields
    _id : String,
    INSPECTION_ID : String,
    FACILITYID : String,
    INSPECTION_DATE : String,
    REQUIRE_REINSPECTION : String,
    CERTIFIED_FOOD_HANDLER : String,
    INSPECTION_TYPE : String,
    CHARGE_REVOCKED : String,
    Actions : String,
    CHARGE_DATE : String
});

mongoose.model('inspections', InspectionsSchema);
