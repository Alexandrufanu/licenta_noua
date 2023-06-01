


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useState } from "react"

export default function SiteCustomiser(componentProps){


    let urlFormed = ""

    let sitesObject = {

        "ecomerce": {
            "urlReact": "http://localhost:3006/",
            "urlSSR": "http://pathtonext",

        },
        "social": {
            "urlReact": "http://localhost:3006/social",
            "urlSSR": "http://pathtonext/social",
        }
    }


    if (componentProps.siteChosen !== null){

    }

    const [props, setProps] = useState(
        // {backCache:false, browserCache:false, imageType:"blob"}
        {
            "backendCache": false,
            "browserCache": false,
            "imageType": "blob",
            "ssr": false,
            "compressImages": false,
            "throttling": false,
            "runs": "1",
            "minifyHTML": false,
            "minifyCSS": false,
            "minifyJS": false,
        } 
    );

    const handleBackCacheChange = () => {
        setProps({...props, backCache:!props.backCache});
        componentProps.setSiteUrl("TEST")
    };
    const handleBrowserCacheChange = () => {
        setProps({...props, browserCache:!props.browserCache});
    };


    const handleImageTypeChange = (event) => {
        setProps({...props, imageType: event.target.value});
      };

    const handleRunChange = (event) => {
    setProps({...props, runs: event.target.value});
    };

    const handleSSRChange = () => { 
        setProps({...props, ssr:!props.ssr});
    };

    console.log(componentProps)

    let baseUrl
    return(<>
    <div className={componentProps.siteChosen === null ? "selector-container greyed-out" :"selector-container"}>

    <div className="sep">
            Number of items rendered on the page:


            <label>
                <input
                type="radio"
                name="optionRun"
                value="1"
                checked={props.runs === "1"}
                onChange={handleRunChange}
                />
                10
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="3"
                checked={props.runs === "3"}
                onChange={handleRunChange}
                />
                25
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="5"
                checked={props.runs === "5"}
                onChange={handleRunChange}
                />
                50
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="10"
                checked={props.runs === "10"}
                onChange={handleRunChange}
                />
                100
            </label>

        </div>





        <div className="sep">
            Site site runs (for the statistics page only):


            <label>
                <input
                type="radio"
                name="optionRun"
                value="1"
                checked={props.runs === "1"}
                onChange={handleRunChange}
                />
                1
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="3"
                checked={props.runs === "3"}
                onChange={handleRunChange}
                />
                3
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="5"
                checked={props.runs === "5"}
                onChange={handleRunChange}
                />
                5
            </label>
            <label>
                <input
                type="radio"
                name="optionRun"
                value="10"
                checked={props.runs === "10"}
                onChange={handleRunChange}
                />
                10
            </label>

        </div>

        <div className="sep">       

            <div> 
                Enable Backend Cache: <input
                type="checkbox"
                checked={props.backCache}
                onChange={handleBackCacheChange}
                />
            </div>


            <div className={!props.backCache ? 'greyed-out' : 'subelement'}>
            <div 
                style={{marginLeft:"15%"}}
                >
                Cache time (seconds):
                </div>

                <label>
                <input
                type="radio"
                name="optionRun"
                value="1"
                checked={props.runs === "1"}
                onChange={handleRunChange}
                />
                10
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="3"
                    checked={props.runs === "3"}
                    onChange={handleRunChange}
                    />
                    25
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="5"
                    checked={props.runs === "5"}
                    onChange={handleRunChange}
                    />
                    50
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="10"
                    checked={props.runs === "10"}
                    onChange={handleRunChange}
                    />
                    100
                </label>

                Cache is a temporary storage 
            </div>

        </div>

        

        <div className="sep">        

            <div >        
                Enable Browser Cache: <input
                type="checkbox"
                checked={props.browserCache}
                onChange={handleBrowserCacheChange}
                />
            </div>

            <div className={!props.browserCache ? 'greyed-out subelement' : 'subelement'}>
                <div 
                style={{marginLeft:"15%"}}
                >
                Cache time (seconds):
                </div>

                <label>
                <input
                type="radio"
                name="optionRun"
                value="1"
                checked={props.runs === "1"}
                onChange={handleRunChange}
                />
                10
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="3"
                    checked={props.runs === "3"}
                    onChange={handleRunChange}
                    />
                    25
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="5"
                    checked={props.runs === "5"}
                    onChange={handleRunChange}
                    />
                    50
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="10"
                    checked={props.runs === "10"}
                    onChange={handleRunChange}
                    />
                    100
                </label>

            </div>
        </div>

        
        <div  className="sep">
        Use Blob images from DB 
        </div>

        <div className="sep">
            Use File images:

            <label>
                <input
                type="radio"
                name="optionGroup"
                value="blob"
                checked={props.imageType === "blob"}
                onChange={handleImageTypeChange}
                />
                Blob
            </label>
            <label>
                <input
                type="radio"
                name="optionGroup"
                value="file"
                checked={props.imageType === "file"}
                onChange={handleImageTypeChange}
                />
                File
            </label>

            <div>Blobs are binary data objects, stored directtly in the database </div>
            <div>Files are stored in the file system, and the database stores a reference to them</div>

        </div>


        <div className="sep">
            
            <div >        
                Enable Server Side Rendering (SSR)  <input
                type="checkbox"
                checked={props.ssr}
                onChange={handleSSRChange}
                />
            </div>

            <div>
            Generate fully rendered HTML on the server
            </div>
        </div>
        
        
        <div className="sep"
        style={{    
            // alignItems: "flex-start",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
        }}
        >
            Minify:
                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyHTML}
                    onChange={() => {        setProps({...props, minifyHTML:!props.minifyHTML });   }}
                    />
                HTML
                </label>

                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyCSS}
                    onChange={() => {        setProps({...props, minifyCSS:!props.minifyCSS });   }}
                    />
                CSS
                </label>


                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyJS}
                    onChange={() => {        setProps({...props, minifyJS:!props.minifyJS });   }}
                    />
                JS
                </label>




        </div>

        <div className="sep">
            Compress Images 
        </div>

        <div>
            Add a throttling option: 
            maybe withc lighthouse --throttling.cpuSlowdownMultiplier=6 https://example.com

        </div>

        Chosen props: {JSON.stringify(props)}

    </div>
    {/* <hr/>    */}


    maybe here a button pointing to th built url(or we just return it) 

    { 
    props.ssr ?
     baseUrl = "path to next?":
        baseUrl = "path to react?"
    }

    {baseUrl + new URLSearchParams(props)}

    </>)

}


