angular.module('theme.pages-controllers').controller('instanceManagementController',

	['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon',
		function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
			// TODO: 
			Auth.instances()
				.then(function(instances) {

					$scope.instances = instances.data;
				});

			$scope.applyIconClass = applyIcon;
		}
	]
);