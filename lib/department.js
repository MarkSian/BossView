const db = require('../db/connection.js');
const inquirer = require('inquirer');

// Function to add a department
const addDepartment = async (departmentName, mainMenu) => {
    try {
        // Execute an SQL query to insert a new department into the database
        const result = await db.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [departmentName]);
        // Log the name of the added department
        console.log(`Department '${result.rows[0].name}' added!`);
    } catch (error) {
        // Log an error message if the query fails
        console.error('error adding department:', error);
    } finally {
        // Call the main menu function if it is provided
        if (typeof mainMenu === 'function') {
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    }
};

// Function to view all departments
const viewDepartments = async (mainMenu) => {
    try {
        // Execute an SQL query to select all departments from the database
        const result = await db.query('SELECT id, name::text AS name FROM department');
        // Display the result in a formatted table
        console.table(result.rows.map(row => ({
            id: row.id,
            name: row.name
        })));
    } catch (error) {
        // Log an error message if the query fails
        console.error('error viewing departments:', error);
    } finally {
        // Call the main menu function if it is provided
        if (typeof mainMenu === 'function') {
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    }
};

// Function to delete a department
const deleteDepartment = async (departmentId, mainMenu) => {
    try {
        // Execute an SQL query to delete a department by its ID
        const result = await db.query('DELETE FROM department WHERE id = $1 returning *', [departmentId]);
        // Check if any rows were deleted and log the appropriate message
        if (result.rowCount > 0) {
            console.log(`Department with id ${departmentId} deleted!`);
        } else {
            console.log(`Department with id ${departmentId} not found!`);
        }
    } catch (error) {
        // Log an error message if the query fails
        console.error('error deleting department:', error);
    } finally {
        // Call the main menu function if it is provided
        if (typeof mainMenu === 'function') {
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    }
};

module.exports = {
    addDepartment,
    viewDepartments,
    deleteDepartment
};