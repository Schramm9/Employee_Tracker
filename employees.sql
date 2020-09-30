DROP DATABASE if exists employees;
CREATE DATABASE employees;
USE employees;
CREATE TABLE department(
id int auto_increment primary key,
dept_name VARCHAR (30) not null
);
CREATE TABLE role(
id int auto_increment primary key,
title  varchar(30) not null,
salary decimal(10, 2) not null,
department_id int not null,
CONSTRAINT fk_deptartment foreign key (department_id) references department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
id int auto_increment primary key,
first_name varchar(30),
last_name varchar(30),
role_id int not null ,
CONSTRAINT fk_role foreign key (role_id) references role(id) ON DELETE CASCADE,
manager_id int,
CONSTRAINT fk_manager foreign key (manager_id) references employee(id) ON DELETE SET NULL
);
use employees;

INSERT INTO department
    (dept_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

