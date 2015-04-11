'use strict';

angular.module('angularPassportService')
    .factory('Auth', function Auth($location, $rootScope, Session, User, Admin, $cookieStore, $http) {
        $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');

        return {

            login: function(user, callback) {
                var cb = callback || angular.noop;
                Session.save({
                    email: user.email,
                    password: user.password
                }, function(user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },


            groups: function() {
                return $http.get('/devops/group');
            },

            stacks: function() {
                return $http.get('/devops/stack');
            },

            instances: function() {
                return $http.get('/devops/instance');
            },

            deploys: function() {
                return $http.get('/devops/deploy');
            },

            logout: function(callback) {
                var cb = callback || angular.noop;
                Session.delete(function(res) {
                    $rootScope.currentUser = null;
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            createUser: function(userinfo, callback) {
                var cb = callback || angular.noop;
                User.save(userinfo, function(user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            createAdminUser: function(userinfo, callback) {
                var cb = callback || angular.noop;
                Admin.save(userinfo, function(user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            currentUser: function() {
                Session.get(function(user) {
                    $rootScope.currentUser = user;
                });
            },

            changePassword: function(email, oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;
                User.update({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function(user) {
                    console.log('password changed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },

            removeUser: function(email, password, callback) {
                var cb = callback || angular.noop;
                User.delete({
                    email: email,
                    password: password
                }, function(user) {
                    console.log(user + 'removed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            }
        };
    });