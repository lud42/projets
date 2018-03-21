let mysql = require('mysql2');
let config = require('../server/config');
let helper = require('../functions/helper');

function signUp(req, res) {
    config.database = 'matcha';

    let email = req.body.email;
    let user = helper.syntaxUser(req.body);
    let connection = mysql.createConnection(config);

    console.log('REQ', user, user.length);
    connection.connect((err) => {
        if (err)
            throw err;
        let sql = `SELECT email FROM matcha.users`;
        connection.query(sql, (err, result, fields) => {
            if (err)
                throw err;
            console.log('result', result);
            if (result.length === 0) {
                let sql = `INSERT INTO matcha.users VALUES (?)`;
                connection.query(sql, [user], (err, result) => {
                    if (err)
                        throw err;
                    console.log('Inscription faite avec le mail suivant: ' + email);
                    res.status(200).send('SignUp done');
                });
            } else {
                result.forEach(element => {
                    if (element.email === email) {
                        console.log('Email already used');
                        res.status(400).send('Email already used');
                    }
                    else {
                        let sql = `INSERT INTO matcha.users VALUES (?)`;
                        connection.query(sql, [user], (err, result) => {
                            if (err)
                            throw err;
                            console.log('Inscription faite avec le mail suivant: ' + email);
                            res.status(200).send('SignUp done');
                        });
                    };
                });
            };
        });
    });
    // console.log(email, req.body);
};

module.exports.signUp = signUp;