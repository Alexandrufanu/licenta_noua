import '../style/ClothesStore.css'; // import CSS file

import { useEffect, useState, PureComponent, useMemo, memo } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { scroller } from 'react-scroll';



import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Canvas
} from "@react-pdf/renderer";
import { get } from 'react-scroll/modules/mixins/scroller';


// const report_audits_fields = [
//   'network-rtt', 
//   'mainthread-work-breakdown', 'speed-index', 'network-server-latency', 
//   "total-blocking-time", "max-potential-fid","server-response-time",
//   "interactive",
//   "bootup-time",
  
//   // FE separated from BE
//   "CpuUsage",
//   "MemoryUsage",


// ]

let updatedNames = { 
  "mainthread-work-breakdown":{ title: "mainthread-work", description:"Main thread work "},
  'network-rtt':{ title: "mainthread-work", description:"Main thread work "},
}
// 

const GraphDropdown = ( props ) => {
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);


  // console.log("DROPDOWN COMPONENT is called on graph", props)
  // console.log(props, props.props.title, props.description)

  // Determine the maximum number of setups
  const maxSetups = Math.max(...props.props.data.map(run => Object.keys(run).length - 1));

  // Create an array with setup indices
  const setupIndices = Array.from({ length: maxSetups }, (_, i) => i);
  let sum = 0;
  let length = 0;
  return (
    <div>
      <h2>
      
          {
            updatedNames.hasOwnProperty(props.props.id)?
            <>{updatedNames[props.props.id].title}</>:
            <>{props.props.title} </>

          }
      </h2>
      <div className='graph-details'>
      
        <button className="site-chooser site-descriptor" onClick={() => {setShow(!show)}}      > 
          Description
        </button>

        <div class="description">Click to see the description</div>
      </div>

      
      {
        show && (
          <div className="description-content">
            {
              updatedNames.hasOwnProperty(props.props.id)?
              <p>{updatedNames[props.props.id].description}</p>:
              <p>{props.props.description}</p>

            }
          </div>
        )
      }

        {/* <button className="site-chooser site-descriptor" onClick={() => {setShow(!show)}}      > 
          See data as table
          {props.props.data.map((item) => {
            return <p>{item.name}</p>
          })
          }
        </button> */}
      


      <button className="site-chooser site-descriptor" onClick={() => {setShowTable(!showTable); console.log(props.props.data) }}      > 
          {
            showTable ? "Hide data as table" : "Show data as table"
          }
        </button>
      
      {
      showTable &&
      <table 
      style={{border: "1px solid black", width: "100%", textAlign: "center"}}
      >
      <thead>
        <tr>
          <th></th> { /* Empty header for the setup names */ }
          {props.props.data.map((run, i) => <th key={i}>{run.name}</th>)} { /* Headers for each run */ }
          <th>Average</th>
        </tr>
        </thead>
        <tbody>
          { 
          setupIndices.map(i => (  // Create a row for each setup
            sum = 0, length = 0, console.log("SETUP:", i, props.props.data), 
            <tr key={i}>
              <td>{`Setup ${i}`}</td>  
              {props.props.data.map(run => {length += 1;sum += parseFloat(run[`setup_${i}`]);return <td key={run.name}>{run[`setup_${i}`]}</td> }   )}  
              <td>  {(sum / length).toFixed(3)}</td>
            </tr>

          ))}
        </tbody>
      </table>
      }


    </div>
  );
};


const RunList = ({ list }) => {

  const [show, setShow] = useState(false);

  return (
  <>  
    <button className="site-chooser site-descriptor" onClick={() => {setShow(!show)}}      > Runs Data    </button>
    {show && (
      <div className="object-list">
          {list.map((object, index) => (
              <div className="object-item" key={index}>
                  <h1> Setup {index} </h1>
                  
                  {Object.entries(object).map(([key, value]) => (
                      <p key={key}><strong>{key}:</strong> {String(value)}</p>
                  ))}
              </div>
          ))}
      </div>
    )}
  </>
  );
}



