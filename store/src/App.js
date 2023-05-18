

import React, { useState, useEffect } from 'react';
import './App.css'; // import CSS file


import Checkout from './components/Checkout';


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


  const renderCategory = (category) => {
    return (

      <div key={category} onClick={() => handleCategoryClick(category)} className="state-selector">
        {category}
      </div>
    );
  };


  // array of clothing items to display
  const [clothingItems, setClothingItems ]= useState([])

  // const clothingItems = [
  //   { id: 1, name: 'T-Shirt', price: 20, imageUrl: '../images/tshirt.png' },
  //   { id: 2, name: 'Jeans', price: 50, imageUrl: './images/tshirt.jpg' },
  //   { id: 3, name: 'Dress', price: 80, imageUrl: './images/tshirt.jpg' },
  //   { id: 4, name: 'Sweater', price: 30, imageUrl: './images/tshirt.jpg' },

  //   { id: 3, name: 'Dress', price: 80, imageUrl: './images/tshirt.jpg' },
  //   { id: 4, name: 'Sweater', price: 30, imageUrl: './images/tshirt.jpg' },

    
  //   { id: 3, name: 'Dress', price: 80, imageUrl: './images/tshirt.jpg' },
  //   { id: 4, name: 'Sweater', price: 30, imageUrl: './images/tshirt.jpg' },
  // ];

  // function to handle adding items to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // render function for each clothing item
  const renderClothingItem = (item) => {
    // console.log(item)
    // const blob = new Blob([item.image], { type: 'image/png' });
    // const imageUrl = URL.createObjectURL(blob);
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


  useEffect(()=>{


    // fetch('/Clothes', )
    // .then( response => response.json())
    // .then( response => { console.log(response);  console.log(response.id);console.log(response.body)} )

    
    const url = new URL(window.location.href);

    // Get the search parameters
    const searchParams = new URLSearchParams(url.search);

    // Get the values of param1 and param2
    const testNr = searchParams.get('test');

    console.log(testNr)


    fetch('api/Clothes?'+ new URLSearchParams({
      numberOfResults: 10, // 500 works
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


  return (
    <>
      <header className='nav-cont'>
        <nav className='nav-style'>
          <ul >
            <li>
            <img  alt="logo" src={require("./images/MerticMaster-MainLogo.PNG")} className="logo"/>

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

