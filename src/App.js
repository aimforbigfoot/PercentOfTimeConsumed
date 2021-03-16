import { useEffect, useState } from "react";
import Block from "./Block"
import {IoLogoGithub,IoLogoYoutube,IoSettingsOutline,IoEyeOutline} from "react-icons/io5"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [timeRn, setTimeRn] = useState(null)
  const [pofMin, setPofMin] = useState(0)
  const [pOfHour, setpOfHour] = useState(0)
  const [pOfDay, setPOfDay] = useState(0)
  const [pOfWeek, setpOfWeek] = useState(0)
  const [pOfYear, setPOfYear] = useState(0)
  const [POfCentruy, setPOfCentruy] = useState(0)
  const [limitDecmials, setLimitDecmials] = useState(15)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [hideState, setHideState] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
        let currDate = new Date()
        setTimeRn(currDate)
  
        let seconds = currDate.getSeconds()
        let minutes = currDate.getMinutes()*60
        let hours = currDate.getHours()*60*60
        let month = currDate.getMonth()
        let day = currDate.getUTCDate()
        let date = currDate.getDate()
        setPofMin( seconds/60*100 )
        setpOfHour( (minutes + seconds  )/3600*100 )
        setPOfDay( (hours+minutes+seconds)/86400*100 )
        setpOfWeek( (((date % 7)*86400)+hours+minutes+seconds)  /604800*100  )
        let pOfYearNum = ((((month)*30.42 + day)*86400)+hours+minutes+seconds)
        setPOfYear(  pOfYearNum  /31622400*100 )
        // This solution will not work in the year > 9999
        let yearString = currDate.getFullYear().toString()
        let SecondPartOfYear = yearString[2]+yearString[3]
        setPOfCentruy( (SecondPartOfYear*365.2425*24*3600+pOfYearNum  )/3155692600*100)
    }, 1000);
    return () => {
      clearTimeout(interval)
    }
  }, [])

  

  return (
    <>
    <ToastContainer />
    <div className="white tc">
    {timeRn ? ( 
      <main className="w-80 ml-auto mr-auto mt5">
        
        <p className="f1">{timeRn.getHours()} | {timeRn.getMinutes()}  | {timeRn.getSeconds()}</p>
        <p>{timeRn.toString()}</p>
        <Block message="Minutes" number={pofMin} toFixedNum={limitDecmials} />
        <Block message="Hours" number={pOfHour} toFixedNum={limitDecmials}/>
        <Block message="Day" number={pOfDay} toFixedNum={limitDecmials}/>
        <Block message="Week" number={pOfWeek} toFixedNum={limitDecmials}/>
        <Block message="Year" number={pOfYear} toFixedNum={limitDecmials}/>
        <Block message="Century" number={POfCentruy} toFixedNum={limitDecmials}/>
        <p className="red">All we have to decide is what to do with the time that is given us. - Gandalf the Great</p>
        { settingsVisible ? 
          <div className="formTypeDiv ml-auto w-100 tc mr-auto">
            <div className="flex items-center w-100 ml-auto mr-auto">
              <p  className="pr2 ml-auto">Limit Decimals: </p><input className="mr-auto" defaultChecked={false} onChange={(e) => ( e.target.checked ? setLimitDecmials(2) : setLimitDecmials(15) )} type="checkbox"/>
            </div>
          </div>
         : <div></div> }
        {hideState ? 
        <div className="ml-auto mr-auto mt5 pa3 w-auto tc">
          <a className="pa4" href="https://github.com/aimforbigfoot/PercentOfTimeConsumed"><IoLogoGithub color="white"/></a>
          <a className="pa4" href="https://www.youtube.com/channel/UCRs1QwQrxmgPpy604EEafWw"><IoLogoYoutube color="red" /></a>
          <span onClick={ () => {setSettingsVisible( !settingsVisible )} } className="pa4 shadow-hover"><IoSettingsOutline /></span>
          <span onClick={() => {
            setHideState(false)
            toast.error("if you want to see the icons again refresh the page")
            }} className="pa4 shadow-hover"><IoEyeOutline /></span>
        </div>
        : ""
        }
    </main>
      ) : "Wait one second"}
    </div>
    </>
  );
};

export default App;
