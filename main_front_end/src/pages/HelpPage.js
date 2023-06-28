




import '../style/ClothesStore.css'; // import CSS file
import '../style/HelpPage.css'; // import CSS file



import { useEffect, useState, PureComponent } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { scroller } from 'react-scroll';



import React from 'react';

const ToolTip = ({ children }) => { 
    console.log(children);
    return(
  <div >
    {children}
  </div>
)};




const ParameterPage = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  const [dropdown3, setDropdown3] = useState(false);


  return(<div>
      <h1>Endpoint Query Parameters</h1>
      <table>
        <thead>
          <tr>
            <th>Parameter (Type)</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>itemsRendered (int)</code></td>
            <td><ToolTip>This parameter specifies the number of items to render in the performance test. For example, if you set this to 10, the test will render 10 items.</ToolTip></td>
          </tr>
          <tr>
            <td><code>runs (int)</code></td>
            <td><ToolTip>This parameter specifies the number of times to run the performance test. A higher number of runs will give a more accurate average performance score.</ToolTip></td>
          </tr>
          <tr>
            <td><code>backendCache (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable backend caching. This can improve performance by storing some data so it can be retrieved faster.</ToolTip></td>
          </tr>
          <tr>
            <td><code>backendCacheTime (int)</code></td>
            <td><ToolTip>This parameter sets the amount of time, in seconds, data should be stored in the backend cache.</ToolTip></td>
          </tr>
          <tr>
            <td><code>browserCache (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable browser caching. This can improve performance by storing some data in the user's browser so it can be retrieved faster.</ToolTip></td>
          </tr>
          <tr>
            <td><code>browserCacheTime (int)</code></td>
            <td><ToolTip>This parameter sets the amount of time, in seconds, data should be stored in the browser cache.</ToolTip></td>
          </tr>
          <tr>
            <td><code>imageType (string)</code></td>
            <td><ToolTip>This parameter specifies the format in which images are loaded during the performance test. 'blob' means the image will be loaded as a binary large object, which can improve loading times.</ToolTip></td>
          </tr>
          <tr>
            <td><code>ssr (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable server-side rendering (SSR). With SSR, your server will generate the full HTML for a page in response to a request, which can improve performance, especially for users with slower internet connections.</ToolTip></td>
          </tr>
          <tr>
            <td><code>minifyHTML (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable HTML minification. Minification is the process of removing unnecessary characters (like whitespace) from the code, which can improve loading times.</ToolTip></td>
          </tr>
          <tr>
            <td><code>minifyCSS (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable CSS minification. Minification is the process of removing unnecessary characters (like whitespace) from the code, which can improve loading times.</ToolTip></td>
          </tr>
          <tr>
            <td><code>minifyJS (boolean)</code></td>
            <td><ToolTip>If set to true, this will enable JavaScript minification. Minification is the process of removing unnecessary characters (like whitespace) from the code, which can improve loading times.</ToolTip></td>
          </tr>
        </tbody>
      </table>

      <h1> Responses </h1>

      <div className="dropdown green">
      <button onClick={() => setDropdown1(!dropdown1)} className="dropdown-btn green">
        200 no error
      </button>

      {dropdown1 && (
        <div id="myDropdown" className="dropdown-content">
          <h2>RESPONSE SCHEMA: application/json</h2>
          <p>
            <strong>Id</strong> (string ) The message
          </p>

        </div>
      )}
      </div>
      
      <br></br><br></br>

      <div className="dropdown red">
      <button onClick={() => setDropdown2(!dropdown2)} className="dropdown-btn red">
       404 not found
      </button>

      {dropdown2 && (
        <div id="myDropdown" className="dropdown-content">
          <h2>RESPONSE SCHEMA: application/json</h2>
          <p>
            <strong>Id</strong> (string ) The message
          </p>

        </div>
      )}

     </div>
    
     <br></br><br></br>


     <div className="dropdown red">
      <button onClick={() => setDropdown3(!dropdown3)} className="dropdown-btn red">
       500 internal server error
       
      </button>

      {dropdown3 && (
        <div id="myDropdown" className="dropdown-content">
          <h2>RESPONSE SCHEMA: application/json</h2>
          <p>
            <strong>Id</strong> (string ) The message
          </p>

        </div>
      )}

     </div>


    </div>
  )};






export default  function HelpPage( {trigger, parameters}) {
    
    return(<>
    
    <body>

      <div className="sidebar">

            <img  alt="logo" src={require("../images/MerticMaster-MainLogo.PNG")} className="logo"/>


              <div className="site-chooser"

              style={{padding: "10px", width: "80%", marginLeft: "5px"}}
              >
              <a href="/"> Main Page </a>
              </div>
            
              <div className="site-chooser" onClick={() => scroller.scrollTo('content', { smooth: true })}
              style={{padding: "10px", width: "80%", marginLeft: "5px"}}
              >
                 To the configuration </div>
           
      </div>



      




      <div className="main-content">

        Talk about the Docker api and how to use it
        To provide the id of the container
        
        QUERY PARAMETERS

        <h1> Project setup </h1>

        <br/><br/><br/>

        
        <ParameterPage />



        


        </div>        


    </body>

    
    </>)


}


































