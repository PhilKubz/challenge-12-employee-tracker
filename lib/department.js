const connection = require('../db/connection');

// Class creation for department
class Department {
  constructor() {}

  addDepartment(name) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return connection.query(query, [name]);
  }

  getAllDepartments() {
    const query = 'SELECT * FROM department';
    return connection
      .query(query)
      .then((result) => {
        const departments = result[0];
        return departments;
      })
      .catch((err) => {
        console.error('Error:', err);
        throw err;
      });
  }
}

module.exports = Department;