module.exports = {
  "extends": "lighthouse:default",
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3006",
        "http://localhost:3000"
      ],
      "numberOfRuns": 3,
      "disableStorageReset": true,
      "screenshot-thumbnails": "off",
      "settings": {
        screenEmulation: {
          mobile: false, // Set the mobile screen emulation to false
        },
        "emulatedFormFactor": "desktop",
        "formFactor": "desktop",
        "disableDeviceEmulation": true,
        "disableCpuThrottling": true,
        "disableNetworkThrottling": true,
        "throttlingMethod": "provided",
        "throttling": {
          "cpuSlowdownMultiplier": 1,
          "rttMs": 0,
          "throughputKbps": 1024000
        },
        "onlyAudits": [
          "network-rtt",
          "mainthread-work-breakdown",
          "speed-index",
          "network-server-latency",
          "total-blocking-time",
          "max-potential-fid",
          "server-response-time",
          "interactive",
          "bootup-time"
        ],

        headless: false, // Set headless to false

        // "onlyCategories": [
        //   "performance"
        // ]
      }
    },
    "assert": {
      "assertions": {
        "screenshot-thumbnails": "off"
      }
    },
    "upload": {
      "target": "lhci",
      "serverBaseUrl": "http://localhost:9001"
    },
    "settings": {
      "emulatedFormFactor": "desktop"
    },
    "server": {
      "storage": {
        "method": "sql",
        "sqlDialect": "sqlite",
        "sqlDatabasePath": "./lighthouse.sqlite"
      }
    }
  }
};
