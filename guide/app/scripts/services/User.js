'use strict';

angular.module('angularPassportService')
	.factory('User', function($resource) {
		return $resource('/auth/users/:id/', {}, {
			'update': {
				method: 'PUT'
			}
		});
	});