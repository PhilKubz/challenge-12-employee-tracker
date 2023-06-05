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

// add department route
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

// add role route
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

// add employee route
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

// departments route
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

// roles route
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

// employees route
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

// User imput prompts
function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          department
            .getAllDepartments()
            .then((departments) => {
              console.table(departments);
              promptUser();
            })
            .catch((err) => console.error(err));
          break;
        case 'View all roles':
          role
            .getAllRoles()
            .then((roles) => {
              console.table(roles);
              promptUser();
            })
            .catch((err) => console.error(err));
          break;
        case 'View all employees':
          employee
            .getAllEmployees()
            .then((employees) => {
              console.table(employees);
              promptUser();
            })
            .catch((err) => console.error(err));
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
              },
            ])
            .then((departmentData) => {
              fetch('/api/department', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(departmentData),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data.message);
                  promptUser();
                })
                .catch((err) => console.error(err));
            });
          break;
        default:
          console.log('Invalid choice. Please try again.');
          promptUser();
      }
    })
    .catch((err) => console.error(err));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('Welcome to the Employee Tracker!');
promptUser();