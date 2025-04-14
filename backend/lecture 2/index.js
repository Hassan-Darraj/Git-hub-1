/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module. 
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{
    message:"Please enter the url:",
    name: 'url'
  }])
  .then((answers) => {
    console.log(answers.url)

    var qr_svg = qr.image(answers.url);
    qr_svg.pipe(fs.createWriteStream('qr.png'));
    fs.writeFile('qr-inputs', answers.url, (err)=>{
        if(err) throw err;
    })
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
