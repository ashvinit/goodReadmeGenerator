const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const promptUser = () =>
inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },
    {
        type: 'input',
        name: 'projectname',
        message: 'What is the name of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a short description of your project.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'What kind of license should your project have?',
        choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3', 'None']
    },
    {
        type: 'input',
        name: 'install',
        message: 'What command should be run to install dependencies?'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What command should be run to run tests?'
    },
    {
        type: 'input',
        name: 'using',
        message: 'What does the user need to know about using the repo?'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?'
    }
]);

const generateREADME = (answers) =>

`
# ${answers.projectname} ![License: ${answers.license}](https://img.shields.io/static/v1?label=License&message=${answers.license}&color=ff69b4)


## Description

${answers.description}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## Installation

The command that should be run to install dependencies is: 
${answers.install}


## Usage

${answers.using}


## License

This application is covered under the ${answers.license} license.


## Contributing

${answers.contributing}


## Tests

The command that should be run to run tests is:
${answers.tests}


## Questions

If you have any further questions regarding this project, please feel free to contact.

GitHub Username: ${answers.username}
Email Address: ${answers.email}


`;

promptUser()
.then((answers) => writeFileAsync('README.md', generateREADME(answers)))
.then(() => console.log('Successfully write to index.html'))
.catch((err) => console.error(err));
