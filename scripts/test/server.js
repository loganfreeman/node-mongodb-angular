var request = require('request');
var querystring = require('querystring');
var assert = require('assert');

describe('Server', function(){
	describe('addChargifyCustomerToMailChimp', function(){
		it('should return subscription successfully', function(done){
			
			this.timeout(2500);
			
			var post_data = {
					fname: 'testy',
					lname: 'tester',
					id: '2885479',
					email: 'a@logmycalls.com'
				};
			
			var options = {
				url: 'http://localhost:8080/addChargifyCustomerToMailChimp',
				method: 'POST',
				headers: {
			          'Content-Type': 'application/x-www-form-urlencoded',
			      },
				body: querystring.stringify(post_data)
			};
			
			console.log(post_data);
			
			request(options, function(err, response, body){
				
				if(!err && response.statusCode == 200){
					assert.equal(body, 'true' );
					done();
				}else{
					done(body);
				}
			});
		});
	});
});