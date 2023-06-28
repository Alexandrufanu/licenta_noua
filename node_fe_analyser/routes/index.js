
let path = require('path')
var express = require('express');

var router = express.Router();

// import path from 'path';
// import express from 'express';
// import {exec} from 'child_process';

const { spawn } = require('child_process');



exec = require('child_process').exec;


/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  res.json({ title: 'Express' });
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
// import fs from 'fs';


// const { omit } = require('lodash');



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



const {runLighthouseCI, updateLighthouseConfig, modifyLighthouseConfig, clearBackendCache, getIterations } = require('../utils/lighthouse');
const { get } = require('http');


// const lighthousercPath = 'lighthouserc.js';


// create endpoint for running lighthouse
router.get('/run-lighthouse', async function(req, res, next) {
  try {
    console.log("running lighthouse")

    // updateLighthouseConfig(lighthousercPath, modifyLighthouseConfig);

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
    await runLighthouseCI("http://localhost:3006", {test: 34 });
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





async function runLighthouseCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing Lighthouse: ${error}`);
        return;
      }

      resolve(stdout);
    });
  });
}


async function runLHCI() {
  return new Promise((resolve, reject) => {
    exec("npx lhci collect --config=lighthouserc.js  --url=http://localhost:3006", (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing Lighthouse: ${error}`);
        return;
      }

      resolve(stdout);
    });
  });
}





// router.get("/get-cpu", async function(req, res, next) {

//   const Docker = require('dockerode');
//   const docker = new Docker();

//   // Get container stats
//   docker.getContainer("1c43f74c7af2").stats({ stream: false }, (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     // Extract relevant metrics from the data
//     const cpuUsage = data.cpu_stats.cpu_usage.total_usage;
//     const memoryUsage = data.memory_stats.usage;

//     // Process and use the metrics as needed
//     console.log('CPU Usage:', cpuUsage);
//     console.log('Memory Usage:', memoryUsage);
//   });

//   return res.json({cpu: cpuUsage, memory: memoryUsage})
// });

// router.get("/get-cpu", async function(req, res, next) {

//   const Docker = require('dockerode');
//   const docker = new Docker();

//   // Get container stats
//   docker.getContainer("1c43f74c7af2").stats({ stream: false }, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to get container stats' });
//     }

//     // Extract relevant metrics from the data
//     const cpuUsage = data.cpu_stats.cpu_usage.total_usage;
//     const memoryUsage = data.memory_stats.usage;

//     // Process and use the metrics as needed
//     console.log('CPU Usage:', cpuUsage);
//     console.log('Memory Usage:', memoryUsage);

//     return res.json({ cpu: cpuUsage, memory: memoryUsage });
//   });

//   return res.json({ AASD:"ASDASD" });

// });
// router.get("/get-cpu", async function(req, res, next) {

//   const Docker = require('dockerode');
//   const docker = new Docker();

//   // Get container stats
//   docker.getContainer("1c43f74c7af2").stats({ stream: false }, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to get container stats' });
//     }

//     // Extract relevant metrics from the data
//     const cpuUsage = data.cpu_stats.cpu_usage.total_usage;
//     const memoryUsage = data.memory_stats.usage;

//     // Process and use the metrics as needed
//     console.log('CPU Usage:', cpuUsage);
//     console.log('Memory Usage:', memoryUsage);

//     return res.json({ cpu: cpuUsage, memory: memoryUsage });
//   });

//   // Don't send a response here, let the Docker callback handle it.
// });



// using th Docker api -> https://docs.docker.com/engine/api/v1.41/

// cpu_stats: cpu_usage.percpu_usage
// memory_stats: max_usage and failcnt Also, memory_stats.stats fields are incompatible with cgroup v1.
// To calculate the values shown by the stats command of the docker cli tool the following formulas can be used:

// used_memory = memory_stats.usage - memory_stats.stats.cache
// available_memory = memory_stats.limit
// Memory usage % = (used_memory / available_memory) * 100.0
// cpu_delta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage
// system_cpu_delta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage
// number_cpus = lenght(cpu_stats.cpu_usage.percpu_usage) or cpu_stats.online_cpus
// CPU usage % = (cpu_delta / system_cpu_delta) * number_cpus * 100.0

