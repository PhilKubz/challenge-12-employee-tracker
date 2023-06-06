const connection = require('../db/connection');

// Class creation for employee
class Employee {
  constructor() {}

  addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return connection.query(query, [firstName, lastName, roleId, managerId]);
  }

  getAllEmployees() {
    const query = 'SELECT * FROM employee';
    return connection
      .query(query)
      .then((result) => {
        const employees = result[0];
        return employees;
      })
      .catch((err) => {
        console.error('Error:', err);
        throw err;
      });
  }

  updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return connection.query(query, [roleId, employeeId]);
  }
}

module.exports = Employee;
