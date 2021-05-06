
const fs = require( 'fs' );
const inquirer = require( 'inquirer' );

let sBadgeURL = "";

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  
  var sURL = "";

  if ( license === null || license.length === 0 ) {
    sURL = "UNDEFINED";
  }
  else {
    // Expected choices: "MIT", "GNU GPLv3", "Community"
    switch( license ) {
      case "MIT":
        sURL = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        break;
      case "GNU GPLv3":
        sURL = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        break;
      case "Community":
        break;
      default:
        break;
    }
  }

  // MIT license:
  // [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  // GNU license:
  // [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  
  // Existing/Community licenses:
  // [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  // [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  // [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  // [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  // [![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  
  sBadgeURL = sURL;
  
  return sURL;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license,sCopyrightYear,sCopyrightName)
{
  var sSrcLicense = "";
  var sDestLicense = "./output/LICENSE";
  switch ( license ) {
    case "Apache v2.0":
      sSrcLicense = "Apache-v2-LICENSE.txt";
      break;
    case "GNU GPLv2":
        sSrcLicense = "GNUGPLv2-LICENSE.txt";
        break;
    case "GNU GPLv3":
      sSrcLicense = "GNUGPLv3-LICENSE.txt";
      break;
    case "ISC":
      sSrcLicense = "ISC-LICENSE.txt";
      break;
    case "MIT":
      sSrcLicense = "MIT-LICENSE.txt";
      break;
    default:
      sDestLicense = "";
  }
  if ( sSrcLicense.length > 0 )
  {
    fs.readFile(sSrcLicense, 'utf8', (error, data) => {
      if ( error ) {
        console.error(error);
        sDestLicense = "";
      } else {
        fs.writeFile(sDestLicense, data, (error) => {
          if ( error ) {
            console.error(error);
            sDestLicense = "";
          }
          else
          {
            console.log( `LICENSE TEXT: (length of data: ${data.length})` );
            // console.log( data );
            
            let iLineCount=0;
            var sData = data;
            var sSentences = sData.split('\r\n');
            
            // sSentences.forEach( element => {
            //   iLineCount++;
            //   console.log( iLineCount, element )
            // });
            
            const snrTokens = [
              '[${crYear}]',
              '[${crName}]' ];
            var iSubIdx=-1;
            var sPrefix="", sPostfix="";
            
            for( var i=0; ( i < sSentences.length ); i++ ) {
              console.log( `\nSearching sentence: [${sSentences[i]}]` );
              for( var j=0; (j < snrTokens.length); j++ ) {
                iSubIdx=-1;
                sPrefix="";
                sPostfix="";
                iSubIdx = sSentences[i].indexOf(snrTokens[j]);
                console.log( sSentences[i], iSubIdx, snrTokens[j] );
                switch( j ) {
                  case 0: // Copyright Year, 
                    if ( iSubIdx >= 0 ) {
                      console.log( `Found token: ${snrTokens[j]}` );
                      if ( iSubIdx > 0 ) {
                        sPrefix = sSentences[i].substr(0,iSubIdx);
                      }
                      if ( sSentences[i].length > (iSubIdx+snrTokens[j].length) ) {
                        sPostfix = sSentences[i].substring( iSubIdx+snrTokens[j].length, sSentences[i].length );
                      }
                      // sSentences[i] = sPrefix + sCopyrightYear + sPostfix;
                      console.log( `Line: [${sSentences[i]}]` );
                      console.log( `Replace token "${snrTokens[j]}"` );
                      console.log( `Sub-index: [${iSubIdx}]` );
                      console.log( `Line prefix: "${sPrefix}"` );
                      console.log( `Line postfix: "${sPostfix}"` );
                    }
                    break;
                  case 1: // Copyright Name
                    break;
                }
              }
              iLineCount++;
              console.log( iLineCount, sSentences[i] );
            }

            console.log( `Total line count: [${iLineCount}]` );
            
            // for( var i=0; i < data.length; i++ ) {
            //   console.log( data[i] );
            // }
            
          }
        });
      }
    });
  }
  return( sDestLicense );
}

