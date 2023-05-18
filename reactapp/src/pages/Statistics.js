import '../style/ClothesStore.css'; // import CSS file

import { useEffect, useState, PureComponent } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { scroller } from 'react-scroll';


const GraphDropdown = ( props ) => {
  const [show, setShow] = useState(false);


  console.log("DROPDOWN COMPONENT is called on graph", props)
  console.log(props, props.props.title, props.description)
  return (
    <div>
      a
      {props.props.title} a 
      <button onClick={() => {setShow(!show)}}>Reload Dropdown</button>
      {
        show && (
          <div>
            <p>{props.props.description}</p>
          </div>
        )
      }


    </div>
  );
};




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
  
  return (<>     
  <p>{props.additionalData.title}</p>
  <p>{props.additionalData.descritpion}</p>

  <GraphDropdown props={{title:props.additionalData.title, description:props.additionalData.descritpion}} />
  
  <LineChart
      width={500}
      height={300}
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


      {/* <Line
        type="monotone"
        dataKey="setup_1" />

      <Line
        type="monotone"
        dataKey="setup_2" /> */}

        {getLines(props.data).map((line) => line)}

    </LineChart>
    </>
  );

}







let listOfArrayData = []
let listOfAdditionalData = []


export default  function Statistics() {
    
    // const [listOfArrayData, setListOfArrayData ]  = useState( [] )   
    

    
    const [ currentSetupNumber, setCurrentSetupNumber ] = useState( 0 )

    const [ report, setReport ] = useState( null )

    // report was = {}
    // report is [ {}, {}, {} ]

    const report_audits_fields = ['network-rtt', 'mainthread-work-breakdown', 'speed-index', 'network-server-latency', "total-blocking-time"]

    const get_report_audit = (index, type, field) =>{
        return report[index].audits[type][field]
    }

    async function getReport() {
      
      await fetch("api/skimmed-report?" + new URLSearchParams({
        runsNumber: 10, // 500 works
  
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
      });}

    useEffect(()=>{
            
        getReport();

        }, []

    )


    const show_stat = (lst) => {

        let lll = [];
        for (let i = 0; i < lst.length; i++) {
            // console.log(get_report_audit(report_audits_fields[i], "title"));
            
            // report was = {}
            // report is [ {}, {}, {} ]
            
            // list arrays only added once
            if (currentSetupNumber === 0)
            {
              listOfArrayData.push([])

              listOfAdditionalData.push(
                {
                  title: get_report_audit(0, report_audits_fields[i], 'title'),
                  descritpion: get_report_audit(0, report_audits_fields[i], 'description'),
                  numericUnit: get_report_audit(0, report_audits_fields[i], 'numericUnit')
                } 
              )



            }
            
               
            for(let j=0; j < report.length; j++)
            {
              if (currentSetupNumber === 0)
              { 
                console.log(j);
                console.log(get_report_audit(j, report_audits_fields[i], 'title'))
                lll.push(
                // <li>{get_report_audit(report_audits_fields[i], "title")}</li>
                <li>{get_report_audit(j, report_audits_fields[i], 'title')}: {get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3)} {get_report_audit(j, report_audits_fields[i], 'numericUnit')} ({ ((get_report_audit(j, report_audits_fields[i], 'numericValue'))/1000).toFixed(3)} seconds)  -> trial number {i}</li>
                
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
              // Should be a diferent data for each J for
              }else {
              

                  // return { ...item, 
                  // [`setup_${ currentSetupNumber  }`] : get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3)
                  // };
                  // })
              
                  console.log(listOfArrayData[i][j], get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3),  currentSetupNumber * 50 , (get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3) + currentSetupNumber * 50 ))

                  listOfArrayData[i][j][`setup_${ currentSetupNumber  }`] = ( parseFloat(get_report_audit(j, report_audits_fields[i], "numericValue").toFixed(3)) + 50 * currentSetupNumber ).toFixed(3)

              }
            
            }
            


        }

        console.log(listOfArrayData)

        return (

        <div className='graphs-container'>
        <ul>
            {lll}
        </ul>
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
              <a href="/"> See full statistics </a>
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
        {
            report === null?
            <>

            Loading Screen

            </>:
            <>
                Leave the user to select the consecutive runs

                and each new button press is a new line in the graph !! 


                {show_stat(report_audits_fields)}

                {/* <ul>
                    <li>
                        {report.audits['network-rtt'].title}: {report.audits['network-rtt'].numericValue.toFixed(3)} {report.audits['network-rtt'].numericUnit} ({(report.audits['network-rtt'].numericValue/1000).toFixed(3)} seconds)
                    </li>
                    <li>
                        {report.audits['mainthread-work-breakdown'].title}: {report.audits['mainthread-work-breakdown'].numericValue.toFixed(3)} {report.audits['mainthread-work-breakdown'].numericUnit} ({(report.audits['mainthread-work-breakdown'].numericValue/1000).toFixed(3)} seconds)

                    </li>

                </ul>*/}
            </>
        }

        HRRE


        <button onClick={()=>{  getReport().then(()=>setCurrentSetupNumber(currentSetupNumber + 1));  }} > TT </button>

        {/* <Graph data={data}/>


        <GraphComponent data={newData} /> */}



        {listOfArrayData.map((data, index) => <GraphComponent data={data}  additionalData={listOfAdditionalData[index]}/>)}
        listOfAdditionalData
        {/* {listOfArrayData.map((data) => <GraphComponent data={data} />)} */}


{/* 
          <GraphComponent data={listOfArrayData[} /> */}

    </body>

    
    </>)


}









