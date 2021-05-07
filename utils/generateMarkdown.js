let bDebugging = false;

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
      case "ISC":
        sURL = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
        break;
      case "GNU GPLv2":
        sURL = "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
        break;
      case "GNU GPLv3":
        sURL = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        break;
      case "Apache v2.0":
        sURL = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        break;
      default:
        break;
    }
  }

  // Basic Licenses:
  //   MIT license:
  //     [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  //   GNU license:
  //     [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  //
  // Common Existing/Community licenses:
  //   [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  //   [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  //   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  //   [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  //   [![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  
  sBadgeURL = sURL;
  
  return sURL;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license,sCopyrightYear,sCopyrightName)
{
  var sSrcLicense = "";
  var sDestLicense = "./output/LICENSE";
  var sDest2License = "./output/LICENSE2";
  
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
            if ( bDebugging ) {
              console.log( `LICENSE TEXT: (length of data: ${data.length})` );
              console.log( `Parameters: License:[${license}], Year:[${sCopyrightYear}], Name:[${sCopyrightName}]` );
              // console.log( data );
            }
            
            let iLineCount=0;
            var sData = data;
            var sSentences = sData.split('\r\n');
            
            // sSentences.forEach( element => {
            //   iLineCount++;
            //   console.log( iLineCount, element )
            // });
            
            // Identify the 'search-n-replace' tokens:
            const snrTokens = [
              { token: '[${crYear}]', replacement: sCopyrightYear },
              { token: '[${crName}]', replacement: sCopyrightName } ];
            var iTokenUpdates=0;
            var iSubIdx=-1;
            var sLeadingTxt="", sTrailingTxt="";
            
            for( let i=0; ( i < sSentences.length ); i++ )
            {
              // console.log( `\nSearching sentence: [${sSentences[i]}]` );
              for( var j=0; (j < snrTokens.length); j++ )
              {
                // iSubIdx = -1;
                iSubIdx = sSentences[i].indexOf(snrTokens[j].token);
                // console.log( sSentences[i], iSubIdx, snrTokens[j] );

                if ( iSubIdx >= 0 ) {
                  if ( bDebugging )
                    console.log( `Found token: ${snrTokens[j].token}` );
                  if ( iSubIdx > 0 ) {
                    sLeadingTxt = sSentences[i].substr(0,iSubIdx);
                  } else {
                    sLeadingTxt = "";
                  }
                  if ( sSentences[i].length > (iSubIdx+snrTokens[j].token.length) ) {
                    sTrailingTxt = sSentences[i].substring( iSubIdx+snrTokens[j].token.length, sSentences[i].length );
                  } else {
                    sTrailingTxt = "";
                  }
                  if ( bDebugging ) {
                    console.log( `   Line before update: [${sSentences[i]}]` );
                    // console.log( `Replace token "${snrTokens[j].token}"` );
                    // console.log( `Sub-index: [${iSubIdx}]` );
                    // console.log( `Line prefix: "${sLeadingTxt}"` );
                    // console.log( `Line postfix: "${sTrailingTxt}"` );
                  }
                  sSentences[i] = sLeadingTxt 
                                  // + ( j === 0 ? sCopyrightYear : sCopyrightName )
                                  + snrTokens[j].replacement
                                  + sTrailingTxt;
                  if ( bDebugging )
                    console.log( `   Line after update: [${sSentences[i]}]` );
                  iTokenUpdates++;
                }

              }
              iLineCount++;
              if ( bDebugging )
                console.log( iLineCount, sSentences[i] );
            }
            
            if ( bDebugging )
              console.log( `Total line count: [${iLineCount}]\n` );
            
            if ( iTokenUpdates > 0 )
            {
              // Begin with a new file:
              fs.unlink( sDestLicense, (err) => {
                if ( err ) {
                  if ( err.code === 'ENOENT' ) {
                    err = false;
                  } else {
                    console.error(err);
                    sDest2License = "";
                  }
                } 
                if ( !err )
                {
                  var iLinesWritten=0;
                  //----------------------------------------------------------------------
                  // 2021-May-06:  Creating the new file in this fashion creates
                  //               some really strange results...
                  //
                  // var bAbort=false;
                  // for( let k=0; (!bAbort) && (k < sSentences.length); k++ ) {
                  //   fs.appendFile( sDest2License, sSentences[k]+"\n", (error) => {
                  //     if ( error ) {
                  //       console.error(error);
                  //       sDest2License = "";
                  //       bAbort = true;
                  //     }
                  //     else
                  //     {
                  //       iLinesWritten++;
                  //       console.log( iLinesWritten, `${sSentences[k]}` );
                  //     }
                  //   });
                  // } // endFor
                  //----------------------------------------------------------------------
                  
                  data = '';
                  for( let k=0; (k < sSentences.length); k++ ) {
                    iLinesWritten++;
                    // console.log( iLinesWritten, sSentences[k] );
                    // data += ( sSentences[k] + "\n" );
                    data += ( `${sSentences[k]}\n` );
                  }
                  
                  fs.writeFile(sDestLicense, data, (error) => {
                    if ( error ) {
                      console.error( error );
                      sDest2License = "";
                    }
                    else {
                      if ( bDebugging )
                        console.log( `New Total line count: [${iLinesWritten}]\n` );
                    }
                  })
                  
                } // endIf !err
                
              }) // endUnlink
              
            }
            
            // for( var i=0; i < data.length; i++ ) {
            //   console.log( data[i] );
            // }
            
          } // endElseIf writeFile succeeded
          
        });
      }
    });
  }
  return( sDestLicense );
}

// ======================================================================================

function renderTestingSection(testInstructions) {
var sTestingSection = '';
if ( testInstructions.length > 0 ) {
sTestingSection = 
`To run tests, run the following command(s):
\`\`\`shell
${testInstructions}
\`\`\``;
} else {
sTestingSection =
`   Tests are not yet defined...`;
}
return sTestingSection;
}

// ======================================================================================

function renderLicenseSection(licenseYear,licenseName,licenseType) {
var sCopyrightStmt=
`Copyright (c) ${licenseYear} ${licenseName}. All rights reserved.\n
Licensed under the [${licenseType}](./LICENSE) license.`;
  return sCopyrightStmt;
}

// ======================================================================================

function generateMarkdown( data, sPrjContributions )
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
// ---------------------------------------
// \`\`\`shell
// ${data.test_instructions}
// \`\`\`
// ---------------------------------------

if ( bDebugging )
  console.log( data );

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
By creating this app, I learned the following: ${data.prj_learned}.

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
${renderTestingSection(data.test_instructions)}

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
      if ( bDebugging )
        console.log( "Created ./output folder..." );
    }
  });
  if ( !bError ) {
    fs.writeFile('./output/README.md', mdText, (error) => {
      if ( error ) {
        bError = true;
        console.error(error);
      } else {
        if ( bDebugging )
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
        console.log( `\nFiles created are located in: ./output/...`);
      }
    });
  }
  if ( !bError ) {
    var sLicenseInfo = renderLicenseLink( data.prj_license,
                                          data.prj_copyrightYear,
                                          data.prj_copyrightName );
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

// function getUserInput( questions ) {
//   console.log( 'Ask the following questions:' );
//   console.log( questions );
//   inquirer
//   .prompt( questions )
//   .then( (answers) =>
//   {
//   });
//   return answers;
// }

module.exports = {
  // getUserInput,
  renderLicenseBadge,
  generateMarkdown
}
