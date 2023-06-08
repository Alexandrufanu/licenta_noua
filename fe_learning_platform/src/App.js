


import './App.css';


import LearningComponent from './components/LearningComponent';

function App() {
  return (<>
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
