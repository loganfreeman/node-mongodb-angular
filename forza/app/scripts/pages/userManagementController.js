angular.module('theme.pages-controllers').controller('userManagementController',

	['$q', '$location', '$scope', '$global', '$rootScope', 'Auth', '$http', function($q, $location, $scope, $global, $rootScope, Auth, $http) {
		// TODO: 
		console.log('In User Management Controller');
		Auth.groups()
			.then(function(groups) {


				var promises = [];
				angular.forEach(groups.data, function(value, key) {
					var group = value;
					var promise = $q(function(resolve, reject) {
						$http.get('/devops/group/{groupId}/users'.replace('{groupId}', group._id)).then(function(users) {
							group.users = users.data;
							resolve(group);
						})
					});
					promises.push(promise);
				});

				$q.all(promises).then(function(groups) {
					//console.log(groups);
					$scope.groups = groups;
				})
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