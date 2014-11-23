'use strict';

//Setting up route
angular.module('restaurants').config(['$stateProvider',
	function($stateProvider) {
		// Restaurants state routing
		$stateProvider.
		state('listRestaurants', {
			url: '/restaurants',
			templateUrl: 'modules/restaurants/views/list-restaurants.client.view.html'
		}).
		state('viewRestaurant', {
			url: '/restaurants/:restaurantId',
			templateUrl: 'modules/restaurants/views/view-restaurant.client.view.html'
		});
	}
]);