const inquirer = require('inquirer'); // Importing the Inquirer package for user prompts
const { addDepartment, viewDepartments, deleteDepartment } = require('./lib/department'); // Importing department-related functions
const { addEmployee, viewAllEmployees, updateEmployeeRole, promptUserForEmployeeDetails, promptUserForRoleUpdate } = require('./lib/employee'); // Importing employee-related functions
const Employee = require('./lib/employee'); // Importing the Employee class

// Main menu function to handle user interactions
const mainMenu = async () => {
    try {
        // Prompting the user with a list of actions they can take
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments', // Option to view all departments
                    'Add a department', // Option to add a new department
                    'Delete a department', // Option to delete an existing department
                    'View all employees', // Option to view all employees
                    'Add an employee', // Option to add a new employee
                    'Update an employee role', // Option to update an employee's role
                    'Exit' // Option to exit the application
                ]
            }
        ]);
        // Handling the user's choice with a switch statement
        switch (answers.action) {
            case 'View all departments':
                await viewDepartments(mainMenu); // Calls function to view all departments
                break;
            case 'Add a department':
                // Prompting user for the name of the new department
                const { name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the department:'
                    }
                ]);
                await addDepartment(name, mainMenu); // Calls function to add a new department
                break;
            case 'Delete a department':
                // Prompting user for the ID of the department to delete
                const { departmentId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the id of the department to delete:'
                    }
                ]);
                await deleteDepartment(departmentId, mainMenu); // Calls function to delete a department
                break;
            case 'View all employees':
                await viewAllEmployees(mainMenu); // Calls function to view all employees
                break;
            case 'Add an employee':
                await Employee.addEmployee(mainMenu); // Calls method to add a new employee
                break;
            case 'Update an employee role':
                await Employee.updateEmployeeRole(mainMenu); // Calls method to update an employee's role
                break;
            case 'Exit':
                console.log('Goodbye!'); // Prints goodbye message
                process.exit(); // Exits the application
            default:
                break; // Default case does nothing
        }
    } catch (error) {
        console.error('error with main menu:', error); // Catches and logs any errors
    }
};

// Call main menu
console.log(mainMenu); // Logs the main menu function
console.log(Employee); // Logs the Employee object
console.log(typeof Employee.addEmployee); // Logs the type of the addEmployee method
module.exports = { mainMenu }; // Exports the mainMenu function for use in other files
mainMenu(); // Calls the main menu function to start the application
