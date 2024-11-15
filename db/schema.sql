-- create database for employee_tracker_db;
CREATE DATABASE employee_tracker_db;

--This command connects to the employee_tracker_db database so that subsequent SQL commands will be executed within this database context.
\c employee_tracker_db;
-- Create Department Table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL -- to hold department name
);

-- Create Role Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL, --to hold role title
    salary DECIMAL NOT NULL, --to hold role salary
    department_id INTEGER NOT NULL, -- to hold reference to department role belongs to
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

-- Create Employee Table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- to hold employee first name
    last_name VARCHAR(30) NOT NULL, -- to hold employee last name
    role_id INTEGER NOT NULL, -- to hold reference to the employee role
    manager_id INTEGER, -- to hold reference to another employee that is the manager of a current employee
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);