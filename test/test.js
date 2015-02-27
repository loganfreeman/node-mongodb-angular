var assert = require("assert");
var dateFormat = require('dateformat');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('moment', function(){
	describe('format', function(){
		it('should format date as expected', function(){
			var d = new Date(2013, 2, 1, 1, 10);
			var s = dateFormat(d, "dddd, mmmm dS, yyyy, h:MM:ss TT");
			assert.equal('Friday, March 1st, 2013, 1:10:00 AM', s);
			s = dateFormat(d, "yyyy-mm-dd HH:MM:ss");
			assert.equal('2013-03-01 01:10:00', s);
			
		});
		
		it('should format date with TimeZone GMT as expected', function(){
			var d = new Date(2013, 2, 1, 1, 10);
			
			var s = dateFormat(d, "UTC:yyyy-mm-dd HH:MM:ss");
			console.log("UTC: " + s);
			assert.equal('2013-03-01 08:10:00', s);
		
		});
		
		it('should format date with TimeZone UTC as expected', function(){
			var d = new Date(2013, 2, 1, 1, 10);

			var s = dateFormat(d, "GMT:yyyy-mm-dd HH:MM:ss");
			console.log("GMT: "+ s);
			assert.equal('2013-03-01 08:10:00', s);
		});
	});
});