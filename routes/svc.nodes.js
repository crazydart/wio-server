/**
 * Created by William on 6/9/2016.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    console.log("start login response");

    var request = require('request');


    request.get({
            url: 'https://iot.seeed.cc/v1/nodes/list', headers: {'Authorization': 'token ' + 'KEY_HERE'}
        },
        function (err, httpResponse, body) {

            console.log("nodes response");
            console.log(httpResponse.statusCode);
            var respBody = JSON.parse(body);

            if (httpResponse.statusCode == 200) {

                res.status(200).json(respBody);
            }
            else {

                res.status(400).json({

                    errorMessage: "failed to get nodes"
                });
            }
        });
});


module.exports = router;