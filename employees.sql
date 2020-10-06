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
    ('Sales (Dept. ID 1)'),
    ('Engineering (Dept. ID 2)'),
    ('Finance (Dept. ID 3)'),
    ('Legal (Dept. ID 4)');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead (role ID 1)', 100000, 1), -- role id 1
    ('Salesperson (role ID 2)', 80000, 1), -- role id 2
    ('Lead Engineer (role ID 3)', 150000, 2), -- role id 3
    ('Software Engineer (role ID 4)', 120000, 2), -- role id 4
    ('Account Manager (role ID 5)', 160000, 3), -- role id 5
    ('Accountant (role ID 6)', 125000, 3), -- role id 6
    ('Legal Team Lead (role ID 7)', 250000, 4), -- role id 7
    ('Lawyer (role ID 8)', 190000, 4); -- role id 8

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

