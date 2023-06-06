require('dotenv').config();
const express = require('express');
const inquirer = require('inquirer');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create new instances of classes
const department = new Department();
const role = new Role();
const employee = new Employee();

// department route post
app.post('/api/department', (req, res) => {
  const { name } = req.body;
  department
    .addDepartment(name)
    .then(() => {
      res.json({ message: 'Department added successfully!' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// role route post
app.post('/api/role', (req, res) => {
  const { title, salary, departmentId } = req.body;
  role
    .addRole(title, salary, departmentId)
    .then(() => {
      res.json({ message: 'Role added successfully!' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// employee route post
app.post('/api/employee', (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body;
  employee
    .addEmployee(firstName, lastName, roleId, managerId)
    .then(() => {
      res.json({ message: 'Employee added successfully!' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// update employee route
app.put('/api/employee/:id/role', (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  employee
    .updateEmployeeRole(id, roleId)
    .then(() => {
      res.json({ message: 'Employee role updated successfully!' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// departments route get
app.get('/api/departments', (req, res) => {
  department
    .getAllDepartments()
    .then((departments) => {
      res.json({ data: departments });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// roles route get
app.get('/api/roles', (req, res) => {
  role
    .getAllRoles()
    .then((roles) => {
      res.json({ data: roles });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// employees route get
app.get('/api/employees', (req, res) => {
  employee
    .getAllEmployees()
    .then((employees) => {
      res.json({ data: employees });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.use((req, res) => {
  res.status(404).end();
});

// User input prompts
function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'View all departments',
          'View all roles',
          'View all employees',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'Add department':
          addDepartmentPrompt();
          break;
        case 'Add role':
          addRolePrompt();
          break;
        case 'Add employee':
          addEmployeePrompt();
          break;
        case 'Update employee role':
          updateEmployeeRolePrompt();
          break;
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit();
          break;
        default:
          console.log('Invalid action');
          break;
      }
    });
}

// Add department prompt
function addDepartmentPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      department
        .addDepartment(answers.name)
        .then(() => {
          console.log('Department added successfully!');
          promptUser();
        })
        .catch((err) => {
          console.log(err.message);
          promptUser();
        });
    });
}

// Add role prompt
function addRolePrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      role
        .addRole(answers.title, answers.salary, answers.departmentId)
        .then(() => {
          console.log('Role added successfully!');
          promptUser();
        })
        .catch((err) => {
          console.log(err.message);
          promptUser();
        });
    });
}

// Add employee prompt
function addEmployeePrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answers) => {
      employee
        .addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
        .then(() => {
          console.log('Employee added successfully!');
          promptUser();
        })
        .catch((err) => {
          console.log(err.message);
          promptUser();
        });
    });
}

// Update employee role prompt
function updateEmployeeRolePrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: "Enter the employee's ID:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      employee
        .updateEmployeeRole(answers.employeeId, answers.roleId)
        .then(() => {
          console.log('Employee role updated successfully!');
          promptUser();
        })
        .catch((err) => {
          console.log(err.message);
          promptUser();
        });
    });
}

// View all departments
function viewAllDepartments() {
  department
    .getAllDepartments()
    .then((departments) => {
      console.log('\nDepartments:\n');
      console.table(departments);
      promptUser();
    })
    .catch((err) => {
      console.log(err.message);
      promptUser();
    });
}

// View all roles
function viewAllRoles() {
  role
    .getAllRoles()
    .then((roles) => {
      console.log('\nRoles:\n');
      console.table(roles);
      promptUser();
    })
    .catch((err) => {
      console.log(err.message);
      promptUser();
    });
}

// View all employees
function viewAllEmployees() {
  employee
    .getAllEmployees()
    .then((employees) => {
      console.log('\nEmployees:\n');
      console.table(employees);
      promptUser();
    })
    .catch((err) => {
      console.log(err.message);
      promptUser();
    });
}

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
  promptUser();
});