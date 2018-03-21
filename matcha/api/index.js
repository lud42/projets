let mysql = require('mysql2');
let config = require('./server/config');

let database = require('./server/database');
let app = require('./server/server');

let connection = mysql.createConnection(config);

database.createDB(connection);
app.start();