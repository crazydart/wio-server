/**
 * Created by ben on 6/8/16.
 */

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

    var db = req.db;

    var authinfo = [];
    db.each("SELECT rowid AS id, username, authtoken, authdate FROM authinfo", function(err, row) {
        console.log(row.id + ": " + row.username);
        authinfo.push({

            id: row.id,
            username: row.username,
            authtoken: row.authtoken,
            authdate: row.authdate
        });
    }, function(err, rowCount) {

        console.log("Rows: " + rowCount);
        res.json(authinfo);
    });
});


module.exports = router;
