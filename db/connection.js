const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'PEK',
  password: 'your_password',
  database: 'employee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();