router.get('/get-cpu-ram', async function(req, res, next) {

  try {

    const Docker = require('dockerode');
    const docker = new Docker();
  
    // Get container stats
    docker.getContainer("LearningPlatformBE").stats({ stream: false }, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to get container stats' });
      }
  
      // Extract relevant metrics from the data
      const cpuUsage = data.cpu_stats.cpu_usage.total_usage;
      const memoryUsage = data.memory_stats.usage;
      

      // cpuDelta: This is the difference in CPU usage of the container between the current and previous Docker API stats call.
      // systemDelta: This is the difference in total CPU usage of the entire system (all CPUs combined) between the current and previous Docker API stats call.
      // NUMBER_OF_CPU_CORES: The number of CPU cores on the host system. This can be obtained from the length of the percpu_usage array.
      // cpuPercent: The calculated CPU usage of the container as a percentage of the total CPU usage of the system.
      let cpuDelta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage;
      let systemDelta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;
      let NUMBER_OF_CPU_CORES = data.cpu_stats.cpu_usage.percpu_usage.length;
      let cpuPercent = ((cpuDelta / systemDelta) * NUMBER_OF_CPU_CORES) * 100;

      // Process and use the metrics as needed
      console.log('CPU Usage:', cpuUsage);
      console.log('Memory Usage:', memoryUsage);
  
      res.json({ cpuPercent: cpuPercent, memory: memoryUsage/1024/1024 });
    });



  } catch (error) {
    console.error(error);
    return res.status(500).send('Error parsing directory to JSON');
  }
});





// const getContainerStats = async () => { // containerName

//   try {

//     const Docker = require('dockerode');
//     const docker = new Docker();
  
//     // Get container stats // containerName = "LearningPlatformBE"
//     docker.getContainer("LearningPlatformBE").stats({ stream: false }, (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Failed to get container stats' });
//       }
  
//       // Extract relevant metrics from the data
//       const cpuUsage = data.cpu_stats.cpu_usage.total_usage;
//       const memoryUsage = data.memory_stats.usage;
      

//       // cpuDelta: This is the difference in CPU usage of the container between the current and previous Docker API stats call.
//       // systemDelta: This is the difference in total CPU usage of the entire system (all CPUs combined) between the current and previous Docker API stats call.
//       // NUMBER_OF_CPU_CORES: The number of CPU cores on the host system. This can be obtained from the length of the percpu_usage array.
//       // cpuPercent: The calculated CPU usage of the container as a percentage of the total CPU usage of the system.
//       let cpuDelta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage;
//       let systemDelta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;
//       let NUMBER_OF_CPU_CORES = data.cpu_stats.cpu_usage.percpu_usage.length;
//       let cpuPercent = ((cpuDelta / systemDelta) * NUMBER_OF_CPU_CORES) * 100;

//       // Process and use the metrics as needed
//       console.log('CPU Usage:', cpuUsage);
//       console.log('Memory Usage:', memoryUsage);
  
//       return(
//       {
//         // cpuPercent: cpuPercent,
//         CpuUsage: {
//           "id": "CpuUsage",
//           "title": "Cpu Usage",
//           "description": "Cpu Usage of the container",
//           "score": 1,
//           "scoreDisplayMode": "binary",
//           "numericValue": cpuUsage,
//           "toFixed": cpuUsage,
//           "numericUnit": "%",
        
//         // memory: memoryUsage/1024/1024 
//         }
//       }
//       );

//     });



//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Error parsing directory to JSON');
//   }
// };




