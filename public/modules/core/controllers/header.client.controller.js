'use strict';

angular.module('core').controller('HeaderController', ['$scope','$http', 'Menus',
	function($scope,$http, Menus) {
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
        return $http.get('/', {
          params: {
            val: val
          }
        }).then(function(response){
          return response.data.results.map(function(item){
            return item.BUSINESS_NAME;
          });
        });
        };
	}
]);
