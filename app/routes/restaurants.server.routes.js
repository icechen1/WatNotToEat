'use strict';

module.exports = function(app) {
	var restaurants = require('../../app/controllers/restaurants.server.controller');

	// Restaurants Routes
	app.route('/restaurants')
		.get(restaurants.list);

	app.route('/restaurants/:restaurantId')
		.get(restaurants.read);
	app.route('/restaurants/search/:val')
		.get(restaurants.search);

	// Finish by binding the Restaurant middleware
	app.param('restaurantId', restaurants.restaurantByID);
};
