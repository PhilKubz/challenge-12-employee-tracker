const connection = require('../db/connection');

class Role {
  constructor() {}

  addRole(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [title, salary, departmentId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getAllRoles() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM role';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Role;