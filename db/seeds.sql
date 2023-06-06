-- Departments
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 85000, 1),
  ('Sales Manager', 95000, 2),
  ('Marketing Coordinator', 55000, 3),
  ('Financial Analyst', 75000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 1, 1),
  ('Mike', 'Johnson', 2, NULL),
  ('Emily', 'Davis', 3, 3),
  ('Mark', 'Williams', 3, 3),
  ('Sarah', 'Brown', 4, NULL);

COMMIT;