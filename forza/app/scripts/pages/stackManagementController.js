angular.module('theme.pages-controllers').controller('stackManagementController',

	['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', 'applyIcon',
		function($q, $location, $scope, $global, $rootScope, Auth, $http, applyIcon) {
			// TODO: 
			Auth.stacks()
				.then(function(stacks) {

					$scope.stacks = stacks.data;
				});

			$scope.applyIconClass = applyIcon;
		}
	]
);