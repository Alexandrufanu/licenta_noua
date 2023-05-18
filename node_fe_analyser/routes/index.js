
// import { cwd } from 'process';
let path = require('path')
var express = require('express');

var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});


router.get('/full-report', function(req, res, next) {

  // const response = { test: 'Express' };
  // res.json(response);

  console.log(__dirname.replace("routes", ""))
  // console.log()
  const filePath = path.join(__dirname.replace("routes", ""), '.lighthouseci', 'lhr-1683650675958.json');
  res.sendFile(filePath);


});



const fs = require('fs');


const { omit } = require('lodash');



router.get("/test", function(req, res, next) {

  const response = { test: 'Express' };
  res.json(response);


})


// router.get('/skimmed-report', function(req, res, next) {

//   runsNumber =  req.query.runsNumber;
//   console.log(__dirname.replace("routes", ""), runsNumber);

//   const directoryPath = path.join(__dirname.replace("routes", ".lighthouseci"));

//   let jsonFiles = null ;
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error parsing directory to JSON');
//     }

//   jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
//   console.log(jsonFiles)
  

//   let json_list = []
  
//   if(jsonFiles !== null)
//   // // Read the JSON file
//   jsonFiles.forEach( fileName =>

//     {
//       fs.readFile(path.join(directoryPath, fileName), 'utf8', function(err, data) {
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Error reading file');
//         }

//         try {
//           const report = JSON.parse(data);

//           // deleting all of the paths with images in byte data 
//           delete report.audits['screenshot-thumbnails'];
//           delete report.audits['final-screenshot'];
//           delete report.audits["network-requests"]['items'];
//           delete report.audits["prioritize-lcp-image"]['details']['debugData']['initiatorPath'];
//           delete report.fullPageScreenshot

//           // // Send the modified JSON as the response
//           // res.json(report);

//           json_list.push(report)

//         } catch (error) {
//           console.error(error);
//           return res.status(500).send('Error parsing JSON');
//         }
//       });
//     });
//     else console.log("jsonFiles is null ")
//   });

//     res.send(json_list)

// });



const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);



const {runLighthouseCI, updateLighthouseConfig, modifyLighthouseConfig } = require('../utils/lighthouse');


const lighthousercPath = 'lighthouserc.js';


// create endpoint for running lighthouse
router.get('/run-lighthouse', async function(req, res, next) {
  try {
    console.log("running lighthouse")

    updateLighthouseConfig(lighthousercPath, modifyLighthouseConfig);

    const { stdout, stderr } = await runLighthouseCI("http://localhost:3006", {test: 34 });
    res.json({ stdout, stderr });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error running Lighthouse CI');
  }
});




router.get('/skimmed-report', async function(req, res, next) {


  // running lighthouse
  // try {
  //   console.log("running lighthouse")

  //   // updateLighthouseConfig(lighthousercPath, modifyLighthouseConfig);

  //   // const { stdout, stderr } = 
  //   await runLighthouseCI("http://localhost:3006", {test: 34 });
  //   // res.json({ stdout, stderr });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error running Lighthouse CI');
  // }


  const runsNumber = req.query.runsNumber;
  console.log(__dirname.replace("routes", ""), runsNumber);



  const directoryPath = path.join(__dirname.replace("routes", ".lighthouseci"));

  try {
    const files = await promisify(fs.readdir)(directoryPath);

    //  only the ones starting with lhr
    const jsonFiles = files.filter(file => { 
      return file[0]=="l" && file[1]=="h" && file[2]=="r" &&  path.extname(file).toLowerCase() === '.json'});
    console.log(jsonFiles);

    const json_list = [];

    for (const fileName of jsonFiles) {
      const data = await readFileAsync(path.join(directoryPath, fileName), 'utf8');

      try {
        const report = JSON.parse(data);
        // Modify the JSON report as needed
        delete report.audits['screenshot-thumbnails'];
        delete report.audits['final-screenshot'];
        delete report.audits["network-requests"]['items'];
        delete report.audits["prioritize-lcp-image"]['details']['debugData']['initiatorPath'];
        delete report.fullPageScreenshot;

        json_list.push(report);
      } catch (error) {
        console.error(error);
        return res.status(500).send('Error parsing JSON');
      }
    }

    res.json(json_list);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error parsing directory to JSON');
  }
});





// runsNumber =  req.query.runsNumber;
// console.log(__dirname.replace("routes", ""), runsNumber);

// const directoryPath = path.join(__dirname.replace("routes", ".lighthouseci"));

// let  jsonFiles = null 
// fs.readdir(directoryPath, (err, files) => {
//   if (err) {
//     console.error(err);
//     return res.status(500).send('Error parsing directory to JSON');
//   }

// jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
// console.log(jsonFiles)
// });

// let json_list = []


// // // Read the JSON file
// jsonFiles.forEach( fileName =>

//   {
//     fs.readFile(path.join(directoryPath, fileName), 'utf8', function(err, data) {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error reading file');
//       }

//       try {
//         const report = JSON.parse(data);

//         // deleting all of the paths with images in byte data 
//         delete report.audits['screenshot-thumbnails'];
//         delete report.audits['final-screenshot'];
//         delete report.audits["network-requests"]['items'];
//         delete report.audits["prioritize-lcp-image"]['details']['debugData']['initiatorPath'];
//         delete report.fullPageScreenshot

//         // // Send the modified JSON as the response
//         // res.json(report);

//         json_list.push(report)

//       } catch (error) {
//         console.error(error);
//         return res.status(500).send('Error parsing JSON');
//       }
//     });
//   });

//   console.log(json_list)

module.exports = router;




