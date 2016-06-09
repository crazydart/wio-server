/**
 * Created by ben on 6/8/16.
 */

var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    var db = req.db;

    var authinfo = [];
    db.each("SELECT rowid AS id, username, authtoken, authdate FROM authinfo", function (err, row) {
        console.log(row.id + ": " + row.username);
        authinfo.push({

            id: row.id,
            username: row.username,
            authtoken: row.authtoken,
            authdate: row.authdate
        });
    }, function (err, rowCount) {

        console.log("Rows: " + rowCount);
        res.json(authinfo);
    });
});

router.post("/", function (req, res, next) {

    var db = req.db;

    var stmt = db.prepare("INSERT INTO authinfo VALUES (?, ?, ?)");
    stmt.run(req.body.username, "tokensvc", new Date(), function (error) {

        if (error) {

            res.status(500).json({

                errorMessage: "Failed to add"
            });
        }
        else {

            res.status(201).json({
                rowid: this.lastID
            });
        }
    });
    stmt.finalize();
});


module.exports = router;
