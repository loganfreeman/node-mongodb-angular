/**
 * @author scheng
 * @module routes
 */

var request = require('request');
var utils = require('../utils.js');
var dateFormat = require('dateformat');

module.exports = function(app) {
    //Dummy users
    var users = [
        {
            name: 'tobi',
            email: 'tobi@learnboost.com'
        },
        {
            name: 'loki',
            email: 'loki@learnboost.com'
        },
        {
            name: 'jane',
            email: 'jane@learnboost.com'
        }
    ];

    app.get('/', function(req, res) {
        res.render('users', {
            users: users,
            title: "EJS example",
            header: "Some users"
        });
    });


    /**
     * add chargify customer to MailChimp
     * 
     * 
     */
    app.post('/addChargifyCustomerToMailChimp', function(req, res) {
        var email = req.body.email;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var customer_id = req.body.id;
        var currentdatetime = dateFormat(new Date(), "UTC:yyyy-mm-dd HH:MM:ss");

        function addSubscriberCallback(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        }

        function callback(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                //res.send(data[0]);
                // console.log(data);
                var lmc_product_id = utils.getLmcProductId(data[0].subscription.product.id);

                utils.add_subscriber(email, fname, lname, currentdatetime, lmc_product_id, addSubscriberCallback);
            }
        }
        utils.getCustomerSubscription(customer_id, callback);

    })

}