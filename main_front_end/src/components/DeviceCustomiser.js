


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useEffect, useState } from "react"

export default function DeviceCustomiser(componentProps){

// Hook for managing added options
const [addedOptions, setAddedOptions] = useState([]);

// Component for adding options
const AddOptionList = () => {
    const [newOption, setNewOption] = useState({
        options: [],
        prop: "",
        name: "",
        type: "radio"
    });

    const addOption = () => {

        if (newOption.options.length !== 0 && newOption.prop !== "" && newOption.name !== "") {
            setAddedOptions([...addedOptions, newOption]);
            setNewOption({
                options: [],
                prop: "",
                name: "",
                type: "radio"
            });
        } else {
            alert("Please fill all the fields before adding a new option");
        }



    }

    const [isHidden, setIsHidden] = useState(true);
    const toggleVisibility = () => {
        setIsHidden(!isHidden);
      };

    return (
        <div className="sep">
          {!isHidden && (
            <>
              <input
                placeholder="Option Name"
                value={newOption.name}
                className="site-chooser smaller_remove_border"
                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
              />
              <input
                placeholder="Option Prop"
                value={newOption.prop}
                className="site-chooser smaller_remove_border"
                onChange={(e) => setNewOption({ ...newOption, prop: e.target.value })}
              />
              <textarea
                placeholder="Option Values (comma separated)"
                className="site-chooser"
                style={{ width: '60%', height: '100px', maxWidth:"100%", boxShadow:"none" }}
                onChange={(e) => setNewOption({ ...newOption, options: e.target.value.split(',') })}
              />

            <label>
                <input
                type="radio"
                name="optionType"
                value="radio"
                checked={newOption.type === "radio"}
                onChange={(e) => setNewOption({ ...newOption, type: e.target.value })}
                />
                radio
            </label>
            <label>
                <input
                type="radio"
                name="optionType"
                value="checkbox"
                checked={newOption.type === "checkbox"}
                onChange={(e) => setNewOption({ ...newOption, type: e.target.value })}
                />
                checkbox
            </label>

              <button onClick={addOption} className="site-chooser">
                Add Option
              </button>
            </>
          )}
          <button onClick={toggleVisibility} className="site-chooser">
            {isHidden ? 'Add Extra Parametes' : 'Hide'} 
          </button>
        </div>
      );

}



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

    useEffect(() => {

        componentProps.setSiteUrl(
            (prop)=>({
                ...prop,

                "formFactor": "desktop",
                "resolution": "1280x720",
                "throughputKbps": "1000",
                "cpuSlowdownMultiplier": "1",

            })
            )
        }, []

    )



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
            </div>
        
            {input.options.map((option) => {
                const optionValue = Array.isArray(option) ? option[0] : option;
                const optionLabel = Array.isArray(option) ? option[1] : option;
        
                return (
                    <label key={optionValue}>
                        <input
                            type={input.type}
                            name={input.prop}
                            value={optionValue}
                            checked={props[input.prop] ? props[input.prop].includes(optionValue) : false}
                            onChange={(event) => {
                                let newArray = Array.isArray(props[input.prop]) ? [...props[input.prop]] : [];
                                if (event.target.checked) {
                                    newArray.push(optionValue);
                                } else {
                                    newArray = newArray.filter(value => value !== optionValue);
                                }
                            
                                setProps({...props, [input.prop]: newArray});
                                componentProps.setSiteUrl( (prop) => ({...prop, [input.prop]: newArray}))
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

    <h2 className={componentProps.siteChosen === null ? "greyed-out-normal-font" :""} style={{"marginBottom":"-60px", "color":"black", "marginTop":"100px"}}>Device emulation</h2>

    <div className={componentProps.siteChosen === null ? "selector-container greyed-out" :"selector-container"}>


        <div className="sep">
            


        </div>

        <div className="sep">       


            <MultipleRadionInputs input={ {options:["640×480", "1280x720", "1920×1080",  "2560x1440"], prop: "resolution" , name:"Resolution",  type:"radio"}}/>


        </div>

        

        <div className="sep">        

            <MultipleRadionInputs input={ {options:["desktop", "mobile"], prop: "formFactor" , name:"Site form factor",  type:"radio"}}/>

        </div>

        
        <div  className="sep">
        
        <MultipleRadionInputs input={ {options:[["1000", "3G"], ["2000", "4G"], ["3000", "5G - Wired connection"] ], prop: "throughputKbps" , name:"Network speed",  type:"radio"}}/>

        
        </div>

        <div className="sep">

            <MultipleRadionInputs input={ {options:[["8", "Low-tier phone"], ["4", "High-end smartphone Low-end PC"], ["1", "High-end PC"] ], prop: "cpuSlowdownMultiplier" , name:"CPU speed",  type:"radio"}}/>


        </div>

        {/* Render all added options */}
        {addedOptions.map((input, index) => 
            <div className="sep" key={index}>
                <MultipleRadionInputs input={input} />
            </div>
        )}
        <AddOptionList />

        

        {/* Chosen props: {JSON.stringify(props)} */}

    </div>
    {/* <hr/>    */}




    </>)

}


