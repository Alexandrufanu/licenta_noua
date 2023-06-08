


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useState } from "react"

export default function PerformanceCustomiser(componentProps){


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

            "users": "0",
            "time": "2h",
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


            <MultipleRadionInputs input={ {options:["0", "100", "500"], prop: "users" , name:"Number concurent users per second",  type:"radio"}}/>


        </div>

                
        <div  className="sep">
        
            <MultipleRadionInputs input={ {options:[["2h", "Whole test"], ["20s", "20 seconds "], ["40s", "40 seconds"] ], prop: "time" , name:"Time:",  type:"radio"}}/>

        
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


