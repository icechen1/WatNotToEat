'use strict';

angular.module('core').controller('HeaderController', ['$scope','$http','$location', 'Menus',
	function($scope,$http,$location, Menus) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
        // Any function returning a promise object can be used to load values asynchronously
        $scope.searchRestaurants = function(val) {
        var url = '/restaurants/search/' + val;
        return $http.get(url).then(function(response){
            return response.data;
        });
        };

        $scope.goToDetailsPage = function (item, model, label){
            $location.path('/restaurants/'+item._id);
        }
	}
]);
