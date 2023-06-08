


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useState } from "react"

export default function DeviceCustomiser(componentProps){


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

            "formFactor": "desktop",

            "resolution": "1280x720",

            "throughputKbps": "1000",
            // throughputKbps

            "cpuSlowdownMultiplier": "1",
            //  
        } 
    );
    
    const MultipleRadionInputs = ({input}) => {
        
        // should have a label with the value 
        // should have also a name from the props 
        // [ {options:[1,2,3,22], prop: runsNumber , name:"Site site runs (for the statistics page only):"} ]

        return (
            <div className="sep">
                
                <div className="element-title"> 
                    {input.name}
                </ div>


            {input.options.map((option) => {
                const optionValue = Array.isArray(option) ? option[0] : option;
                const optionLabel = Array.isArray(option) ? option[1] : option;

                return (
                    <label key={optionValue}>
                        <input
                            type={input.type}
                            name={input.prop}
                            value={optionValue}
                            checked={props[input.prop] === optionValue}
                            onChange={(event) => {
                                setProps({...props, [input.prop]: event.target.value});
                            }}
                        />

                        {optionLabel}
                    </label>
                );
            })}
            </div>
        );
    };


    let baseUrl
    return(<>
    <div className={componentProps.siteChosen === null ? "selector-container greyed-out" :"selector-container"}>

    <div className="sep">
            Number of items rendered on the page:


        </div>





        <div className="sep">
            


        </div>

        <div className="sep">       


            <MultipleRadionInputs input={ {options:["1280x720", "2560x1440"], prop: "resolution" , name:"Resolution",  type:"radio"}}/>


        </div>

        

        <div className="sep">        

            <MultipleRadionInputs input={ {options:["desktop", "mobile"], prop: "formFactor" , name:"Form factor of the sites rendered",  type:"radio"}}/>

        </div>

        
        <div  className="sep">
        
        <MultipleRadionInputs input={ {options:[["1000", "3G"], ["2000", "4G"], ["3000", "5G - Wired connection"] ], prop: "throughputKbps" , name:"network speed",  type:"radio"}}/>

        
        </div>

        <div className="sep">

            <MultipleRadionInputs input={ {options:[["8", "Low-tier phone"], ["4", "High-end smartphone Low-end PC"], ["1", "High-end PC"] ], prop: "cpuSlowdownMultiplier" , name:"CPU speed",  type:"radio"}}/>


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


