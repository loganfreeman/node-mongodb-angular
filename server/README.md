## Synopsis

Devops Restful api


## Motivation


## Documentation

```shell
npm install & grunt jsdoc
```


## Installation

```shell
cd /home/node/internal_scripts/forza
npm install 
bower install
grunt build

sudo su -
cd /home/node/internal_scripts/server
chmod o+x server.sh
./server.sh
# verify server started
ps aux | grep node | grep -v grep
forever list
```

## Run as a service
```shell
sudo su 
cp forever.sh /etc/init.d/devops-node
chmod a+x /etc/init.d/devops-node
update-rc.d devops-node defaults
service devops-node start
service devops-node restart
service devops-node status
service devops-node stop
```

## API Reference


#### POST **http://localhost:8080/login**
```
 Request body: username password as form parameter

 return logged in user in 
```

```javascript
var Promise = require( 'bluebird' );
var request = Promise.promisify( require( 'request' ) );
// request.debug = true;

var queryString = require( 'querystring' );


var postData = {
    username: 'scheng',
    password: '@33yyy'
};

var body = queryString.stringify( postData );

var options = {
    url: 'http://localhost:8081/login',
    body: body,
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
};

request( options )
    .spread( function(res, body) {
        console.log( body );
    } )
    .catch( function(err) {
        console.log( err );
    } );

```

#### GET **http://localhost:8080/logout**
```
delete the session user, redirect the user to the home page
```

#### PUT **http://locahost:8080/user**
```
 Request body: user json

 return created user in JSON
 (This is used to register a user, a user is associated with a group, group governs access level )
```

```javascript
        var user = {
            firstName: 'jelly',
            lastName: 'bean',
            name: 'jelly.bean',
            email: 'snow.white@mysteryforest.com',
            password: 'pass22'
        };


        var options = {
            url: 'http://localhost:8081/user',
            method: 'PUT',
            json: user
        };

        request( options )
            .spread( function(res, body) {
                console.log( body );
                return body; // body should be a JSON object which represents the created user
            } )
```


#### POST '/groups/:groupid/:userid'
```
add a user to a group
```

```javascript
        var options = {
            url: 'http://localhost:8081/groups/3/53',
            method: 'PUT'
        };

        request( options )
            .spread( function(res, body) {
                var group = JSON.parse( body );
                group.name.should.be.eq( 'internal' );
                done();
            } )
```

#### GET **http://localhost:8080/groups/:groupid/users**
```
 return list of users for a specific group
```



#### GET **http://locahost:8080/groups**
```
 Return list of groups in JSON ( the group visibility is governed by session user )
```

```javascript
request( 'http://localhost:8081/groups' )
            .spread( function(res, body) {
                var groups = JSON.parse( body );                
            } )
```

#### GET **http://localhost:8080/group/:id**
```
 Return the group in JSON
```
```javascript
request('http://localhost:8081/group/1')
```
#### Get **http://localhost:8080/deploys/instance/:instanceid**
```
 return list of deploys for a specific instance
```
```javascript
    request('http://localhost:8081/deploys/instance/1')
```
#### Get **http://localhost:8080/deploy?instance=:id&last=true**
```
 return the most recent deploy for a specific instance
```

#### Get **http://localhost:8080/deploy?instance=:id&active=true**
```
 return the active deploy for a specific instance by running a system admin script if someone did a manual deploy
```
#### Get **http://localhost:8080/deploy?instance=:id&count=:count**
```
 return the last count of deploys for a specific instance
```
#### Get **http://localhost:8080/instance/:id/log?count=:count**
```
 Return the application log in text, if count is provided, the application log will be truncated by doing a tail command
```
#### Get **http://localhost:8080/instance/:id/log?query=:query**
```
 Search the application log by a needle, return all the lines that contain the needle.
```

#### GET **http://localhost:8080/instances/stack/:id**
```
 Return list of instances for a specific stack in JSON ( the instances visibility is governed by session user )
```
```javascript
request( 'http://localhost:8081/instances/stack/1' )
```
#### GET **http://localhost:8080/instance/:id**
```
 Return the instance in JSON
```
```javascript
    request('http://localhost:8081/instance/1')
```
#### GET **http://localhost:8080/environment/:envid/stacks**
```
 Return list of stacks for a specific environment
```
```javacsript
    request('http://localhost:8080/environment/1/stacks')
```
#### Get **http://localhost:8080/environments**
```
 return list of environments
```
```javascript
    request('http://localhost:8081/environments')
```
#### PUT **http://localhost:8080/deploy**
```
 Create a new deploy, return the newly created deploy in JSON
```
```javascript
        var instance = {
            deploy_date: new Date,
            user_id: 2,
            instance_id: 1,
            comments: 'this is inserted by test'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/deploy',
            json: instance
        };
        request(options)
            .spread( function(res, body) {
                return body;
            } )
```
#### POST **http://localhost:8080/deploy**
```
 request body: the modified deploy in JSON.
```
```javascript
        var comments = 'this is updated through route ' + +new Date();
        var data = {
            comments: comments,
            id: 2
        };
        var options = {
            url: 'http://localhost:8081/deploy',
            json: data,
            method: 'POST'
        };
        request( options )
            .spread( function(res, body) {
                done();
            } )
```
#### POST **http://localhost:8080/deploy/:id/start**
```
 start the deploy, this will run a script provided by the system admin. This could take a few minutes. This will return the deploy log.
```
#### PUT **http://localhost:8080/group**
```
 request body: new group in JSON

 return the newly created group
```

```javascript
        var instance = {
            name: 'Ghost',
            description: 'this is created by groups route'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/group',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                return body;
            } )
```
#### PUT **http://localhost:8080/instance**

```
 request body: new instance in JSON

 return the newly created instance
```
```javascript
        var instance = {
            name: 'test',
            description: 'this is inserted by test',
            stack_id: 1,
            ip: '192.168.100.128/25'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/instance',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                return body;
            } )
```
#### PUT **http://localhost:8080/stack**

```
 request body: new stack in JSON

 return the newly created stack
````

```javascript
        var instance = {
            name: 'test',
            description: 'this is inserted by test',
            environment_id: 1
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/stack',
            json: instance
        };
        request( options )
            .spread( function(res, body) {
                return body;
            } )
```
#### PUT **http://localhost:8080/environment**

```
 request body: new environment in JSON

 return the newly created environment
```

```javascript
        var environment = {
            name: 'new',
            description: 'temp environment'
        };
        var options = {
            method: 'PUT',
            url: 'http://localhost:8081/environment',
            json: environment
        };
        request(options)
            .spread(function(res, body) {
                return body;
            })
```            


## Tests


## Contributors


## License

