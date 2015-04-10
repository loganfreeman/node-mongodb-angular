'use strict';

angular
    .module( 'theme.pages-controllers', ['angularPassportService'] )
    .controller( 'SignupPageController', ['$location', '$scope', '$global', '$rootScope', 'Auth', function($location, $scope, $global, $rootScope, Auth) {

            $scope.user = {};

            $global.set( 'fullscreen', true );

            $scope.$on( '$destroy', function() {
                $global.set( 'fullscreen', false );
            } );

            $scope.logIn = function(form) {
                Auth.login( {
                    'email': $scope.user.email,
                    'password': $scope.user.password
                }, function(err) {
                        $scope.errors = {};

                        if (!err) {
                            $location.path( '/' );
                        } else {
                            angular.forEach( err.errors, function(error, field) {
                                form[field].$setValidity( 'mongoose', false );
                                $scope.errors[field] = error.type;
                            } );
                        }
                    } );
            };

            $scope.signUp = function(form) {
                //console.log( $scope.user );
                Auth.createUser( $scope.user, function(err) {
                    if (!err) {
                        $location.path( '/' );
                    } else {
                        alert( err );
                    }
                } );
            };

            $scope.adminSignUp = function(form) {
                //console.log( $scope.user );
                Auth.createAdminUser( $scope.user, function(err) {
                    if (!err) {
                        $location.path( '/' );
                    } else {
                        alert( err );
                    }
                } );
            };

            $scope.signUpBtnClicked = function() {
                $location.path( '/extras-signupform' );
            };
    }] )
    .controller( 'RegistrationPageController', ['$scope', '$timeout', function($scope, $timeout) {
            $scope.checking = false;
            $scope.checked = false;
            $scope.checkAvailability = function() {
                if ($scope.reg_form.username.$dirty == false) return;
                $scope.checking = true;
                $timeout( function() {
                    $scope.checking = false;
                    $scope.checked = true;
                }, 500 );
            };
    }] )
    .controller( 'ChatRoomController', ['$scope', '$timeout', function($scope, $t) {
            var eliza = new ElizaBot();
            var avatars = ['potter.png', 'tennant.png', 'johansson.png', 'jackson.png', 'jobs.png'];
            $scope.messages = [];
            $scope.userText = '';
            $scope.elizaTyping = false;
            $scope.elizaAvatar = 'johansson.png';

            $scope.sendMessage = function(msg) {
                var im = {
                    class: 'me',
                    avatar: 'jackson.png',
                    text: msg
                };
                this.messages.push( im );
                this.userText = '';

                $t( function() {
                    $scope.elizaAvatar = _.shuffle( avatars ).shift();
                    $scope.elizaTyping = true;
                }, 500 );

                $t( function() {
                    var reply = eliza.transform( msg );
                    var im = {
                        class: 'chat-success',
                        avatar: $scope.elizaAvatar,
                        text: reply
                    };
                    $scope.elizaTyping = false;
                    $scope.messages.push( im );
                }, 1200 );
            };
    }] )
    .directive( 'scrollToBottom', function() {
        return {
            restrict: 'A',
            scope: {
                model: '=scrollToBottom'
            },
            link: function(scope, element, attr) {
                scope.$watch( 'model', function(n, o) {
                    if (n != o) {
                        element[0].scrollTop = element[0].scrollHeight;
                    }
                } );
            }
        };
    } );