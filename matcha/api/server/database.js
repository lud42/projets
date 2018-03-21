function createDB(connection) {
    connection.connect((err) => {
        if (err)
            throw err;
            
        let sql = `CREATE DATABASE IF NOT EXISTS matcha`;
        connection.query(sql, (err, result) => {
            if (err)
                throw err;
            console.log('Database created');
            
            let sql = `USE matcha`;
            connection.query(sql, (err, result) => {
                if (err)
                    throw err;
                console.log('Use database matcha');
            });
            
            sql = `CREATE TABLE IF NOT EXISTS matcha.users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255),
                lastName VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                birthday VARCHAR(255),
                age INT,
                kind VARCHAR(255),
                orientation VARCHAR(255),
                address VARCHAR(255),
                longitude DOUBLE,
                latitude DOUBLE,
                actif INT)`;
            connection.query(sql, (err, result) => {
                if (err)
                    throw err;
                console.log('Table created');
            });
        });
    });
};

module.exports.createDB = createDB;