const getContainerStats = () => { // removed `async` since we are using callback-based function and Promises
  return new Promise((resolve, reject) => { // create a new Promise
    try {
      const Docker = require('dockerode');
      const docker = new Docker();
    
      // Get container stats
      docker.getContainer("StoreBE_2").stats({ stream: false }, (err, data) => { // LearningPlatformBE
        if (err) {
          console.error(err);
          reject('Failed to get container stats'); // reject the promise if there is an error
        } else {
          // rest of your code...
          let cpuDelta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage;
          let systemDelta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;
          let NUMBER_OF_CPU_CORES = data.cpu_stats.cpu_usage.percpu_usage.length;
          let cpuPercent = ((cpuDelta / systemDelta) * NUMBER_OF_CPU_CORES) * 100;

          // Resolve the Promise with your object
          resolve({
            CpuUsage: {
              "id": "CpuUsage",
              "title": "Cpu Usage",
              "description": "Cpu Usage of the container",
              "score": 1,
              "scoreDisplayMode": "binary",
              "numericValue": cpuPercent, // changed from `cpuUsage` to `cpuPercent` as per your calculations
              "toFixed": cpuPercent, // changed from `cpuUsage` to `cpuPercent` as per your calculations
              "numericUnit": "%",
            },
            MemoryUsage: {
              "id": "MemoryUsage",
              "title": "Memory Usage",
              "description": "Memory Usage of the container",
              "score": 1,
              "scoreDisplayMode": "binary",
              "numericValue": data.memory_stats.usage/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
              "toFixed": data.memory_stats.usage/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
              "numericUnit": "MB",
            }


          });
        }
      });
    } catch (error) {
      console.error(error);
      reject('Error getting container stats'); // reject the promise if there is an error
    }
  });
};





