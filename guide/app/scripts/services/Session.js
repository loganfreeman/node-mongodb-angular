'use strict';

angular.module('angularPassportService')
	.factory('Session', function($resource) {
		return $resource('/auth/session/');
	});