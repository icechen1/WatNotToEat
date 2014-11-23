'use strict';

// Restaurants controller
angular.module('restaurants').controller('RestaurantsController', ['$scope', '$stateParams', '$location', 'Restaurants',
	function($scope, $stateParams, $location, Restaurants) {
		// Find a list of Restaurants
		$scope.find = function() {
			$scope.restaurants = Restaurants.query();
		};

		// Find existing Restaurant
		$scope.findOne = function() {
			$scope.restaurant = Restaurants.get({ 
				restaurantId: $stateParams.restaurantId
			});
		};
	}
]);