# Employee Tracker

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

The Employee Tracker is an application designed to create a method for maintaining a workforce in regards ot information of departments, employees, and their roles. This application is designed to run locally and store all information using the MySQL database. The Program is accessed using the CLI, and from this there is a series of options in the form of a prompt that allow the user to reach their desired goal. With ease of access and a simple implementation of means to GET/POST to the database, it is the perfect tool that provides a scalable means for a business!

## Installation

Installation includes several packages:
- `npm install` or `npm i` to install the node modules package
- `npm i inquirer@8.2.4` to install the inquirer package
- `npm install dotenv` for the dotenv package
- `npm install mysql2` for the MySQL2 package

## Usage

1. Clone the repository onto a local machine.

2. Follow the package installation steps

3. Locate into the .env file and enter your MySQL password into line 3 at the `DB_PASSWORD=<your_password_here>` position

4. Connect to MySQL database:
    - Open the terminal inside of the `db` file
    - in the CLI, input `mysql -u root -p` and then input your mysql password

5. While in the `db` file, we will use two more inputs in the CLI to set our database up
    - `SOURCE schema.sql` will set up the database structure
    - `SOURCE seeds.sql;` will populate our database with sample data to allow us to interact with our database

6. Now we will go to the root directory to run our application.
    - Once in the root directory, input the command `node server.js` to start the server
    - This will now present us with a series of user prompts to interact how we choose

7. From the CLI, one can now view/add to adjust any of the information in the database using the series of prompts

## Demonstration

[EMployee Tracker Video Demonstration](https://drive.google.com/file/d/179dDp4x00t7UXjVzlv3IFK5gxq2tLc3c/view)

## License

MIT License


- Name: Philip Kubisz

- [GitHub Profile](https://github.com/PhilKubz?tab=repositories)

- Email: philip.kubisz@gmail.com