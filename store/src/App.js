

import React, { useState, useEffect } from 'react';



import './App.css'; // import CSS file


import CacheStatusMonitor from './components/CacheStatusMonitor';


import Checkout from './components/Checkout';

import Loadable from 'react-loadable';

import Component from './Component';




// import './App.css'; // import CSS file


// document.addEventListener('DOMContentLoaded', function() {
//   if (true) {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = './App.css';
//     document.head.appendChild(link);
//   }
// });




function QuantityHandler() {
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    // setItems([...items, value]);
    // setValue("");

    setValue(value + 1);
  
  
  };

  const handleRemoveItem = (index) => {

    if (value > 0)
    setValue(value - 1);

  };

  return (
    // <div>
      <div className="input-container">

        <button className="remove-button" onClick={handleRemoveItem}>-</button>

        <input
          type="text"
          className="input-box"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="add-button" onClick={handleAddItem}>+</button>

      </div>
      
      
    // </div>
  );
}









export default function App() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './App.css';
    document.head.appendChild(link);
  }, []);



  const pageMapping={1:<Checkout/>};
  const [pageState, setPageState] = useState(0);

  // state to keep track of items in the cart
  const [cartItems, setCartItems] = useState([]);

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses']; // list of categories

  const [productsLoaded, setProductsLoaded] = useState(false)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const [selectedCategory, setSelectedCategory] = useState(null); // state for selected category


  const [logo, setLogo] = useState(null);

  const renderCategory = (category) => {
    return (

      <div key={category} onClick={() => handleCategoryClick(category)} className="state-selector">
        {category}
      </div>
    );
  };


  // array of clothing items to display
  const [clothingItems, setClothingItems ]= useState([])


  // function to handle adding items to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // render function for each clothing item
  const renderClothingItem = (item) => {

    
    return (
      <div key={item.id} className="clothing-item">
        {/* <img src={imageUrl} alt={item.name} /> */}
        <img src={`data:image/png;base64,${item.image}`} alt={item.name} />

        <div className="item-details">
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          {/* <button onClick={() => addToCart(item)}>Add to Cart</button> */}
          <QuantityHandler/>
          
        </div>
      </div>
    );
  };




  const items = [
    { name: "Item 1", price: 10, quantity: 2 },
    { name: "Item 2", price: 20, quantity: 1 },
    { name: "Item 3", price: 5, quantity: 4 },
  ];

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
  };





  async function getLogo( browserCache, deleteCache) {
  
    async function fetchData() {
      fetch('api/Clothes/Logo?'+ new URLSearchParams({
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


    const cacheKey = `clothingMainLogo___`; // Include itemNumber in the cache key
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



    fetch('api/Clothes?'+ new URLSearchParams({
      numberOfResults: itemNumber, // 500 works
      testNumber: 10//testNr,
    }))
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        setClothingItems(response);
        
        setProductsLoaded(true)
        // console.log(response[0].id);
        // console.log(response[0].body);
    });    
    
    // this.setState({ forecasts: data, loading: false });
  

  }, [] // empty array -> called only on mounting 
  )





  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const searchParams = new URLSearchParams(url.search);
  //   const testNr = searchParams.get('test');
  //   const testNr2 = searchParams.get('plm');
  //   let itemNumber = searchParams.get('itemsRendered');

  //   if (itemNumber == null) itemNumber = 10;

  //   const cacheEnabled = searchParams.get('cacheEnabled') === 'true'; // Get the cacheEnabled parameter

  //   const fetchData = () => {
  //     fetch('api/ClothesLogo?' + new URLSearchParams({
  //       numberOfResults: itemNumber,
  //       testNumber: 10,
  //     }))
  //     .then(response => response.json())
  //     .then(response => {
  //       set(response);
  //       setProductsLoaded(true);
  //     });
  //   };

  //   if (cacheEnabled) {
  //     const cacheKey = `clothingData_${itemNumber}`; // Include itemNumber in the cache key
  //     const cachedData = localStorage.getItem(cacheKey);

  //     if (cachedData) {
  //       const parsedData = JSON.parse(cachedData);
  //       setClothingItems(parsedData);
  //       setProductsLoaded(true);
  //     } else {
  //       fetchData();
  //     }
  //   } else {
  //     fetchData();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (productsLoaded) {
  //     const cacheKey = `clothingData_${clothingItems.length}`; // Include the updated itemNumber in the cache key
  //     localStorage.setItem(cacheKey, JSON.stringify(clothingItems));
  //   }
  // }, [clothingItems, productsLoaded]);









  return (
    <>
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
              < div onClick={()=>{setPageState(1)}} className="state-selector" >Cart ({cartItems.length})</div>
            </li>
          </ul>
        </nav>
      </header>
      <main>


      <>
    <h1>Clothes Store</h1>
    <div>

      {pageMapping.pageState}

      
      {pageState === 0 ? (
        <>
          <h2>Page State 0</h2>
          <div>
            {/* Add your content here */}
          </div>
        </>
      ) : pageState === 1 ? (
        <>
          <h2>Page State 1</h2>
          <Checkout cartItems={items} onCheckout={handleCheckout} />
        </>
      ) : (
        <>
          
        </>
      )}
    </div>
  </>
        <h1>Clothes Store</h1>

        <CacheStatusMonitor />


        <div>


            remove maps, add variable number of elements to be shown 
            finish the e-comerce site, then test the profiling tools 

                      

          then Check the profiling tools !!

          Add A next page for getting the remaining items 
            
        </div>

        <div className="categories">
          {categories.map(renderCategory)}
        </div>

        {

          productsLoaded?
          <div className="clothing-list">{clothingItems.map(renderClothingItem)}</div>:
          <div className='center-div'><div className="loading-spinner"></div></div>


        }



        {/* <Checkout cartItems={items} onCheckout={handleCheckout} /> */}



        
      </main>
    </>
  );
}

