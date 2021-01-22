const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//empty employee array
let employees = [];

//promps for employee information
const promps = [
    {
        type: 'list',
        message: "What is the employee job title?",
        choices: ['Manager','Engineer','Intern'],
        name: 'title',
        validate: (value) => { if (value) { return true } else { return 'I need a value to continue' }}
    },
    {
        type: 'input',
        message: "What is your name?",
        name: 'name',
        validate: (value) => { if (value) { return true } else { return 'I need a value to continue' } }
    },
    {
        type: 'input',
        message: "What is your ID number?",
        name: 'id',
        validate: (value) => { if (value) { return true } else { return 'I need a value to continue' }}
    },
    {
        type: 'input',
        message: "What is your email",
        name: 'email',
        validate: (value) => { if (value) { return true } else { return 'I need a value to continue' }}
    },
    {
        type: 'input',
        message: "What is your Github username?",
        name: 'github',
        when: (answers) => answers.title === 'Engineer'
    },
    {
        type: 'input',
        message: "What is your office phone number?",
        name: 'officeNumber',
        when: (answers) => answers.title === 'Manager'
    },
    {
        type: 'input',
        message: "Which school do you attend?",
        name: 'school',
        when: (answers) => answers.title === 'Intern',
    },
    {
        type: 'confirm',
        message: "Would you like to add another employee?",
        name: 'anotherEmployee',
        validate: (value) => { if (value) { return true } else { return 'I need a value to continue' }}
    },
]

//use inquirer to prompt info from user
const addEmployee = () => {
    inquirer
    .prompt(prompts)
    .then((answers) => {
        switch (answers.title){
            case 'Manager':
                employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));
            break;
            case 'Engineer':
                employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
            break;
            case 'Intern':
                employees.push(new Manager(answers.name, answers.id, answers.email, answers.school));
            break;
        }
        if (answers.Employee){
            addEmployee();
        } else {
            fs.writeFile(outputPath, render(employees), (err)=>{
                if (err) throw err;
                console.log('The file has successfully been saved!');
            });
        }
            });
        }
        function init() {
            addEmployee();
        }


        init();
