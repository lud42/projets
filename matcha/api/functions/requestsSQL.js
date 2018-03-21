function insert(connection, sql, ) {
    connection.query(sql, email, (err, result) => {
        if (err)
            throw err;
        console.log('Inscription faite avec le mail suivant: ' + email);
    });
}