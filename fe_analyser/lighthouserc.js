
module.exports = {
  ci: {
    collect: {
      // startServerCommand: 'npm run start',
      url: ['http://localhost:3006','http://localhost:3000'], // The URL to test, you can specify multiple URLs
      numberOfRuns: 1,

    
  },
    upload: {
      target: 'lhci', // Upload the data to the Lighthouse CI server
      serverBaseUrl: 'http://localhost:9001', // URL of the Lighthouse CI server
    },
  
    settings: {
      disableStorageReset: true,
    },


  server: {
    storage: {
        method: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lighthouse.sqlite', // Provide a valid path for the SQLite database
    },
  },  

  
  },
};

//   Use build token ede7c3f4-9841-47b2-a7b8-b46a531130e0 to add data.
//   Use admin token 7FOlOUhNW6yLfm2yqsmrQ9XaKUaksJm0wOyIOh5S to manage data. KEEP THIS SECRET!


// lhci autorun --url=http://localhost:3006 --settings.maxWaitForLoad=60000  <- 60 seconds time 
// in ci:{    settings: {
    //   maxWaitForLoad: 60000, // 60 seconds
    // },}




