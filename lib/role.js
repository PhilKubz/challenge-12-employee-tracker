const connection = require('../db/connection');

class Role {
  constructor() {}

  addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return connection.query(query, [title, salary, departmentId]);
  }

  getAllRoles() {
    const query = 'SELECT * FROM role';
    return connection.query(query);
  }
}

module.exports = Role;
