var request = require('request');

var util = require('util');

function parseCookies(cookie) {
    return cookie.split(';').reduce(
        function(prev, curr) {
        	if(/ *([^=]+)=(.*)/.test(curr)){
        		var m = / *([^=]+)=(.*)/.exec(curr);
	            var key = m[1];
	            var value = decodeURIComponent(m[2]);
	            prev[key] = value;
        	}else{
        		prev[curr] = '';
        	}
        	return prev;
            
        },
        { }
    );
}

function stringifyCookies(cookies) {
    var list = [ ];
    for (var key in cookies) {
        list.push(key + '=' + encodeURIComponent(cookies[key]));
    }
    return list.join('; ');
}

request({
	url: 'http://localhost:8081/auth/session',
	method: 'POST',
	json: {"email":"shawn@ut.com","password":"pass22"}
}, function(err, response, body){
	var headers = response['headers'];
	for(var p in headers) {
		console.log(p)
	}
	console.log(headers['set-cookie']);
	for(var i in headers['set-cookie']){
		console.log(i);
	}
	console.log(typeof headers['set-cookie']);
	console.log(headers['set-cookie'] instanceof Array);
	console.log(headers['set-cookie'][0]);
	var cookie = parseCookies(headers['set-cookie'][0]);
	console.log(cookie);
	for(var p in cookie){
		console.log(util.format('%s = %s', p, cookie[p]));
	}
})