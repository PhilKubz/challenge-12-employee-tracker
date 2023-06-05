const connection = require('../db/connection');

class Employee {
  constructor() {}

  // Add a new employee to the database
  addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getAllEmployees() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employee';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  updateEmployeeRole(employeeId, roleId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(query, [roleId, employeeId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Employee;