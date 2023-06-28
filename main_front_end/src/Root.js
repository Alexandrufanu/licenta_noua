


import SiteCustomiser from "./components/SiteCustomiser"
import DeviceCustomiser from "./components/DeviceCustomiser"

import PerformanceCustomiser from "./components/PerformanceCustomiser";

import "./style/Root.css"
import { animateScroll, scroller } from 'react-scroll';


import { useNavigate } from 'react-router-dom';
import Statistics from "./pages/Statistics";

import { useEffect, useState } from "react";
import HeadersCustomiser from "./components/HeadersCostumiser";


export default function Root(){

    const eComerceIP = "http://localhost:3006/";
    const learningPlatformIP = "http://localhost:3007/";

    const [trigger, setTrigger] = useState(0);

    const navigate = useNavigate();


    const handleLauncherRedirect = () => {
        // navigate('/home');

        let cacheControlHeader = "max-age=0"

        if (siteUrl.browserCache === false)
            cacheControlHeader = "no-cache"
        else
            cacheControlHeader = "max-age=60"

        
        console.log("cachee",cacheControlHeader)

        
        window.open(siteChosen + "?" +new URLSearchParams({ ...siteUrl, "cache-control": cacheControlHeader }), "_blank");

        // window.open("/api/redirect?" +new URLSearchParams({ ...siteUrl, "cache-control": cacheControlHeader }), "_blank");

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

    const [siteUrl, setSiteUrl] = useState({}) //"initial value"
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

    function scrollAfterSiteChosen(){
        // scroll to the top of the site setup section
        scroller.scrollTo('siteCustomiser', { smooth: true })
    }


    return(<>

        
        
        <div  className= "cover" >        
        

            <img  alt="logo" src={require("./images/MerticMaster-MainLogo.PNG")} />

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

            <div  className="filler">
                    

                    <div  style={{display:"inline-flex", alignItems: "center", marginTop:"100%" }}>


                            <div className={siteChosen === eComerceIP ? " site-chooser selected":"button-shadow site-chooser"} style={ {marginRight:"5px"} }
                             onClick={() => { setSiteChosen(eComerceIP); setSiteUrl((prop)=>({...prop, siteTested: eComerceIP})); scrollAfterSiteChosen()}} >
                                
                                <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>

                                    <img  alt="logo" src={require("./images/store.png")} className="icon" />

                                    E-comerce Site

                                </div>
                            </div>

                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, but please follow the guidlines from <a href="\help" target="_blank">here</a> 
                            </div>
                        </div>


                    </div> 
                    <br/>

                    <div  style={{display:"inline-flex", alignItems: "center" }}>
                    
                        <div className={siteChosen === learningPlatformIP ? "site-chooser selected":"site-chooser"}  style={ {marginRight:"5px"} }
                        onClick={() => { setSiteChosen(learningPlatformIP);  setSiteUrl((prop)=>({...prop, siteTested: eComerceIP})); scrollAfterSiteChosen()}} >

                            <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>
    
                                <img  alt="logo" src={require("./images/online-learning.png")} className="icon" />
                                Learning Platform
                            </div>                        
                        </div>
                    
                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, please follow the guidlines from <a href="\help" target="_blank">here</a> 
                            </div>
                        </div>
                    </div>

                    <br/>


                    {/* <div  style={{display:"flex", alignItems: "center", alignContent:"center" , justifyContent:"center", marginRight:"6px", marginTop:"10px"}}>
                        <div style={{marginRight:"6px"}}>
                        OR 
                        </div>
                    </div> */}


                    <div  style={{display:"inline-flex", alignItems: "center" }}>
                        {/* <input  className={ siteChosen !== eComerceIP && siteChosen !== learningPlatformIP 
                        && siteChosen !== null ? "site-chooser selected":"site-chooser" } 
                        style={ {marginRight:"5px"} } placeholder="     Your custom site" 
                        onChange={ 
                            (event)=>{ 
                                console.log(event)
                                if(checkValidLink(event.target.value)){ setSiteChosen(event.target.value)} 
                                else{ if(siteChosen !== null) setSiteChosen(null) };
                                
                                if(event.target.value === "\n")
                                    scrollAfterSiteChosen() 
                            } 
                            
                            }/> */}
                       <input  
                        className={ siteChosen !== eComerceIP && siteChosen !== learningPlatformIP && siteChosen !== null ? "site-chooser selected":"site-chooser" } 
                        style={ {marginRight:"5px", borderWidth:0} } 
                        placeholder="     Your custom site" 
                        onChange={ 
                            (event)=>{ 
                                console.log(event)
                                if(checkValidLink(event.target.value)){ setSiteChosen(event.target.value)} 
                                else{ if(siteChosen !== null) setSiteChosen(null) };
                            } 
                        }

                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                setTimeout(() => {
                                    scrollAfterSiteChosen();
                                }, 0);
                            }
                        }}

                        />

                        
                        <div className="image-container"   >
                            <img src={require("./images/question-mark.png")} alt="logo" className="icon" 
                                style={{backgroundColor:"white", borderRadius:"20px",marginTop: "4px"}} />
                            <div className="tooltip">
                                A custum web adress can also be used, but please follow the guidlines from <a href="\help" target="_blank">here</a> 
                            </div>
                        </div>

                    </div>
                    

                </div>







            <div id="siteCustomiser"/>
            <SiteCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl} />
            
            {/* Similar for chossing the device and the thorttling:  */}

            <DeviceCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl}/>


            <PerformanceCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl}/>

            <HeadersCustomiser  siteChosen={siteChosen} setSiteUrl={setSiteUrl} />


        

            
            <div>
                        {/* Using this setup: _______________________________________   siteUrl  {JSON.stringify(siteUrl)}  */}
                        {/* siteUrl */}
                        <br/>
                        {siteChosen}  
                    </div>
                <div>



                    <div className="site-chooser" onClick={handleLauncherRedirect} >
                        
                        <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>

                            Launch the site 

                            <img  alt="logo" src={require("./images/right.png")} className="icon"/>
                        </div>

                    </div>

                    <div className="site-chooser" onClick={handleLauncherRedirect} >
                        
                        <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>

                            Launch the site  STUB 

                            <img  alt="logo" src={require("./images/right.png")} className="icon"/>
                        </div>

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
                        
                        <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>

                        Get statistics -STUB please remove (increased index)
                        <img  alt="logo" src={require("./images/trend.png")} className="icon" style={{borderRadius:"0px"}}/>

                        </div>
                        


                    </div>

                    

                    <div className="site-chooser" 
                    // onClick={handleStatisticsRedirect}
                    onClick=
                    {
                        () => {
                            scroller.scrollTo('statistics', { smooth: true }); 
                            
                            setTrigger(trigger - 1);
                        }
                       

                    
                    }
                    >
                        
                        <div  style={{display:"flex", alignItems: "center", justifyContent:"center"   }}>

                        Get statistics 
                        <img  alt="logo" src={require("./images/trend.png")} className="icon" style={{borderRadius:"0px"}}/>

                        </div>
                        


                    </div>



                </div>

            </div>

            site url: {JSON.stringify(siteUrl)}

            <div className="filler">


                .

            </div>

        </div>

        <div className="statistics" id="statistics" />
        <Statistics trigger={trigger} parameters={siteUrl} />




    </>)
}