router.get('/get-report', async function(req, res, next) {

  // const runsNumber = req.query.runsNumber;

  const siteTested = req.query.siteTested;

  console.log(siteTested, "site tested")

  console.log("all json data ", req.query)
  
  const directoryPath = path.join(__dirname.replace("routes", ".lighthouseci"));

  let responses = [];
  
  width = req.query.resolution.split("x")[0];
  height = req.query.resolution.split("x")[1];


  let browserCache = req.query.browserCache;
  let browserCacheIterations = -1;
  if (browserCache == "true") {

    browserCacheIterations = getIterations(req.query.browserCacheTime, req.query.runs)

  } 
  console.log("browserCacheIterations", browserCacheIterations)


  let backendCache = req.query.browserCache;
  let backendCacheIterations = -1;
  if (backendCache == "true") {
      backendCacheIterations = getIterations(req.query.backendCacheTime, req.query.runs) ;
  } 
  console.log("backendCacheIterations", backendCacheIterations)

  let users = req.query.users;
  let performanceTestIterations = -1;
  if (parseInt(users) > 1) {
    performanceTestIterations = getIterations(req.query.time, req.query.runs) ;
  }


  // res.json({json_list: []});


  let process = null
  // launching the performance test if the number of users is greater than 1
  if (performanceTestIterations > 0) {

    const command = 'performance_test\\venv\\Scripts\\python.exe';
    const args = [
      '-m', 'locust',
      '--headless',
      '--host', 'http://localhost:3006',
      '--users', req.query.users*1800,
      '-t', '1800s',
      '--json',
      '--skip-log',
      '--spawn-rate', req.query.users
    ];

    process = spawn(command, args);

    console.log("performance test started at ")

  }

  for (let i = 0; i < req.query.runs; i++) {
    try {
      
      let deleteBrowserCache = false;
      if  (i === browserCacheIterations  ) 
      {
        deleteBrowserCache = true;
      }

      // const command = `npx lighthouse "${siteTested + "?" + new URLSearchParams({ ...req.query, deleteCache: deleteBrowserCache})}" --chrome-flags="--no-sandbox --headless" --output=json --output-path=stdout --disable-dev-shm-usage --form-factor=${req.query.formFactor} --throttling.throughputKbps=${req.query.throughputKbps} --throttling.rttMs=0 --throttling.cpuSlowdownMultiplier=${req.query.cpuSlowdownMultiplier} --throttling.requestLatencyMs=0 --throttling.downloadThroughputKbps=0 --throttling.uploadThroughputKbps=0 --screenEmulation.width=${width} --screenEmulation.height=${height} --screenEmulation.deviceScaleFactor=1 --screenEmulation.mobile=false --disable-full-page-screenshot=true --only-audits="network-rtt,mainthread-work-breakdown,speed-index,network-server-latency,total-blocking-time,max-potential-fid,server-response-time,interactive,bootup-time"`
      const command = `npx lighthouse \"${siteTested + "?" + new URLSearchParams({ ...req.query, deleteCache: deleteBrowserCache})}\" --chrome-flags="--no-sandbox --headless" --output=json --output-path=stdout --disable-dev-shm-usage --form-factor=${req.query.formFactor} --throttling.throughputKbps=${req.query.throughputKbps} --throttling.rttMs=0 --throttling.cpuSlowdownMultiplier=${req.query.cpuSlowdownMultiplier} --throttling.requestLatencyMs=0 --throttling.downloadThroughputKbps=0 --throttling.uploadThroughputKbps=0 --screenEmulation.width=${width} --screenEmulation.height=${height} --screenEmulation.deviceScaleFactor=1 --screenEmulation.mobile=false --disable-full-page-screenshot=true --only-audits="network-rtt,mainthread-work-breakdown,speed-index,network-server-latency,total-blocking-time,max-potential-fid,server-response-time,interactive,bootup-time"`

      // const command = `npx lighthouse \"https://scholar.google.com\" --chrome-flags="--no-sandbox --headless" --output=json --output-path=stdout --disable-dev-shm-usage --form-factor=${req.query.formFactor} --throttling.throughputKbps=${req.query.throughputKbps} --throttling.rttMs=0 --throttling.cpuSlowdownMultiplier=${req.query.cpuSlowdownMultiplier} --throttling.requestLatencyMs=0 --throttling.downloadThroughputKbps=0 --throttling.uploadThroughputKbps=0 --screenEmulation.width=${width} --screenEmulation.height=${height} --screenEmulation.deviceScaleFactor=1 --screenEmulation.mobile=false --disable-full-page-screenshot=true --only-audits="network-rtt,mainthread-work-breakdown,speed-index,network-server-latency,total-blocking-time,max-potential-fid,server-response-time,interactive,bootup-time"`

      
      let response = JSON.parse( await runLighthouseCommand(command)); //  receives JSON


      let stats = await getContainerStats(); // this should return an object that contains `CpuUsage`
      // console.log(stats, "stats")

      responses.push({
        audits: {
          
          ...response.audits,
          "CpuUsage": stats.CpuUsage, // access `CpuUsage` directly from `stats`

          // "CpuUsage": {
          //   "id": "MemoryUsage",
          //   "title": "Memory Usage",
          //   "description": "Memory Usage of the container",
          //   "score": 1,
          //   "scoreDisplayMode": "binary",
          //   "numericValue": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          //   "toFixed": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          //   "numericUnit": "MB",
          // },
          "MemoryUsage": stats.MemoryUsage,
          // "MemoryUsage": {
          //   "id": "MemoryUsage",
          //   "title": "Memory Usage",
          //   "description": "Memory Usage of the container",
          //   "score": 1,
          //   "scoreDisplayMode": "binary",
          //   "numericValue": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          //   "toFixed": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          //   "numericUnit": "MB",
          // }

        },
        categories: { ...response.categories },
        lighthouseResult: { ...response.lighthouseResult },


        

        
      });

      // console.log("response", responses[0]);

      
      // console.log("response", responses[0].audits["CpuUsage"]);
      // console.log("response", responses[0].audits["MemoryUsage"]);


      
      
      // if it is the last cached iteration, clear browser cache
      if  (i === backendCacheIterations ) {
        console.log("browser cache cleared")
        await clearBackendCache();
      }

      if (i === performanceTestIterations ) {
        console.log("performance test stopped at ", i)
        process.kill();
      }

  

    } catch (error) {
      console.error(`Error executing Lighthouse: ${error}`);
      return res.status(500).json({ error: 'An error occurred while running Lighthouse.' });
    }
  }

  try {

    const json_list = [];

    for (const response of responses) {

      try {

        // const report = JSON.parse(response);
        // no need to parse response, it is already JSON

        json_list.push(response);
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








router.get('/get-report-stub-data', async function(req, res, next) {



  
  const directoryPath = path.join(__dirname.replace("routes", ".lighthouseci"));


  const siteTested = req.query.siteTested;

  console.log(siteTested, "site tested")

  try {
    const files = await promisify(fs.readdir)(directoryPath);

    //  only the ones starting with lhr
    const jsonFiles = files.filter(file => { 
      return file[0]=="l" && file[1]=="h" && file[2]=="r" &&  path.extname(file).toLowerCase() === '.json'});
    console.log(jsonFiles);

    const json_list = [];

    width = req.query.resolution.split("x")[0];
    height = req.query.resolution.split("x")[1];
  
    for (const fileName of jsonFiles) {
      const data = await readFileAsync(path.join(directoryPath, fileName), 'utf8');

      try {
        let deleteBrowserCache = false;


        // const command = `npx lighthouse \"https://scholar.google.com\" --chrome-flags="--no-sandbox --headless"`// --output=json --output-path=stdout --disable-dev-shm-usage --form-factor=${req.query.formFactor} --throttling.throughputKbps=${req.query.throughputKbps} --throttling.rttMs=0 --throttling.cpuSlowdownMultiplier=${req.query.cpuSlowdownMultiplier} --throttling.requestLatencyMs=0 --throttling.downloadThroughputKbps=0 --throttling.uploadThroughputKbps=0 --screenEmulation.width=${width} --screenEmulation.height=${height} --screenEmulation.deviceScaleFactor=1 --screenEmulation.mobile=false --disable-full-page-screenshot=true --only-audits="network-rtt,mainthread-work-breakdown,speed-index,network-server-latency,total-blocking-time,max-potential-fid,server-response-time,interactive,bootup-time"`
        // const command = 'npx lhci collect --config=lighthouserc.js --url=' + siteTested  ;

      
        // let report = JSON.parse( await runLighthouseCommand(command)); //  receives JSON
  

        const report = JSON.parse(data);
        // Modify the JSON report as needed
        // delete report.audits['screenshot-thumbnails'];
        // delete report.audits['final-screenshot'];
        // delete report.audits["network-requests"]['items'];
        // delete report.audits["prioritize-lcp-image"]['details']['debugData']['initiatorPath'];
        // delete report.fullPageScreenshot;

        delete report.categories
        delete report.categoryGroups
        delete report.configSettings
        delete report.environment
        delete report.fetchTime
        delete report.finalUrl
        delete report.i18n
        delete report.lighthouseVersion
        delete report.requestedUrl
        delete report.runWarnings
        delete report.timing
        delete report.userAgent
        delete report.fullPageScreenshot
        delete report.entities
        delete report.stackPacks

        report.audits.MemoryUsage = {
          "id": "MemoryUsage",
          "title": "Memory Usage",
          "description": "Memory Usage of the container",
          "score": 1,
          "scoreDisplayMode": "binary",
          "numericValue": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          "toFixed": 2434232/1024/1024, // changed from `memoryUsage` to `data.memory_stats.usage/1024/1024` as per your calculations
          "numericUnit": "MB",
        }

        report.audits.CpuUsage = {
          "id": "CpuUsage",
          "title": "Cpu Usage",
          "description": "Cpu Usage of the container",
          "score": 1,
          "scoreDisplayMode": "binary",
          "numericValue": 5, // changed from `cpuUsage` to `cpuPercent` as per your calculations
          "toFixed": 5, // changed from `cpuUsage` to `cpuPercent` as per your calculations
          "numericUnit": "%",
        }



        json_list.push(report);
      } catch (error) {
        console.error(error);
        return res.status(500).send('Error parsing JSON');
      }

      break;
    }

    res.json(json_list);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error parsing directory to JSON');
  }
  


});






// Server-side redirect:we set the caching headers can set the headers there when redirecting, because the headers cannot be set from the front end when redirecting.
router.get('/redirect', (req, res) => {
    // Replace 'no-cache' with your desired cache control value
    // res.set('Cache-Control', 'no-cache');

    res.set('Cache-Control', "max-age=60");

    res.set('TEST', "max-age=60");



    // Get the redirect URL from the query string parameters
    const redirectUrl = req.query.siteTested;

    console.log(redirectUrl);


    // Redirect the user
    // res.redirect(redirectUrl);
    // res.send("redirected");

    //
    res.send(`<script>window.location.href="${redirectUrl + "?" +new URLSearchParams({ ...req.query })}";</script>`);
    

});













//  module.exports = router;





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

// export default router;




