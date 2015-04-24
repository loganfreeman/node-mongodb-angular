'use strict';
angular
    .module( 'theme.zabbix-controllers', ['rx', 'angularPassportService'] )
    .constant( 'valueType', {
        // Zabbix value_types:
        // 0 - numeric float;
        // 1 - character;
        // 2 - log;
        // 3 - numeric unsigned;
        // 4 - text.
        dataType: ['n', 'c', 'c', 'n', 'c'],
        dataTypeDisplay: ['numeric float', 'character', 'log', 'numeric unsigned', 'text']
    } )
    .constant( 'searchKey', {
        totalMemory: 'vm.memory.size[total]',
        sharedMemory: 'vm.memory.size[shared]',
        freeMemory: 'vm.memory.size[free]',
        cachedMemory: 'vm.memory.size[cached]',
        bufferMemory: 'vm.memory.size[buffers]',
        totalDisk: 'vfs.fs.size[/usr,total]',
        usedDisk: 'vfs.fs.size[/u,pused]',
        usedConnected: 'system.users.num',
        systemUptime: 'system.uptime',
        processedRunning: 'proc.num[zabbix_agentd]',
        incomingTraffic: 'net.if.in[eth0,bytes]',
        outcomingTraffic: 'net.if.out[eth0,bytes]'
    } )
    .filter( 'dataTypeFilter', function(valueType) {
        return function(input) {
            return valueType.dataTypeDisplay[input];
        };
    } )
    .controller( 'zabbixController', function($scope, zabbixService, $http, valueType, searchKey) {

        $scope.data_type = valueType.dataType;

        $scope.editableInPopup = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="edit(row)" >Get Items</button> ';

        $scope.showItemPopup = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="show(row)" >Show Item</button> ';

        $scope.edit = function edit(row) {
            console.log( 'Here I need to know which button was selected ' + row.entity.dns );
            $scope.getItems( row.entity.hostid );
        };

        $scope.show = function(row) {
            zabbixService.getItem( row.entity.itemid )
                .success( function(item) {
                    console.log( item );
                } );
        };

        $scope.showMemory = function(row) {
            zabbixService.getItemByKey( row.entity.hostid )
                .success( function(item) {
                    console.log( item );
                } );
        };


        $scope.getItems = function(hostid) {
            zabbixService.getItems( hostid )
                .success( function(items) {
                    $scope.items = items;

                    angular.forEach( items, function(item, index) {
                        $scope.itemMap[item.itemid] = {
                            'index': index,
                            'name': item.name,
                            'key': item.key_,
                            'units': item.units,
                            'value_type': item.value_type,
                            'data_type': $scope.data_type[item.value_type]
                        };
                    } );
                } );
        };

        $scope.itemMap = {};


        $scope.filterOptions = {};


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
                }
            ]
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
                    field: 'units',
                    displayName: 'units',
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
                    cellFilter: 'dataTypeFilter'
                },
                {
                    field: 'description',
                    displayName: 'description',
                },
                {
                    field: 'error',
                    displayName: 'error',
                },
                {
                    displayName: 'Show',
                    cellTemplate: $scope.showItemPopup
                }
            ]
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