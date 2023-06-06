const connection = require('../db/connection');

class Department {
  constructor() {}

  addDepartment(name) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return connection.query(query, [name]);
  }

  getAllDepartments() {
    const query = 'SELECT * FROM department';
    return connection.query(query);
  }
}

module.exports = Department;