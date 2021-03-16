import { useEffect, useState } from "react";
import Block from "./Block"

function App() {

  const [timeRn, setTimeRn] = useState(null)
  const [pofMin, setPofMin] = useState(0)
  const [pOfHour, setpOfHour] = useState(0)
  const [pOfDay, setPOfDay] = useState(0)
  const [pOfWeek, setpOfWeek] = useState(0)
  const [pOfYear, setPOfYear] = useState(0)
  const [POfCentruy, setPOfCentruy] = useState(0)
  const [limitDecmials, setLimitDecmials] = useState(15)
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
    <div className="tc bg-black white">
    {timeRn ? ( 
      <main className="w-80 ml-auto mr-auto mt5">
        <p className="f1">{timeRn.getHours()} | {timeRn.getMinutes()}  | {timeRn.getSeconds()}</p>

        <Block message="Minutes" number={pofMin} toFixedNum={limitDecmials} />
        <Block message="Hours" number={pOfHour} toFixedNum={limitDecmials}/>
        <Block message="Day" number={pOfDay} toFixedNum={limitDecmials}/>
        <Block message="Week" number={pOfWeek} toFixedNum={limitDecmials}/>
        <Block message="Year" number={pOfYear} toFixedNum={limitDecmials}/>
        <Block message="Century" number={POfCentruy} toFixedNum={limitDecmials}/>
        <p className="">All we have to decide is what to do with the time that is given us. - Gandalf the Great</p>

        <div className="formTypeDiv ml-auto mr-auto">
          <div className="flex items-center ">
            <p>Limit Decimals: </p><input defaultChecked={true} onChange={(e) => ( e.target.checked ? setLimitDecmials(15) : setLimitDecmials(2) )} type="checkbox"/>
          </div>
        </div>

    </main>
      ) : "Wait one second"}
    </div>
  );
};

export default App;
