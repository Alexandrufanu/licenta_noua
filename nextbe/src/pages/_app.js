import '@/styles/globals.css'


import '../App.css';

import './style/LearningComponent.css';

import LearningComponent from './components/LearningComponent';

import { useState, useEffect } from 'react';










function App() {

  const [logo, setLogo] = useState(null);


  
  async function getLogo( browserCache, deleteCache) {
  
    async function fetchData() {
      fetch('api/Item/logo?'+ new URLSearchParams({
        numberOfResults: 0, // 500 works
        testNumber: 10//testNr,
      }))
      .then(response => response.json())
      .then(response => {
          // console.log(response);
          setLogo(response);
          
          // setProductsLoaded(true)
          // console.log(response[0].id);
          // console.log(response[0].body);
      });
    }


    const cacheKey = `clothingMainLogo`; // Include itemNumber in the cache key
    const cachedData = localStorage.getItem(cacheKey);

    console.log("browserCache: " + browserCache, "deleteCache: " + deleteCache)

    let unCacheable = "true";

    if (browserCache === "true")
    {  
      if (cachedData !== "null" && cachedData !== null) {
        const parsedData = JSON.parse(cachedData);
        setLogo(parsedData)

        console.log("parsedData: " + parsedData)
        console.log("parsedData: " + cachedData, cachedData !== null, cachedData !== "null", )
                       
        if (deleteCache === "true")
          localStorage.removeItem(cacheKey);


        console.log("cached data")

      } 
      else 
      {unCacheable = "false"; browserCache = "false";}
    }

    if (browserCache === "false")
    {
      console.log("uncached data")

      fetchData().then(() => {
        if (unCacheable === "false")
          localStorage.setItem(cacheKey, JSON.stringify(logo));

        if (deleteCache === "true")
          localStorage.removeItem(cacheKey);

      });
    }
    console.log("GOT HERE")


  }






  useEffect(()=>{

    const url = new URL(window.location.href);

    // Get the search parameters
    const searchParams = new URLSearchParams(url.search);

    // Get the values of param1 and param2
    const testNr = searchParams.get('test');

    const testNr2 = searchParams.get('plm');

    let itemNumber = searchParams.get('itemsRendered');

    if (itemNumber == null)
      itemNumber = 10;

    console.log(testNr)
    console.log(testNr2)


    getLogo( searchParams.get('browserCache'), searchParams.get('deleteCache') )




  }, [] // empty array -> called only on mounting 
  )







  return (<>
  <header className='nav-cont'>
    <nav className='nav-style'>
      <ul >
        <li>
        {
          logo != null?<img  alt="logo" src={`data:image/png;base64,${logo}`} className="logo"/>:
          
          <div className='center-div'><div className="loading-spinner"></div></div>
        }
        </li>
        <li>
          <a href="/" className='state-selector'>Home</a>
        </li>
        {/* <li>
          <a href="/">Home</a>
        </li> */}
        <li>
          < div onClick={() => {}} className="state-selector" >Cart </div>
        </li>
      </ul>
    </nav>
  </header>
  

  <LearningComponent />
  

  </>

);
}

export default App;

