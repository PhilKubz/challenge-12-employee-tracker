const inquirer = require('inquirer');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

// For creation of new instances of class
const department = new Department();
const role = new Role();
const employee = new Employee();

// Prompt inputs section
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
        
        //prompt user for mroe detaiils
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
              },
            ])
            .then((departmentData) => {
              department
                .addDepartment(departmentData.name)
                .then(() => {
                  console.log('Department added successfully!');
                  promptUser();
                })
                .catch((err) => console.error(err));
            });
          break;
        case 'Add a role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:',
              },
              {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:',
              },
            ])
            .then((roleData) => {
              role
                .addRole(roleData.title, roleData.salary, roleData.departmentId)
                .then(() => {
                  console.log('Role added successfully!');
                  promptUser();
                })
                .catch((err) => console.error(err));
            });
          break;
        case 'Add an employee':

          // Prompt for employee details
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee first name:',
              },
              {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee last name:',
              },
              {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID:',
              },
              {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID:',
              },
            ])
            .then((employeeData) => {
              employee
                .addEmployee(
                  employeeData.firstName,
                  employeeData.lastName,
                  employeeData.roleId,
                  employeeData.managerId
                )
                .then(() => {
                  console.log('Employee added successfully!');
                  promptUser();
                })
                .catch((err) => console.error(err));
            });
          break;
        case 'Update an employee role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the employee ID:',
              },
              {
                type: 'input',
                name: 'roleId',
                message: 'Enter the new role ID:',
              },
            ])
            .then((employeeData) => {
              employee
                .updateEmployeeRole(employeeData.employeeId, employeeData.roleId)
                .then(() => {
                  console.log('Employee role updated successfully!');
                  promptUser();
                })
                .catch((err) => console.error(err));
            });
          break;
        case 'Exit':
          console.log('Exiting the Employee Tracker...');
          process.exit(0);
        default:
          console.log('Invalid choice. Please try again.');
          promptUser();
      }
    })
    .catch((err) => console.error(err));
}

console.log('Welcome to the Employee Tracker!');
promptUser();