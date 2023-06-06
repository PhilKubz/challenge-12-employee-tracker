const connection = require('../db/connection');

// Class creation for role
class Role {
  constructor() {}

  addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return connection.query(query, [title, salary, departmentId]);
  }

  getAllRoles() {
    const query = 'SELECT * FROM role';
    return connection
      .query(query)
      .then((result) => {
        const roles = result[0];
        return roles;
      })
      .catch((err) => {
        console.error('Error:', err);
        throw err;
      });
  }
}

module.exports = Role;
