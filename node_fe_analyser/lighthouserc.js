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
        "emulatedFormFactor": "desktop",
        "disableDeviceEmulation": true,
        "disableCpuThrottling": true,
        "disableNetworkThrottling": true,
        "throttlingMethod": "provided",
        "throttling": {
          "cpuSlowdownMultiplier": 1,
          "rttMs": 0,
          "throughputKbps": 1024000
        },
        "onlyCategories": [
          "performance"
        ]
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