function GraphComponent(props) {
   
  let domain = [0, 1]; // Default domain values

  console.log("GRAPH COMPONENT is called on graph", props.additionalData.title)

  // console.log(props.data)


  function getLines(data){

    // colors for the lines
    const lineColors = [
      "#FF0000", // Red
      "#0000FF", // Blue
      "#FF00FF", // Magenta
      "#800080", // Purple
      "#008080", // Teal
      "#FFC0CB", // Pink
      "#008000", // Green
      "#000080", // Navy
      "#FF4500", // Orange Red
      "#4B0082", // Indigo
      "#800000",  // Maroon
      "#00FF00", // Lime
      "#FFFF00", // Yellow
      "#FFA500", // Orange
      "#00FFFF", // Cyan


    ];

    let lines = []

    if (data.length > 0)
    {
      // parsing through the keys of the first object
      
      let keys = Object.keys(data[0])

      console.log(keys)
      
      
      keys = keys.filter(item => item !== 'name')


      keys.forEach(element => {
        lines.push(<Line
          type="monotone"
          dataKey={element}
          stroke={lineColors[keys.indexOf(element)]}
          key={element}
          activeDot={{ r: 8 }}
        />)
      }
      );
    
    }
    
    
  
    return lines;

  }


  if (props.data && props.data.length > 0) {

  
    let values = props.data.map( object =>  Object.values(object));


    values = values.flat()

    console.log(values)

    // converting values to float if possible
    values = values.map(item => parseFloat(item))

    values = values.filter(item => !isNaN(item))

    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Setting the domain based on the calculated minimum and maximum values
    // domain = [Math.floor(min), Math.ceil(max)];
    // OR -> TO ask about this part
    // domain = [Math.floor(0), Math.ceil(max)];
    domain = [Math.floor(min/2), Math.ceil(max)];

    console.log(domain)

    console.log("DOMAIN IS SET dor the graph", props.additionalData.title)
  }



  const [graphDimensions, setGraphDimensions] = useState({ width: 700, height: 500 });

  const handleSliderChange = (e, dimension) => {
      const value = Number(e.target.value);
      setGraphDimensions({...graphDimensions, [dimension]: value });
  }
  
  return (<div className='data-container'>     
  {/* <p>{props.additionalData.title}</p>
  <p>{props.additionalData.descritpion}</p> */}



  <GraphDropdown props={{title:props.additionalData.title, description:props.additionalData.descritpion, data:props.data, id:props.additionalData.id}} />

  <div>
        <label>
            Width: 
            <input 
                type="range"
                min={window.innerWidth * 0.25}
                max={window.innerWidth}
                value={graphDimensions.width}
                onChange={(e) => handleSliderChange(e, 'width')}
            />
        </label>
        <label>
            Height: 
            <input 
                type="range"
                min={window.innerHeight * 0.25}
                max={window.innerHeight}
                value={graphDimensions.height}
                onChange={(e) => handleSliderChange(e, 'height')}
            />
        </label>
      </div>
    
  <LineChart
                width={graphDimensions.width}
                height={graphDimensions.height}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}

    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis  
        dataKey="name" 
      />
      <YAxis 
      domain={domain}
        label={{
            angle: -90,
            value: 'Values in ' + props.additionalData.numericUnit,
            dx: -22, // Adjust the margin horizontally
            style: { margin: '10px' } // Adjust the margin vertically
          }}
      
      />
      <Tooltip />
      <Legend />


        {getLines(props.data).map((line) => line)}

    </LineChart>


    {/* Runs: {JSON.stringify(props.runs)} */}

    <RunList list={props.runs} />

    </div>
  );

}







function areEqual(prevProps, nextProps) {
  // Compare only the 'trigger' prop for changes
  return prevProps.trigger === nextProps.trigger;
}

let listOfArrayData = []
let listOfAdditionalData = []


