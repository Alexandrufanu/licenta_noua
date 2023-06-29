


import "../style/SiteCustomiser.css"

// import ClothesStore from "../pages/ClothesStore"

import { useState, useEffect } from "react"

export default function SiteCustomiser(componentProps){



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

    const [props, setProps] = useState(
        // {backCache:false, browserCache:false, imageType:"blob"}
        {
            "itemsRendered": "10",
            "runs": "1",    
            "backendCache": false,
            "backendCacheTime": "2",

            "browserCache": false,
            "browserCacheTime": "2",

            "imageType": "blob",
            "ssr": false,
            "compressImages": false,
            "throttling": false,
            "minifyHTML": false,
            "minifyCSS": false,
            "minifyJS": false,
        } 
    );

    useEffect(() => {

        
        componentProps.setSiteUrl(
            (prop)=>({
                ...prop,
                
                "itemsRendered": "10",
                "runs": "1",    

                "backendCache": false,
                "backendCacheTime": "2",

                "browserCache": false,
                "browserCacheTime": "2",

                "imageType": "blob",
                "ssr": false,
                "compressImages": false,
                "throttling": false,
                "minifyHTML": false,
                "minifyCSS": false,
                "minifyJS": false,
            })
            )
        }, []
    
        )


    const handleBackCacheChange = () => {
        setProps({...props, backendCache:!props.backendCache});
        componentProps.setSiteUrl( (prop)=>({...prop,  backendCache:!props.backendCache}))

    };
    const handleBrowserCacheChange = () => {
        setProps({...props, browserCache:!props.browserCache});
        componentProps.setSiteUrl( (prop)=>({...prop,  browserCache:!props.browserCache}))
    };


    const handleImageTypeChange = (event) => {
        setProps({...props, imageType: event.target.value});
        componentProps.setSiteUrl( (prop)=>({...prop,  imageType:event.target.value}))
      };

    const handleRunChange = (event) => {
        setProps({...props, runs: event.target.value});
        componentProps.setSiteUrl( (prop)=>({...prop,  runs:event.target.value}))
        
    };

    const handleRenderChange = (event) => {
        setProps({...props, itemsRendered: event.target.value});
        componentProps.setSiteUrl( (prop)=>({...prop,  itemsRendered:event.target.value}))
    };

    const handleSSRChange = () => { 
        setProps({...props, ssr:!props.ssr});
        componentProps.setSiteUrl( (prop)=>({...prop,  ssr:!props.ssr}))
    };


    
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
                            checked={input.type ==="radio" ?  props[input.prop] === optionValue: props[input.prop] ? props[input.prop].includes(optionValue) : false}
                            onChange={(event) => {

                                if (input.type ==="radio") 
                                {setProps({...props, [input.prop]: event.target.value});
                                componentProps.setSiteUrl( (prop)=>({...prop,  [input.prop]:event.target.value}))
                                }else {
                                    let newArray = Array.isArray(props[input.prop]) ? [...props[input.prop]] : [];
                                    if (event.target.checked) {
                                        newArray.push(optionValue);
                                    } else {
                                        newArray = newArray.filter(value => value !== optionValue);
                                    }
                                
                                    setProps({...props, [input.prop]: newArray});
                                    componentProps.setSiteUrl( (prop) => ({...prop, [input.prop]: newArray}))
                                
                                }

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
    
    <h2 className={componentProps.siteChosen === null ? "greyed-out-normal-font" :""} style={{"marginBottom":"-60px", "color":"black"}}>Site Customiser</h2>

    <div className={componentProps.siteChosen === null ? "selector-container greyed-out" :"selector-container"}>
    

    <div className="sep">
            <div className="element-title"> 

                Number of items rendered on the page:
            </div>

            <label>
                <input
                type="radio"
                name="optionRenderNumber"
                value="10"
                checked={props.itemsRendered === "10"}
                onChange={handleRenderChange}
                />
                10
            </label>
            <label>
                <input
                type="radio"
                name="optionRenderNumber"
                value="25"
                checked={props.itemsRendered === "25"}
                onChange={handleRenderChange}
                />
                25
            </label>
            <label>
                <input
                type="radio"
                name="optionRenderNumber"
                value="50"
                checked={props.itemsRendered === "50"}
                onChange={handleRenderChange}
                />
                50
            </label>
            <label>
                <input
                type="radio"
                name="optionRenderNumber"
                value="100"
                checked={props.itemsRendered === "100"}
                onChange={handleRenderChange}
                />
                100
            </label>

        </div>





        <div className="sep">

            <div className="element-title"> 

                Site site runs (for the statistics page only):
            </div>

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
                    value="4"
                    checked={props.runs === "4"}
                    onChange={handleRunChange}
                    />
                    4
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="8"
                    checked={props.runs === "8"}
                    onChange={handleRunChange}
                    />
                    8
                </label>
                <label>
                    <input
                    type="radio"
                    name="optionRun"
                    value="16"
                    checked={props.runs === "16"}
                    onChange={handleRunChange}
                    />
                    16
                </label>

        </div>

        <div className="sep">       

            
            <div className="element-title"> 

                Enable Backend Cache: <input
                type="checkbox"
                checked={props.backendCache}
                onChange={handleBackCacheChange}
                />
            </div>
            


            <div className={!props.backendCache ? 'greyed-out' : 'subelement'}>
            <div 
                style={{marginLeft:"15%"}}
                >

                </div>
                
                <MultipleRadionInputs input={ {options:[["2", "first 2 runs"], ["50%", "50% of the runs"],["75%", "75% of the runs"], ["100%","whole test"]], prop: "backendCacheTime" , name:"Site site runs (for the statistics page only):", type:"radio"}} />
                
                

                Cache is a temporary storage 
            </div>

        </div>

        

        <div className="sep">        

            <div className="element-title"> 
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
                </div>

                <MultipleRadionInputs input={ {options:[["2", "first 2 runs"], ["50%", "50% of the runs"],["75%", "75% of the runs"], ["100%","whole test"]], prop: "browserCacheTime" , name:"Site site runs (for the statistics page only):",  type:"radio"}}/>


            </div>
        </div>

        

        <div className="sep">
            <div className="element-title"> 
                Use File images:
            </div>

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


        <div className="sep">
            
            <div className="element-title"> 
                Enable Server Side Rendering (SSR)  <input
                type="checkbox"
                checked={props.ssr}
                onChange={handleSSRChange}
                />
            </div>

            {/* <div>
            Generate fully rendered HTML on the server
            </div> */}
        </div>
        
        
        {/* <div className="sep"
        style={{    
            // alignItems: "flex-start",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
        }}
        >
            <div className="element-title"> 

                Minify:
            </div>

                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyHTML}
                    onChange={() => {        

                        setProps({...props, minifyHTML:!props.minifyHTML });   
                        componentProps.setSiteUrl( (prop)=>({...prop,  minifyHTML:!props.minifyHTML }))

                    }}
                    />
                HTML
                </label>

                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyCSS}
                    onChange={() => {        
                        setProps({...props, minifyCSS:!props.minifyCSS });   
                        componentProps.setSiteUrl( (prop)=>({...prop,  minifyCSS:!props.minifyCSS }))

                    }}
                    />
                CSS
                </label>


                <label>
                    <input
                    type="checkbox"
                    checked={props.minifyJS}
                    onChange={() => {        
                        setProps({...props, minifyJS:!props.minifyJS });   
                        componentProps.setSiteUrl( (prop)=>({...prop,  minifyJS:!props.minifyJS }))
                    
                    }}
                    />
                JS
                </label>




        </div> */}


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

{/* 
    maybe here a button pointing to th built url(or we just return it) 

    { 
    props.ssr ?
     baseUrl = "path to next?":
        baseUrl = "path to react?"
    }

    {baseUrl + new URLSearchParams(props)} */}

    </>)

}


