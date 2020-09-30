const { prompt } = require("inquirer"); //destructure inquirer.prompt
const db = require("../Master/db/db.js");
const cTable = require("console.table");
const connection = require("../Master/db/connection.js");
//const queryString = require("query-string");

// function call to initialize program
init();
// function to initialize program
function init() {
  mainPrompt();
}
async function mainPrompt() {
  const { mainMenu } = await prompt(
    // array of questions for user
    [
      {
        type: "list", // other questions to be placed inside other functions
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees", // return the db
          "View All Employees by department",
          "View All Employees by manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Add Employee Role",
          "Remove Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Quit Application",
        ],
      },
    ]
  );
  switch (mainMenu) {
    case "View All Employees":
      viewAllEmployees();
      break;
    case "View All Employees by department":
      viewAllEmployeesByDept();
      break;
    case "View All Employees by manager":
      viewAllEmployeesByManager();
      break;
    case "Add Employee": // id added on its own
      addEmployee();
      break;
    case "Remove Employee":
      removeEmployee();
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break;
    case "Add Employee Role":
      addEmployeeRole();
      break;
    case "Remove Employee Role":
      removeEmployeeRole();
      break;
    case "Update Employee Manager":
      updateEmployeeManager();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    default:
      process.exit();
  }
}

// all functions are async functions save for init()
// make such that db is an object of methods
async function viewAllEmployees() {
  const employees = await db.findAllEmployees();
  console.log("-".repeat(30)); // repeating 30 dashes
  console.table(employees); // display employees in a table
  mainPrompt();
}

async function viewAllEmployeesByDept() {
  const departments = await db.findAllDepts();
  // console.log(departments);
  const deptChoices = departments.map(({ id, dept_name }) => ({
    name: dept_name,
    value: id, // takes in the dept. id before displaying the associated employees
  }));

  const { deptId } = await prompt([
    {
      type: "list",
      name: "deptId",
      message: "Please select the department you wish to view",
      choices: deptChoices,
    },
  ]);
  const employees = await db.findAllEmployeesByDept(deptId);
  // console.log(employees);
  console.log("-".repeat(30)); // repeating 30 dashes
  console.table(employees); // display employees by dept. in a table
  mainPrompt(); // return to main prompt
}
async function viewAllEmployeesByManager() {
  const managers = await db.findAllManagers();
  const managerChoices = managers.map(({ id, managerName }) => ({
    name: managerName, // provisions needed for taking in Manager's first and last names?
    value: deptId, // does this need to be the id of the dept? i.e. the depts have id's managers do not
  }));
  const { id } = await prompt([
    {
      type: "list",
      name: "id",
      message: "Please select the manager whose employees you wish to view",
      choices: managerChoices,
    },
  ]);
  const employees = await db.findAllEmployeesByManager(deptId);
  // console.log(employees);
  console.log("-".repeat(30)); // repeating 30 dashes
  console.table(employees); // display employees by dept. in a table
  mainPrompt();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name} `,
    value: id,
  }));
  const employee = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Please enter employee's last name:",
    },
  ]);
  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Please select the role for this employee:",
      choices: roleChoices,
    },
  ]);
  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Please select the manager for this employee:",
      choices: managerChoices,
    },
  ]);
  employee.role_id = roleId;
  employee.manager_id = managerId;
  await db.addEmployee(employee);
  console.log(`Added employee ${employee.first_name} ${employee.last_name}`);
  mainPrompt();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name} `,
    value: id,
  }));
  const employee = await prompt([
    {
      type: "list",
      name: "toRemove",
      message: "Please select employee to remove:",
      choices: employeeChoices,
    },
  ]);
  await db.removeEmployee(employee.toRemove);
  console.log(employee);
  mainPrompt();
  //console.log(employeeChoices);
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name} `,
    value: id,
  }));
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }));
  const { employee, role } = await prompt([
    {
      type: "list",
      name: "employee",
      message: "Please select employee whose role you wish to update:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role",
      message: "Please select the role for the employee:",
      choices: roleChoices,
    },
  ]);
  await db.updateEmployeeRole(employee, role);
  mainPrompt();
}

async function addEmployeeRole() {
  const departments = await db.findAllDepts();
  // console.log(departments);
  const deptChoices = departments.map(({ id, dept_name }) => ({
    name: dept_name,
    value: id, // takes in the dept. id before displaying the associated employees
  }));

  const { deptId, newRole, newRoleSalary } = await prompt([
    {
      type: "list",
      name: "deptId",
      message: "Please select the department to which you wish to add a role:",
      choices: deptChoices,
    },
    {
      type: "input",
      name: "newRole",
      message: "What is the name of the new role?",
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "What is the salary for the new role?",
    },
  ]);
  await db.addEmployeeRole(deptId, newRole, newRoleSalary);
  mainPrompt(); // return to main prompt
}

// function updateEmployee() {
//   console.log("Updating, last_name \n");
//   var query = connection.query(
//     "UPDATE employee SET ? WHERE ?",
//     [
//       {
//         last_name: "Smith",
//       },
//       {
//         id: 9,
//       },
//     ],
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " Employee(s) updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       connection.end();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }
