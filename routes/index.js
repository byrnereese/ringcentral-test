var express = require('express');
var router = express.Router();

var ringcentral = require('ringcentral')
var SDK = require('ringcentral')
console.log(SDK.server.sandbox)
var rcsdk = new SDK({
    server: SDK.server.sandbox,
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET
});
var platform = rcsdk.platform();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("platform object created: " + platform)
    platform
        .login({
            username: '+12054387726',
            extension: '101',
            password: process.env.RINGCENTRAL_PASSWORD
        })
        .then(function(response) {
            console.log("Logged in")
            platform
                .post('/account/~/extension/~/sms', {
                    from: {
                        phoneNumber:'+12054387726'
                    }, // Your sms-enabled phone number
                    to: [
                        {phoneNumber:'+15108723204'} // Second party's phone number
                    ],
                    text: 'Message content'
                })
                .then(function(response) {
                    console.log('Success: ' + response.json().id);
                })
                .catch(function(e) {
                    console.log('Error: ' + e.message);
                });
            res.render('index', { title: 'Ringcentral App Test - SMS' });
        })
        .catch(function(e) {
            console.log("Login error: " + e.message  || 'Server cannot authorize user');
        });
});

module.exports = router;
