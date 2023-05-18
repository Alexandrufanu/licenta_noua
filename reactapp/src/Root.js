


import SiteCustomiser from "./components/SiteCustomiser"

import "./style/Root.css"


import { animateScroll, scroller } from 'react-scroll';


import { useNavigate } from 'react-router-dom';
import Statistics from "./pages/Statistics";

import { useState } from "react";


export default function Root(){


    const navigate = useNavigate();


    const handleStoreRedirect = () => {
        navigate('/home');
    };

    const handleStatisticsRedirect = () => {
        navigate('/statistics');
      };



    // const [siteChosen, setSiteChosen] = useState[0] {siteChosen === 0? "greyed-out": "cover" } 
    const [siteChosen, setSiteChosen] = useState(0)

    return(<>

        
        
        <div  className= "cover" >        


            <img  alt="logo" src={require("./images/MerticMaster-MainLogo.PNG")}/>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <img  alt="scroll" src={require("./images/scroll.png")} onClick={() => scroller.scrollTo('content', { smooth: true })} className="scroll"/>

        </div>

        <div className="main-container" id="content">
            
            <br/><br/><br/>

            <div
            className="selection-container"
            >

                <div>
                    Please choose between:
                </div>

                <div>

                    <div className="site-chooser" onClick={() => { setSiteChosen(1)}}>
                        <img  alt="logo" src={require("./images/store.png")} className="icon"/>

                        E-comerce Site

                    </div>
                    <div className="site-chooser" onClick={() => { setSiteChosen(1)}} >
                        Social Media Site

                    </div>
                </div>

            <SiteCustomiser  siteChosen={siteChosen}/>



            <a href={`/home`}>Go to the homee</a>

            <button className="btn" href={`/home`}  >
                <a href={`/home`}>
                    <img  alt="logo" src={require("./images/shopping-cart.png")} className="icon"/>

                    &nbsp;
                    <div style={{"textDecoration":"none", color: "black"}}>
                        Button
                    </div>
                </a>

            </button>

            
                <div>

                    <div>
                        Using this setup:
                    </div>

                    <div className="site-chooser" onClick={handleStoreRedirect} >

                        Launch the site 

                        <img  alt="logo" src={require("./images/right.png")} className="icon"/>


                    </div>
                    <div className="site-chooser" 
                        // onClick={handleStatisticsRedirect}
                        onClick={() => scroller.scrollTo('statistics', { smooth: true })}
                    >

                        Get statistics
                        <img  alt="logo" src={require("./images/trend.png")} className="icon" style={{borderRadius:"0px"}}/>

                    </div>
                </div>

            </div>

            <div className="filler">


                .

            </div>

        </div>

        <div className="statistics" id="statistics" />
        <Statistics />


    </>)
}


