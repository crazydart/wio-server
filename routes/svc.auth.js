/**
 * Created by ben on 6/8/16.
 */

var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    var db = req.db;

    var authinfo = [];
    db.each("SELECT rowid AS id, username, authtoken, userid, authdate FROM authinfo", function (err, row) {
        console.log(row.id + ": " + row.username);
        authinfo.push({

            id: row.id,
            username: row.username,
            authtoken: row.authtoken,
            userid: row.userid,
            authdate: row.authdate
        });
    }, function (err, rowCount) {

        console.log("Rows: " + rowCount);
        res.json(authinfo);
    });
});

// https://iot.seeed.cc/v1/user/login
// req: Form: email, password
/*
 resp: {
 "token": "Dz3ypLghyP0sG7HGKgOLAJ9_MrCN1Yeg-1yo31bl8hQ",
 "user_id": "30841e022a1411e6b58bf23c913b6c0f"
 }
 */
router.post("/", function (req, res, next) {

    console.log("start login response");

    var request = require('request');

    request.post({
            url: 'https://iot.seeed.cc/v1/user/login', form: {
                email: req.body.username,
                password: req.body.password
            }
        },
        function (err, httpResponse, body) {

            console.log("login response");
            console.log(httpResponse.statusCode);
            var respBody = JSON.parse(body);

            if (httpResponse.statusCode == 200) {

                var db = req.db;

                var stmt = db.prepare("INSERT INTO authinfo VALUES (?, ?, ?, ?)");
                stmt.run(req.body.username, respBody.token, respBody.user_id, new Date(), function (error) {

                    if (error) {

                        res.status(500).json({

                            errorMessage: "Failed to add, DB Failure"
                        });
                    }
                    else {

                        res.status(201).json({
                            rowid: this.lastID
                        });
                    }
                });
                stmt.finalize();
            }
            else {

                res.status(400).json({

                    errorMessage: respBody.error
                });
            }
        });
});


router.delete("/", function (req, res, next) {

    var db = req.db;

    console.log("delete email:");
    console.log(req.query.email)

    var stmt = db.prepare("DELETE FROM authinfo WHERE username = ?;");
    stmt.run(req.query.email, function (error) {

        if (error) {

            res.status(500).json({

                errorMessage: "Failed to remove, DB Failure"
            });
        }
        else {

            res.status(204).send();
        }
    });
    stmt.finalize();
});

module.exports = router;
