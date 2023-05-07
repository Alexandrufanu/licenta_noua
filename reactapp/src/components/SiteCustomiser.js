


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useState } from "react"

export default function SiteCustomiser(componentProps){

    const [props, setProps] = useState({backCache:false, browserCache:false, imageType:"blob"});

    const handleBackCacheChange = () => {
        setProps({...props, backCache:!props.backCache});
    };
    const handleBrowserCacheChange = () => {
        setProps({...props, browserCache:!props.browserCache});
    };


    const handleImageTypeChange = (event) => {
        setProps({...props, imageType: event.target.value});
      };

    console.log(componentProps)

    return(<>
    <div className={componentProps.siteChosen === 0 ? "selector-container greyed-out" :"selector-container"}>


        <div className="sep">       

            <div> 
                Enable Backend Cache: <input
                type="checkbox"
                checked={props.backCache}
                onChange={handleBackCacheChange}
                />
            </div>

            <div className={!props.backCache ? 'greyed-out' : 'subelement'} >
                Range slider for Cache size
            </div>

            <div className={!props.backCache ? 'greyed-out' : 'subelement'}>
                Cache time: 
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

            <div className={!props.browserCache ? 'greyed-out subelement' : 'subelement'} >
                Range slider for Cache size
            </div>

            <div className={!props.browserCache ? 'greyed-out subelement' : 'subelement'}>
                Cache time: 
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
        </div>
        {/* <br />
        <label>
            <input
            type="radio"
            name="optionGroup"
            value="option3"
            checked={props.imageType === "blob"}
            onChange={handleImageTypeChange}
            />
            Option 3
        </label>         */}

        <div className="sep">
            Enable SSR 
        </div>

        <div className="sep">
            Compress Images 
        </div>



    </div>
    {/* <hr/>    */}

    </>)

}


