angular.module('theme.pages-controllers').controller('userManagementController',

	['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', function($q, $location, $scope, $global, $rootScope, Auth) {
		// TODO: 
		console.log('In User Management Controller');
		Auth.groups()
			.then(function(groups) {
				$scope.groups = groups.data;
			});

		$scope.applyIconClass = function(obj) {
			var cls;
			switch (obj.disabled) {
				case true:
					cls = ' glyphicon-folder-close';
					break;
				default:
					cls = ' glyphicon-folder-open';
					break;
			}
			return cls;
		};
	}]
);