'use strict';


angular.module('core').controller('HomeController', ['$scope','uiGmapGoogleMapApi',
	function($scope, uiGmapGoogleMapApi) {
        $scope.map = { center: { latitude: 43.4500, longitude: -80.4833 }, zoom: 12,showKml: true };
        $scope.FusionTablesLayerOptions = {
            query: {
              select: 'geometry',
              from: '13UWrpziJArgWCQeZJSvpuwXpoVmCDKl2T_x96HQj'
            }
        };
         // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
        });
	}
                                                     
]);