'use strict';

angular.module('angularPassportService')
    .factory('Auth', function Auth($location, $rootScope, Session, User, Admin, $cookieStore, $http, $q) {
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

            users: function() {
                return $http.get('devops/users');
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

            createStack: function(stack) {
                return $http.put('/devops/stack', stack);
            },

            createInstance: function(instance) {
                return $http.put('/devops/instance', instance);
            },

            createGroup: function(group) {
                return $http.put('/devops/group', group);
            },

            createDeploy: function(deploy) {
                return $http.put('/devops/deploy', deploy);
            },

            createUser: function(userinfo) {
                return $http.post('/auth/users', userinfo);
            },

            currentUser: function() {
                Session.get(function(user) {
                    $rootScope.currentUser = user;
                });
            },

            updateUser: function(userId, data) {
                var url = '/devops/user/{userId}'.replace('{userId}', userId);
                return $http.post(url, data);

            },

            updateStack: function(stackId, data) {
                var url = '/devops/stack/{stackId}'.replace('{stackId}', stackId);
                return $http.post(url, data);
            },

            updateInstance: function(instanceId, data) {
                var url = '/devops/instance/{instanceId}'.replace('{instanceId}', instanceId);
                return $http.post(url, data);
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