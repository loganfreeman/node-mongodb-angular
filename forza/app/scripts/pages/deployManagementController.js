angular.module('theme.pages-controllers').controller('deployManagementController',

	['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon',
		function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
			// TODO: 
			Auth.deploys()
				.then(function(deploys) {

					$scope.deploys = deploys.data;
				});

			$scope.applyIconClass = applyIcon;
		}
	]
);