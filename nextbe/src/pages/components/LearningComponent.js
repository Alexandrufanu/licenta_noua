import React, {useEffect, useState} from 'react';



const LearningComponent = () => {

  const [clothingItems, setClothingItems ]= useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)


  const steps = [
    {
      title: 'Introduction to JavaScript',
      image: '/path/to/image1.jpg',
      description: 'JavaScript is a programming language that allows you to implement complex features on web pages. Every time a web page does more than just sit there and display static information for you to look at—displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, or more—you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, two of which (HTML and CSS) we have covered in much more detail in other parts of the Learning Area.'
    },
    {
      title: 'Variables in JavaScript',
      image: '/path/to/image2.jpg',
      description: 'Variables are containers for storing data values. In JavaScript, we use the var keyword to declare variables. To create a variable, you must use var followed by the name of the variable.'
    },

    {
        title: 'Variables in JavaScript',
        image: '/path/to/image2.jpg',
        description: 'Variables are containers for storing data values. In JavaScript, we use the var keyword to declare variables. To create a variable, you must use var followed by the name of the variable.'
    },
      
    // Add more steps as required
  ];

  const [step, setStep] = React.useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
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


    fetch('api/Item?'+ new URLSearchParams({
      numberOfResults: 10, // 500 works
      testNumber: 10//testNr,
    }))
    .then(response => response.json())
    .then(response => {
        console.log(response);
        setClothingItems(response);
        
        setProductsLoaded(true)
        // console.log(response[0].id);
        // console.log(response[0].body);
    });
    
    // this.setState({ forecasts: data, loading: false });
  

  }, [] // empty array -> called only on mounting 
  )

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
            
          </div>
        </div>
      );
    };


    const renderItems = (item) => {
      return(
      <div className='information-containter'>
      <h2>{item.title}</h2>
      <img src={`data:image/png;base64,${item.image}`} alt={item.title} className="content-image" />
      <p>{item.description}</p>
      </ div>
      )
    }


  return (
    <div className="content">

    <h1>Learning React</h1>



    {

    productsLoaded?
    <div className="clothing-list">{clothingItems.map(renderItems)}</div>:
    <div className='center-div'><div className="loading-spinner"></div></div>

  }


    {clothingItems.map((step, ) => (
        <div className='information-containter'>
        <h2>{step.name}</h2>
        <img src={`data:image/png;base64,${step.image}`}  alt={step.title} className="content-image" />
        <p>{step.description}</p>
        <p>{step.content}</p>

        </ div>

))}

      
      <div className="content-navigation">
        <button className="nav-button" onClick={prevStep}>Previous</button>
        <button className="nav-button" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default LearningComponent;
