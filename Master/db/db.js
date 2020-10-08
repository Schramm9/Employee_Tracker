const connection = require("./connection"); // connection
class Company {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee;"
    ); // make employee's role show by
  }
  findAllDepts() {
    return this.connection.query(
      "SELECT department.id, department.dept_name FROM department;"
    );
  }
  findAllEmployeesByDept(deptId) {
    return this.connection.query(
      "SELECT employee.first_name, employee.last_name, employee.role_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department.id = role.department_id WHERE department.id = ?;",
      deptId // asks for department to view, then shows first_name last_name role_id
    );
  }
  findAllEmployeesByManager(deptId) {
    return this.connection.query(
      "SELECT employee.first_name, employee.last_name, employee.role_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department.id = role.department_id WHERE department.id = ?;",
      deptId
    );
  }
  addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  findAllRoles() {
    return this.connection.query("SELECT role.id, role.title FROM role;");
  }
  removeEmployee(id) {
    return this.connection.query("DELETE FROM employee WHERE id = ?", id);
  }
  updateEmployeeRole(id, role_id) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?;",
      [role_id, id]
    );
  }
  addEmployeeRole(deptId, newRole, newRoleSalary) {
    return this.connection.query(
      "INSERT INTO role SET title = ?, department_id = ?, salary = ?",
      [newRole, deptId, newRoleSalary]
    );
  }
  addDepartment(department) {
    return this.connection.query(
      "INSERT INTO department SET dept_name = ?",
      department
    );
  }
  removeDepartment(department) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      department
    );
  }
  removeRole(id) {
    return this.connection.query("DELETE FROM role WHERE id = ?", id);
  }
}

module.exports = new Company(connection);
