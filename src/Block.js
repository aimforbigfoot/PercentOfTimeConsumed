const Block = (props) => {
  return ( 
    <div className="flex flex-wrap justify-around mw9 w-80 ml-auto mr-auto items-center">
      <p>Percent Of {props.message} Consumed: {props.number.toFixed(props.toFixedNum)}</p>
      <progress className=" br-pill w-30 w-100-m ml-auto-m " max="100" value={props.number}></progress>
    </div>
   );
}
 
export default Block;