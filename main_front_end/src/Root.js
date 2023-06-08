


import SiteCustomiser from "./components/SiteCustomiser"
import DeviceCustomiser from "./components/DeviceCustomiser"

import PerformanceCustomiser from "./components/PerformanceCustomiser";

import "./style/Root.css"
import { animateScroll, scroller } from 'react-scroll';


import { useNavigate } from 'react-router-dom';
import Statistics from "./pages/Statistics";

import { useEffect, useState } from "react";


export default function Root(){

    const [trigger, setTrigger] = useState(0);

    const navigate = useNavigate();


    const handleStoreRedirect = () => {
        // navigate('/home');
        window.open("/home", "_blank");

    };

    const handleStatisticsRedirect = () => {
        navigate('/statistics');
      };

    

    // bringing the user to the top of the site setup section in 2.5 seconds if they did not scroll down
    useEffect(() => {

        setTimeout(() => {  
            
        if (window.scrollY < 100)
            scroller.scrollTo('content', { smooth: true })
        
        }, 2500)                                            

    },[])

    // let siteUrl = "initial value"

    const [siteUrl, setSiteUrl] = useState("initial value")
    // function setSiteUrl(siteUrlVal){
    //     siteUrl = siteUrlVal
    // }

    // const [siteChosen, setSiteChosen] = useState[0] {siteChosen === 0? "greyed-out": "cover" } 
    const [siteChosen, setSiteChosen] = useState( null )


    function checkValidLink(link){
        // check if the link is valid
    
        const websiteRegex = /^https?:\/\/([^\s]+\.[^\s]+|localhost:\d+)$/;
        const valid = websiteRegex.test(link);

        return valid
    }


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

                <br/>
                    <div> Our predefined sites:     </div>
                <div>
                    

                    <div  style={{display:"inline-flex", alignItems: "center" }}>

                        <div className="site-chooser" onClick={() => { setSiteChosen("ecomerce")}} style={ {marginRight:"5px"} }>
                            <img  alt="logo" src={require("./images/store.png")} className="icon" />

                            E-comerce Site

                        </div>

                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, but please follow the guidlines from <a href="www.help.com" target="_blank">here</a> 
                            </div>
                        </div>


                    </div>
                    <br/>

                    <div  style={{display:"inline-flex", alignItems: "center" }}>
                    
                        <div className="site-chooser" onClick={() => { setSiteChosen("social")}} style={ {marginRight:"5px"} } >
                            <img  alt="logo" src={require("./images/store.png")} className="icon" />
                            Learning Platform
                        </div>
                    
                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, please follow the guidlines from <a href="www.help.com" target="_blank">here</a> 
                            </div>
                        </div>
                    </div>

                    <br/>


                    <div  style={{display:"flex", alignItems: "center", alignContent:"center" , justifyContent:"center", marginRight:"6px", marginTop:"10px"}}>
                        <div style={{marginRight:"6px"}}>
                        OR 
                        </div>
                    </div>


                    <div  style={{display:"inline-flex", alignItems: "center" }}>
                        <input  className="site-chooser" style={ {marginRight:"5px"} } placeholder="     Your custom site" 
                        onChange={ 
                            (event)=>{ 
                                if(checkValidLink(event.target.value)){ setSiteChosen(event.target.value)} 
                                else{ if(siteChosen !== null) setSiteChosen(null) }
                            } 
                            
                            }/>
                       
                        
                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, but please follow the guidlines from <a href="www.help.com" target="_blank">here</a> 
                            </div>
                        </div>

                    </div>
                    

                </div>



            <SiteCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl}/>
            
            STH similar for chossing the device and the thorttling 

            <DeviceCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl}/>


            <PerformanceCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl}/>




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
                        Using this setup:         {siteUrl}
                    </div>

                    <div className="site-chooser" onClick={handleStoreRedirect} >

                        Launch the site 

                        <img  alt="logo" src={require("./images/right.png")} className="icon"/>


                    </div>
                    <div className="site-chooser" 
                    // onClick={handleStatisticsRedirect}
                    onClick=
                    {
                        () => {
                            scroller.scrollTo('statistics', { smooth: true }); 
                            
                            // Statistics.get_report("get-report");
                            setTrigger(trigger + 1);
                        }
                        /*Make request here 
                          |
                          |
                        make request here 
                        baseURL + "?"
                        + new URLSearchParams -> the the flags state 
                        ({
                        numberOfResults: 10, // 500 works
                        testNumber: 10//testNr,
                        }))
                        
                        */

                    
                    }
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
        <Statistics trigger={trigger} />


    </>)
}


