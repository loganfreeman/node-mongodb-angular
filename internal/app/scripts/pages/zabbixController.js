'use strict';
angular
    .module( 'theme.zabbix-controllers', ['rx', 'angularPassportService'] )
    .controller( 'zabbixController', function($scope, zabbixService, $http) {

        $scope.editableInPopup = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="edit(row)" >Get Items</button> ';

        $scope.edit = function edit(row) {
            console.log( 'Here I need to know which button was selected ' + row.entity.dns );
            $scope.getItems( row.entity.hostid );
        };


        $scope.getItems = function(hostid) {
            zabbixService.getItems( hostid )
                .success( function(items) {
                    $scope.items = items;
                } );
        };


        $scope.filterOptions = {};


        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [{
                field: 'interfaceid',
                displayName: 'interfaceid'
                }, {
                field: 'hostid',
                displayName: 'hostid',
                }, {
                field: 'ip',
                displayName: 'ip',
                },
                {
                    field: 'dns',
                    displayName: 'dns',
                },
                {
                    field: 'port',
                    displayName: 'port',
                },
                {
                    displayName: 'Get Items',
                    cellTemplate: $scope.editableInPopup
            }]
        };

        $scope.hostGroupOptions = {
            data: 'hostGroups',
            enablePaging: false,
            showFooter: true
        };

        $scope.itemOptions = {
            data: 'items',
            enablePaging: false,
            showFooter: true,
            columnDefs: [{
                field: 'itemid',
                displayName: 'itemid'
                }, {
                field: 'type',
                displayName: 'type',
                }, {
                field: 'name',
                displayName: 'name',
                },
                {
                    field: 'key_',
                    displayName: 'Key',
                },
                {
                    field: 'lastvalue',
                    displayName: 'lastvalue',
                },
                {
                    field: 'lastclock',
                    displayName: 'lastclock',
                    type: 'date',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                },
                {
                    field: 'value_type',
                    displayName: 'value_type',
                },
                {
                    field: 'description',
                    displayName: 'description',
                },
                {
                    field: 'error',
                    displayName: 'error',
                }
            ]
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