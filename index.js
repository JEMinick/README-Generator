// fs is a Node standard library package for reading and writing files
const fs = require( 'fs' );
const inquirer = require( 'inquirer' );
const mdGenerator = require( './utils/generateMarkdown.js' );

// ====================================================================
// ====================================================================
// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
// const questions = [];

// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
// init();
// ====================================================================
// ====================================================================

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

// Provide a short description explaining the what, why, and how of your project.
// Use the following questions as a guide:
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

// Suggestions from Elma:
// -----------------------
// What is your GitHub username? eyl91
// What is your email address? email@email.com
// What is your project's name? Project 1
// Please write a short description of your project: Here's a great description
// What kind of license should your project have? MIT
// What command should be run to install dependencies? npm i
// What command should be run to run tests? npm test
// What does the user need to know about using the repo? Here are some steps for the user.
// What does the user need to know about contributing to the repo? I don't want people contributing!

let primaryQuestions = [];
function init()
{
  primaryQuestions = [
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
      message: 'What email address would you like to use?',
      name: 'email_addr',
    },
    {
      type: 'input',
      message: 'Project Description:\n   My primary reason for creating this project was... ?',
      name: 'prj_motivator',
    },
    {
      type: 'input',
      message: ' The primary issue being addressed by this app is... ?',
      name: 'prj_problem',
    },
    {
      type: 'input',
      message: ' What was learned by creating this project?',
      name: 'prj_learned',
    },
    {
      type: 'input',
      message: 'Enter specific installation requirements (e.g., npm i inquirer):',
      name: 'install_reqs'
    },
    {
      type: 'input',
      message: 'Enter specific test instructions (e.g., npm test):',
      name: 'test_instructions'
    },
    {
      type: 'confirm',
      message: 'Do you desire contributions to this project?',
      name: 'prj_contributions'
    },
    {
      type: 'input',
      message: 'Copyright Information:\n   The copyright year(s):',
      name: 'prj_copyrightYear',
    },
    {
      type: 'input',
      message: ' The copyright name:',
      name: 'prj_copyrightName',
    },
    {
      type: 'list',
      message: ' What license should be associated to this project?',
      choices: [ "MIT",         
                "ISC",
                new inquirer.Separator(),
                "GNU GPLv3",
                "GNU GPLv2",
                "Apache v2.0"
              ],
      name: 'prj_license',
    }
  ];

  // prj_license associations:
  // --------------------------
  // [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  // [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  // [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  // [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  // [![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

  // const communityLicenseTypes = [
  // {
  //   type: 'list',
  //   message: ' What Existing/Community license should be associated to this project?',
  //   choices: [ "MIT", 
  //               new inquirer.Separator(), "ISC", 
  //               new inquirer.Separator(), "Apache v2.0", 
  //               new inquirer.Separator(), "GNU GPLv3", 
  //               new inquirer.Separator(), "GNU GPLv2",
  //               new inquirer.Separator() ],
  //   name: 'prj_communityLicense',
  // }
  // ];
}

// -----------------------------
// let userAnswers = [
//   {
//     sPrjName: "",
//     sUserName: "",
//     sEmailAddr: "",
//     sPrjMotivator: "",
//     sPrjProblem: "",
//     sPrjLearned: "",
//     sCopyrightYear: "",
//     sCopyrightName: "",
//     sPrjLicense: ""
//   },
//   {
//     sCommunityLicense: ""
//   }
// ];
// -----------------------------
// let aQuestions = [];
// let iTotalQuestions = 2;
// for( var iQuestionNo=0; iQuestionNo < iTotalQuestions;  iQuestionNo++ )
// {
//   console.log( "Question# "+iQuestionNo );
//   aQuestions = [];
//   switch( iQuestionNo ) {
//     case( 0 ):
//       aQuestions = primaryQuestions;
//       break;
//     case( 1 ):
//       console.log( "License chosen: "+userAnswers[0].sPrjLicense );
//       if ( userAnswers[0].sPrjLicense === 'Community' ) {
//         console.log( "LICENSE selected: " + userAnswers[0].sPrjLicense );
//         aQuestions = communityLicenseTypes;
//       }
//       break;
//   }
//   if ( aQuestions.length > 0 )
//   {
//     inquirer
//     .prompt( aQuestions )
//     .then( (answers) =>
//     {
//       switch( iQuestionNo ) {
//         case( 0 ):
//           userAnswers[0].sPrjName = answers.prj_name;
//           userAnswers[0].sUserName = answers.username;
//           userAnswers[0].sEmailAddr = answers.email_addr;
//           userAnswers[0].sPrjMotivator = answers.sPrjMotivator;
//           userAnswers[0].sPrjProblem = answers.prj_problem;
//           userAnswers[0].sPrjLearned = answers.sPrjLearned;
//           userAnswers[0].sCopyrightYear = answers.prj_copyrightYear;
//           userAnswers[0].sCopyrightName = answers.prj_copyrightName;
//           userAnswers[0].sPrjLicense = answers.prj_license;
//           break;
//         case( 1 ):
//           userAnswers[1].sCommunityLicense = answers.prj_communityLicense;
//           break;
//       }
//     });
//   }
// }
// ------------------------------------------------------------------
// console.log( mdGenerator.getUserInput(primaryQuestions) );
// console.log( mdGenerator.getUserInput(communityLicenseTypes) );
// ------------------------------------------------------------------

function askQuestions() {
inquirer
.prompt( primaryQuestions )
.then( (answers) =>
{
let sPrjContributions = "";
if ( answers.prj_contributions ) {
sPrjContributions = `There are many ways in which you can participate in the ${answers.prj_name} project, for example:
*    [Submit bugs and feature requests](https://github.com/JEMinick/${answers.prj_name}/issues), and help verify they are checked in;
*    Review [source code changes](https://github.com/JEMinick/${answers.prj_name}/pulls); and,
*    Review the documentation and make pull requests for anything from typos to new content.`
}
else {
sPrjContributions = `I do not desire any contributions to project ${answers.prj_name}...`;
}

var sUserResponse = mdGenerator.generateMarkdown(answers,sPrjContributions);

});
}

// =========================================================================================================================

init();
askQuestions();
