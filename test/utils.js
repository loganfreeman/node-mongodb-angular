var utils = require('../src/utils.js');
var assert = require('assert');
var dateFormat = require('dateformat');
var constants = require('../src/constants.js');
var util = require('util');

describe('utils', function(){
	describe('it should return lmc product id correctly', function(){
		it('should return product id faithfully', function(){
			assert.equal("1", utils.getLmcProductId('25615'));
			assert.equal("99", utils.getLmcProductId('25615x'));
		})
	});
	
	describe('it should add subscriber successfully', function(){
		it('should add subscriber successfully', function(done){
			this.timeout(2500);
			
			function callback(err, data){
				if(err){
					done(err);
				}else{
					console.log(data);
					done();
				}
			};
			
			var currentdatetime = dateFormat(new Date(), "UTC:yyyy-mm-dd HH:MM:ss");
			utils.add_subscriber('a@logmycalls.com', 'testy', 'tester', currentdatetime, 1, callback);
		})
	})
	
	describe('it should format string faithfully', function(){
		it('should format url faithfully', function(){
			assert.equal("https://logmycalls.chargify.com/customers/1234/subscriptions.json" ,util.format(constants.customer_subscription_url, '1234'));
		})
	})
})