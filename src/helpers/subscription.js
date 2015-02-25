/**
 * @author scheng
 * @module
 */

var request = require('request');
var querystring = require('querystring');
var constants = require('../constants.js');
var util = require('util');

module.exports = {

    /**
     * 
     * @description get the lmc product id from the chargify product id
     * @function
     * @param chargify_product_id
     * @returns {String} lmc product id
     * 
     * 
     *  
     */
    getLmcProductId: function(chargify_product_id) {
        if (chargify_product_id == "25615") {
            var lmc_product_id = "1";
        } else if (chargify_product_id == "83117") // lmc lite
        {
            var lmc_product_id = "4";
        } else if (chargify_product_id == "20369"
            || chargify_product_id == "25619") // lmc basic
        {
            var lmc_product_id = "2";
        } else if (chargify_product_id == "20378"
            || chargify_product_id == "25620") // lmc pro
        {
            var lmc_product_id = "5";
        } else if (chargify_product_id == "20379"
            || chargify_product_id == "25622") // lmc enterprise
        {
            var lmc_product_id = "7";
        } else // lmc other
        {
            var lmc_product_id = "99";
        }
        return lmc_product_id;
    },

    /**
     * @description add a subscriber ( :email, :fname, :lname, :lmc_product_id, :timestamp ) to MailChimp
     * @function
     * @param
     * @returns void
     */
    add_subscriber: function(email, fname, lname, currentdatetime,
    lmc_product_id, callback) {
        // Add the subscription to MailChimp
        var post_data = {
            apikey: "956b82ad2c0945988c151a3548940e92-us1",
            id: "e43a85a73c",
            email_address: email,
            double_optin: false,
            update_existing: true,
            send_welcome: false,
            "merge_vars[FNAME]": fname,
            "merge_vars[LNAME]": lname,
            "merge_vars[MMERGE7]": currentdatetime,
            "merge_vars[MMERGE4]": lmc_product_id,
            "merge_vars[MMERGE3]": "14",
            "merge_vars[MMERGE5]": "1",
            "merge_vars[OPTIN_TIME]": currentdatetime
        };
        // Logger.log(data);
        var chimp_options = {
            "method": "post",
            'Content-Type': "application/x-www-form-urlencoded",
            "body": querystring.stringify(post_data),
            url: constants.mailchimp_url
        };

        console.log(chimp_options);

        // this one works.
        request.post(constants.mailchimp_url, {
            form: post_data
        }, function(err, response, body) {
                var bodyObj = JSON.parse(body);
                if (!err && response.statusCode == 200
                    && !bodyObj.hasOwnProperty('error')) {
                    callback(null, body);
                } else {
                    callback(err || body);
                }
            })

    },
    /**
     * @description get the subscription for a customer ( :customer_id )
     * @param customerId
     * @param callback
     * @returns {Array} subscriptions
     */
    getCustomerSubscription: function(customerId, callback) {
        var headers = {
            "Authorization": "Basic Q0w0S2YwZmVmVHVQQjNNWXpfTk46eA==",
            "Accept": "application/json"
        };
        var options = {
            url: util.format(constants.customer_subscription_url, customerId),
            headers: headers,
            contentType: 'application/json',
        };

        request(options, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                var subscriptions = JSON.parse(body);
                callback(null, subscriptions);
            } else {
                callback({
                    error: 'Something blew up'
                });
            }
        });

    }

}