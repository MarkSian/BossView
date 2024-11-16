const db = require('../db/connection.js'); // import connection to the database
const inquirer = require('inquirer'); // import inquirer for user prompts
// Prompt users for employee role update
async function promptUserForRoleUpdate() {
    const employeeQuery = 'SELECT id, first_name, last_name FROM employee'; // SQL query to select employee id, first name, and last name
    const employeeResult = await db.query(employeeQuery); // execute the query and wait for the result
    const employees = employeeResult.rows.map(emp => ({ // map the result to create an array of employee objects
        name: `${emp.first_name} ${emp.last_name}`, // format the name as "First Last"
        value: emp.id
    }));
    const { employeeId } = await inquirer.prompt([ // prompt user to select an employee
        {
            type: 'list', // type of prompt is a list
            name: 'employeeId', // name of the variable to store the selected employee id
            message: 'Select an employee to update:', // message displayed to the user
            choices: employees // choices are the list of employees created earlier
        }
    ]);
    const roleQuery = 'SELECT id, title FROM role'; // SQL query to select role id and title
    const roleResult = await db.query(roleQuery); // execute the query and wait for the result
    const roles = roleResult.rows.map(role => ({ // map the result to create an array of role objects
        name: role.title, // use the role title as the name for selection
        value: role.id // use the role id as the value for selection
    }));
    const { newRoleId } = await inquirer.prompt({ // prompt user to select a new role
        type: 'list', // type of prompt is a list
        name: 'newRoleId', // name of the variable to store the selected new role id
        message: 'Select a new role for the employee:',
        choices: roles // choices are the list of roles created earlier
    });
    return { employeeId, newRoleId }; // return the selected employee id and new role id
}
// Propmt users for employee information
async function promptUserForEmployeeDetails() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([ // prompt user for employee details and destructure the response
        {
            type: 'input', // type of prompt is an input field
            name: 'firstName', // name of the variable to store the first name
            message: 'Enter the first name of the employee:', // message displayed to the user
            validate: input => input ? true : 'First name cannot be empty' // validation to ensure input is not empty
        },
        {
            type: 'input', // type of prompt is an input field
            name: 'lastName', // name of the variable to store the last name
            message: 'Enter the last name of the employee:', // message displayed to the user
            validate: input => input ? true : 'Last name cannot be empty' // validation to ensure input is not empty
        },
        {
            type: 'input', // type of prompt is an input field
            name: 'roleId', // name of the variable to store the role id
            message: 'Enter the role id of the employee:', // message displayed to the user
            validate: input => !isNaN(input) ? true : 'Role id must be a number' // validation to ensure the input is a number
        },
        {
            type: 'input', // type of prompt is an input field
            name: 'managerId', // name of the variable to store the manager id
            message: 'Enter the manager id of the employee:', // message displayed to the user
            validate: input => input === '' || !isNaN(input) ? true : 'Manager id must be a number or left blank' // validation to ensure input is a number or left blank
        },
    ]);
    return {
        firstName, // return the first name
        lastName, // return the last name
        roleId: parseInt(roleId), // convert roleId to an integer before returning
        managerId: managerId ? parseInt(managerId) : null, // convert managerId to an integer if provided, otherwise return null
    };
};
// The Employee class
class Employee {
    // Function to view all employees
    static async viewAllEmployees(mainMenu) {
        const query = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id 
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
        `;
        try {
            const result = await db.query(query);
            console.table(result.rows);
        } catch (error) {
            console.error("error fetching employees:", error);
        } finally {
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
    //Function to add an employee
    static async addEmployee(mainMenu) {
        const { firstName, lastName, roleId, managerId } = await promptUserForEmployeeDetails();

        //check if the role id exists
        const roleCheckQuery = 'SELECT * FROM role WHERE id = $1';
        const roleCheckResult = await db.query(roleCheckQuery, [roleId]);

        if (roleCheckResult.rows.length === 0) {
            console.error(`Role with id ${roleId} does not exist`);
            return;
        }

        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [firstName, lastName, roleId, managerId]);
            console.log("Employee added:", result.rows[0]);
        } catch (error) {
            console.error("error adding employee:", error);
        } finally {
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
    //fucntion to update employee role
    static async updateEmployeeRole(mainMenu) {
        const { employeeId, newRoleId } = await promptUserForRoleUpdate();

        const roleCheckQuery = 'SELECT * FROM role WHERE id = $1';
        const roleCheckResult = await db.query(roleCheckQuery, [newRoleId]);
        if (roleCheckResult.rows.length === 0) {
            console.error(`Role with id ${newRoleId} does not exist`);
            return;
        }
        const query = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [newRoleId, employeeId]);
            if (result.rows.length > 0) {
                console.log('Employee role updated:', result.rows[0]);
            } else {
                console.log('Employee not found');
            }
        } catch (error) {
            console.error('error updating employee role:', error);
        } finally {
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
}
console.log(Employee);
console.log(typeof Employee.addEmployee);
module.exports = Employee;
