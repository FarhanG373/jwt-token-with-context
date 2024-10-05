const mySql = require('mysql');

const con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jwt-learning'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = con;