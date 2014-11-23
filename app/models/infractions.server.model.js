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
	// ...
});

mongoose.model('infractions', InfractionsSchema);
