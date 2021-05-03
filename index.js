// fs is a Node standard library package for reading and writing files
const fs = require('fs');

const inquirer = require('inquirer');

//---------------------------------------------------------------------
// inquirer.js:
// var inquirer = require('inquirer');
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then(answers => {
//     // Use user feedback for... whatever!!
//   })
//   .catch(error => {
//     if(error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
//---------------------------------------------------------------------

//=======================================================================================================================================================================================================
//   An example professional version of README.md:
//=======================================================================================================================================================================================================

// # <Your-Project-Title>

// ## Description

// Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:
// - What was your motivation?
// - Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
// - What problem does it solve?
// - What did you learn?

// ## Table of Contents (Optional)

// If your README is long, add a table of contents to make it easy for users to find what they need.

// - [Installation](#installation)
// - [Usage](#usage)
// - [Credits](#credits)
// - [License](#license)

// ## Installation

// What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

// ## Usage

// Provide instructions and examples for use. Include screenshots as needed.

// To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

// ```md
//     ![alt text](assets/images/screenshot.png)
//     ```

// ## Credits

// List your collaborators, if any, with links to their GitHub profiles.

// If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

// If you followed tutorials, include links to those here as well.

// ## License

// The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. 
// If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

// ---

//=======================================================================================================================================================================================================
//=======================================================================================================================================================================================================

// What is your GitHub username? eyl91
// What is your email address? email@email.com
// What is your project's name? Project 1
// Please write a short description of your project: Here's a great description
// What kind of license should your project have? MIT
// What command should be run to install dependencies? npm i
// What command should be run to run tests? npm test
// What does the user need to know about using the repo? Here are some steps for the user.
// What does the user need to know about contributing to the repo? I don't want people contributing!

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the name of your project?',
      name: 'prj_name',
    },
    {
      type: 'input',
      message: 'What is your GitHub username?',
      name: 'username',
    },
    {
      type: 'input',
      message: 'What is your email address?',
      name: 'email_addr',
    },
  ])
  .then( (answers) =>
  {
    // var sUserResponse = 
    //     "\nName: " + answers.username + "\n"
    //     + "eMail Address: " + answers.email_addr + "\n"
    //     + "GitHub Project: " + answers.prj_name + "\n";

        var sUserResponse = `Name: ${answers.username}
eMail Address: ${answers.email_addr}
GitHub Project: ${answers.prj_name}\n`;
    
    fs.writeFile('README.md.txt', sUserResponse, (error) =>
        error ? console.error(error) : console.log(`\nFILE CONTENTS:`)
    );
    fs.readFile('README.md.txt', 'utf8', (error, data) =>
        error ? console.error(error) : console.log(data)
    );
});