function Statistics( {trigger, parameters}) {
    

    
    const [ currentSetupNumber, setCurrentSetupNumber ] = useState( -1 )

    const [ report, setReport ] = useState( null )

    const [ runs, setRuns] = useState([])
    
    // report was = {}
    // report is [ {}, {}, {} ]

    let initialisedListOfArrayData = false;

    const report_audits_fields = [
      'network-rtt', 
      'mainthread-work-breakdown', 'speed-index', 'network-server-latency', 
      "total-blocking-time", "max-potential-fid","server-response-time",
      "interactive",
      "bootup-time",
      
      // FE separated from BE
      "CpuUsage",
      "MemoryUsage",

    
    ]




























    const get_report_audit = (index, type, field) =>{
      console.log("GET REPORT AUDIT", index, type, field, report[index].audits[type][field])
        return report[index].audits[type][field]
    }

    async function getReport( str_path ) {
      
      await fetch(`api/${str_path}?` + new URLSearchParams({
        // runsNumber: 1, // 500 works
        // siteTested: "http://localhost:3006",
        ...parameters
      }))
      .then((response) => {
          console.log(response)
          return response.json();
      })
      .then((data) => {
          console.log(data);
    
          setReport(data)
          // setCurrentSetupNumber(currentSetupNumber + 1);
          // Perform further operations with the data
    
          // console.log(data.audits['network-rtt'])
          // console.log(data.audits['mainthread-work-breakdown'])
      })
      }

    useEffect(()=>{
      
        console.log("TRIGGER IS", trigger, )

        if (trigger === 1)
        {  
          getReport("get-report-stub-data")//.then( () => {setCurrentSetupNumber(currentSetupNumber + 1);} );
        }
          else if (trigger >= 2)
        {
          // setCurrentSetupNumber(currentSetupNumber + 1)
          getReport("get-report-stub-data").then( () => {setCurrentSetupNumber(currentSetupNumber + 1);} )
        }

        else if (trigger === -1)
        {
          getReport("get-report").then( () => {setCurrentSetupNumber(currentSetupNumber + 1);setRuns((prop)=>([...prop, parameters])) } );
          // setCurrentSetupNumber(currentSetupNumber + 1);
        }
        else if (trigger <= -2)
        {
          // setCurrentSetupNumber(currentSetupNumber + 1);
          getReport("get-report").then( () => {setCurrentSetupNumber(currentSetupNumber + 1);setRuns((prop)=>([...prop, parameters]))  } )  
        }  
      
      }, [trigger]
    )


    const show_stat = (lst) => {

        let lll = [];

        console.log("SHOW STAT", lst, currentSetupNumber)

        console.log("report", report)

        for (let i = 0; i < lst.length; i++) {
            // console.log(get_report_audit(report_audits_fields[i], "title"));
            
            // report was = {}
            // report is [ {}, {}, {} ]
            
            // list arrays only added once
            if (currentSetupNumber === 0 && trigger === -1)
            {
              console.log("added empty arr on:", listOfArrayData, listOfAdditionalData.length, initialisedListOfArrayData)
              console.log("added additional data on:", listOfAdditionalData, listOfAdditionalData.length, initialisedListOfArrayData)
              console.log(initialisedListOfArrayData)

              listOfArrayData.push([])

              listOfAdditionalData.push(
                {
                  title: get_report_audit(0, report_audits_fields[i], 'title'),
                  descritpion: get_report_audit(0, report_audits_fields[i], 'description'),
                  numericUnit: get_report_audit(0, report_audits_fields[i], 'numericUnit'),
                  id: get_report_audit(0, report_audits_fields[i], 'id'),
                } 
              )



            }
            
               
            for(let j=0; j < report.length; j++)
            {
              if (currentSetupNumber === 0 && trigger === -1)
              { 
                console.log(j);
                console.log(get_report_audit(j, report_audits_fields[i], 'title'))
                lll.push(
                // <li>{get_report_audit(report_audits_fields[i], "title")}</li>
                <li>{get_report_audit(j, report_audits_fields[i], 'title')}: {get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3)} {get_report_audit(j, report_audits_fields[i], 'numericUnit')} ({ ((get_report_audit(j, report_audits_fields[i], 'numericValue'))/1000).toFixed(3)} seconds)  - trial number {i}</li>
                
                );
              

                // if (currentSetupNumber === 0)
                // {
                console.log("in if ")
                listOfArrayData[i].push(
                { [`setup_${currentSetupNumber}`] :get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3), name: "run " + j.toString(), 
                  // [`setup_${ currentSetupNumber + 1 }`] : 550
                
                });

                // listOfAdditionalData[i].push({title: get_report_audit(j, report_audits_fields[i], 'title')} )

                // console.log( get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3))
              // console.log(listOfArrayData)

              // console.log(listOfArrayData[0])
              // Should be a diferent data for each x` J for
              }else {
              

                  // return { ...item, 
                  // [`setup_${ currentSetupNumber  }`] : get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3)
                  // };
                  // })
              
                  // console.log(listOfArrayData[i][j], get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3),  currentSetupNumber * 50 , (get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3) + currentSetupNumber * 50 ))

                  listOfArrayData[i][j][`setup_${ currentSetupNumber  }`] = ( parseFloat(get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3))  ).toFixed(3)

              }
            
            }
            


        }
        
        initialisedListOfArrayData = true;
        console.log("MADE TRUE: ", listOfAdditionalData)

        console.log("listOfArrayData: ", listOfArrayData)


        return (

        <div >
        
        </div>
        );

    }




    return(<>

    <header className='nav-cont'>   
        <nav className='nav-style'>
          <ul >
            <li>
            <img  alt="logo" src={require("../images/MerticMaster-MainLogo.PNG")} className="logo"/>

            </li>
            <li>
              <div className="site-chooser"
              style={{padding: "10px"}}
              >
              <a href="/"> reset graphs </a>
              </div>
            </li>

            <li>
              <div className="site-chooser" onClick={() => scroller.scrollTo('content', { smooth: true })}
              style={{padding: "10px"}}
              >
                 To the configuration </div>
            </li>
          </ul>
        </nav>
      </header>
    
    <body>

      <div className="body-container">
        {
            report === null?
            <>
            <div style={{
              display: "flex",
              justifyContent: "center",
              // flexDirection: "row",
              flexDirection: "column",
              // alignContent: "center",
              alignItems: "center",
              marginBottom: "500px",

            }}>
              <div><h1> Loading </h1></div>
              <br/>
              <div className='loading-spinner'></div>
            </div>

            
            </>:
            <>


                {show_stat(report_audits_fields)}

            </>
        }


        {/* <button onClick={()=>{  getReport("skimmed-report").then(()=>setCurrentSetupNumber(currentSetupNumber + 1));  }} > Old way -> skimmed-report </button>


        <button onClick={()=>{  
          getReport("get-report").then(()=>setCurrentSetupNumber(currentSetupNumber + 1));  
          // getReport("get-report-stub-data").then(()=>setCurrentSetupNumber(currentSetupNumber + 1));
          }} > __get_report </button>


        <button onClick={()=>{  getReport().then(()=>setCurrentSetupNumber(currentSetupNumber + 1));  }} > ___ </button> */}

        <br/> <br/> <br/>





        {listOfArrayData.map((data, index) => <GraphComponent data={data}  additionalData={listOfAdditionalData[index]} runs={runs}/>)}


        {/* <PdfDoc props={props.props} /> */}




        {/* {listOfArrayData.map((data) => <GraphComponent data={data} />)} */}


{/* 
          <GraphComponent data={listOfArrayData[} /> */}

        </div>

        <br/> <br/> <br/>



        
      
        {/* {listOfArrayData.map((data, index) => <PdfDoc > <GraphComponent data={data}  additionalData={listOfAdditionalData[index]}/></PdfDoc >)} */}

        {/* {["ASDASD"].map((data, index) => <PdfDoc input={<TestComponent/>}><TestComponent/></PdfDoc >)} */}

        {/* report !== nul<PdfDoc /> */}
{/* 
        <PdfDocss> </PdfDocss>  
        <PdfDocss input={<TestComponent/>}></PdfDocss> */}

    </body>

    
    </>)


}


export default memo(Statistics, areEqual )
