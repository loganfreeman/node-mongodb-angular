'use strict';
angular
    .module( 'theme.zabbix-controllers', ['rx', 'angularPassportService'] )
    .controller( 'zabbixController', function($scope, zabbixService, $http) {

        $scope.filterOptions = {};


        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions
        };

        $scope.hostGroupOptions = {
            data: 'hostGroups',
            enablePaging: false,
            showFooter: true
        };

        $scope.filterOptions = {
            groupids: '',
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [25, 50, 100],
            pageSize: 25,
            currentPage: 1
        };

        $scope.setHostGroups = function() {
            zabbixService.getHostGroups( {} )
                .success( function(data) {
                    $scope.hostGroups = data;
                } );
        };

        $scope.setHostGroups();

        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice( (page - 1) * pageSize, page * pageSize );
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };


        $scope.getPagedDataAsync = function(pageSize, page, searchText) {
            setTimeout( function() {

                var options = {};

                if ($scope.filterOptions.groupids) {
                    options.groupids = $scope.filterOptions.groupids;
                }

                zabbixService.getHostInterfaces( options )
                    .success( function(data) {
                        $scope.setPagingData( data, page, pageSize );
                    } );
            }, 100 );
        };

        $scope.getPagedDataAsync( $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage );

        $scope.$watch( 'pagingOptions', function(newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync( $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText );
            }
        }, true );
        $scope.$watch( 'filterOptions', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync( $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText );
            }
        }, true );

    } );