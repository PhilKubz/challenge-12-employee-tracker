const connection = require('../db/connection');

class Department {
  constructor() {}

  addDepartment(name) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [name], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM department';
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

module.exports = Department;