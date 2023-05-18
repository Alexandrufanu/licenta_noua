const { exec } = require('child_process');

function runLighthouseCI( url, parameters ) {
  return new Promise((resolve, reject) => {

    const command = 'npx lhci collect --config=lighthouserc.js --url=' + url + "?" + new URLSearchParams(parameters) ;

    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ stdout, stderr });
    });

    childProcess.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Lighthouse CI process exited with code ${code}`));
      }
    });
  });
}



const fs = require('fs');

/**
 * The function reads a configuration file, updates it using a provided function, and writes the
 * updated configuration back to the file.
 * @param configPath - a string representing the file path of the configuration file to be updated.
 * @param updateFn - `updateFn` is a function that takes in the existing configuration object as its
 * argument and modifies it in some way. The purpose of this function is to allow for dynamic updates
 * to the configuration file without having to manually edit it.
 */
function updateLighthouseConfig(configPath, updateFn) {
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Parse the existing configuration file
    const config = eval(data);

    // Call the update function to modify the config object
    updateFn(config);

    // Serialize the updated configuration back to a string
    const updatedConfig = `module.exports = ${JSON.stringify(config, null, 2)};\n`;

    // Write the updated configuration back to the file
    fs.writeFile(configPath, updatedConfig, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Successfully updated the configuration in ${configPath}`);
    });
  });
}




/**
 * The function modifies properties of a Lighthouse configuration object.
 * @param config - an object representing the configuration settings for Lighthouse
 */
function modifyLighthouseConfig(config) {
  // Add a new property
  // config.settings.locale = 'en-US';

  // Modify an existing property
  config.ci.collect.numberOfRuns = 3;

  // Delete a property
  // delete config.upload.target;
}

module.exports = {
  updateLighthouseConfig,
  modifyLighthouseConfig,
  runLighthouseCI
};