// ======================================================================================

function renderLicenseSection(licenseYear,licenseName,licenseType) {
var sCopyrightStmt=
`Copyright (c) ${licenseYear} ${licenseName}. All rights reserved.\n
Licensed under the [${licenseType}](./LICENSE) license.`;
  return sCopyrightStmt;
}

// ======================================================================================

function generateMarkdown(data,sPrjContributions)
{
// ---------------------------------------
// *    [Usage](#usage)
// ## Usage
// <a name="usage"></a>
// Here are some steps for the user...
// ---------------------------------------
// Motivation:      ${data.prj_motivator}   
// Problem solved:  ${data.prj_problem}   
// Leason learned:  ${data.prj_learned}
// ---------------------------------------
// Copyright (c) ${data.prj_copyrightYear} ${data.prj_copyrightName}. All rights reserved.
// Licensed under the [${data.prj_license}](./LICENSE.txt) license.

var mdText = 
`# Project: ${data.prj_name}

  ${renderLicenseBadge(data.prj_license)}
  
## Table of Contents

*    [Installation](#installation)
*    [Contributing](#contributing)
*    [Tests](#tests)
*    [Questions](#questions)
*    [License](#license)

## User Info:
    GitHub: https://github.com/${data.username}   
    eMail:  ${data.email_addr}

## Description: 

The primary motivation for creating ${data.prj_name} was ${data.prj_motivator}.
The problem being addressed and resolved with this app is ${data.prj_problem}.
By creating this app, I learned the following: ${data.prj_learned}

## Installation
<a name="installation"></a>

Modules and packages required to be installed:

\`\`\`shell
${data.install_reqs}
\`\`\`

## Contributing
<a name="contributing"></a>
${sPrjContributions}

## Tests
<a name="tests"></a>
To run tests, run the following command(s):
\`\`\`shell
${data.test_instructions}
\`\`\`

## Questions
<a name="questions"></a>
If you have any questions reguarding this repo, open an issue or
contact me directly at ${data.email_addr}

You can find more of my work at: [${data.username}](https://github.com/${data.username})

## License
<a name="license"></a>
${renderLicenseSection(data.prj_copyrightYear,data.prj_copyrightName,data.prj_license)}

\n`;

  var bError = false;
  fs.mkdir( './output', (error) => {
    if ( error ) {
      if ( error.errno === -4075 ) {
        // directory already exists...
      } else {
        bError = true;
        console.error(error);
      }
    } else {
      console.log( "Created ./output folder..." );
    }
  });
  if ( !bError ) {
    fs.writeFile('./output/README.md', mdText, (error) => {
      if ( error ) {
        bError = true;
        console.error(error);
      } else {
        console.log(`\nFILE CONTENTS:`)
      }
    });
  }
  if ( !bError ) {
    fs.readFile( './output/README.md', 'utf8', (error, data) => {
      if ( error ) {
        bError = true;
        console.error(error);
      } else {
        console.log( `Files created are located in: ./output/...`);
      }
    });
  }
  if ( !bError ) {
    var sLicenseInfo = renderLicenseLink(data.prj_license,data.sCopyrightYear,data.sCopyrightName);
  }
  
  return( mdText );
};

let userAnswers =
  {
    sPrjName: "",
    sUserName: "",
    sEmailAddr: "",
    sPrjMotivator: "",
    sPrjProblem: "",
    sPrjLearned: "",
    sCopyrightYear: "",
    sCopyrightName: "",
    sPrjLicense: ""
  };

function getUserInput( questions ) {
  console.log( 'Ask the following questions:' );
  console.log( questions );
  inquirer
  .prompt( questions )
  .then( (answers) =>
  {
  });
  return answers;
}

module.exports = {
  getUserInput,
  renderLicenseBadge,
  generateMarkdown
}
