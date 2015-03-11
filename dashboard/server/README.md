## Synopsis

Devops Restful api


## Motivation


## Installation

```shell
npm install & npm start
```

## API Reference


#### POST **http://localhost:8080/login**
```
 Request body: username password as form parameter

 return logged in user in JSON
```

#### GET **http://localhost:8080/logout**

#### PUT **http://locahost:8080/user**
```
 Request body: user json

 return created user in JSON
 (This is used to register a user, a user is associated with a group, group governs access level )
```

#### GET **http://localhost:8080/user?group=:id**
```
 return list of users for a specific group
```



#### GET **http://locahost:8080/group**
```
 Return list of groups in JSON ( the group visibility is governed by session user )
```

#### GET **http://localhost:8080/group/:id**
```
 Return the group in JSON
```
#### Get **http://localhost:8080/deploy?instance=:id**
```
 return list of deploys for a specific instance
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

#### GET **http://localhost:8080/instance?stack=:id**
```
 Return list of instances for a specific stack in JSON ( the instances visibility is governed by session user )
```
#### GET **http://localhost:8080/instance/:id**
```
 Return the instance in JSON
```
#### GET **http://localhost:8080/stack?environment=:id**
```
 Return list of stacks for a specific environment
```
#### Get **http://localhost:8080/environment**
```
 return list of environments
```
#### PUT **http://localhost:8080/deploy**
```
 Create a new deploy, return the newly created deploy in JSON
```
#### POST **http://localhost:8080/deploy**
```
 request body: the modified deploy in JSON.
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
#### PUT **http://localhost:8080/instance**

```
 request body: new instance in JSON

 return the newly created instance
```
#### PUT **http://localhost:8080/stack**

```
 request body: new stack in JSON

 return the newly created stack
````
#### PUT **http://localhost:8080/environment**

```
 request body: new environment in JSON

 return the newly created environment
```


## Tests


## Contributors


## License

