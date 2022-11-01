import { useId } from "react";
 
export default function UseIdExample(props){
  const uid = useId();
  return (
    <>
      <label htmlFor={`${uid}-name`}> Name </label>
      <input id={`${uid}-name`} />
      <div> Generated unique user input id: {`${uid}-name`} </div>
 
      <label htmlFor={`${uid}-age`}> Age </label>
      <input id={`${uid}-age`} />
      <div>Generated unique age input id: {`${uid}-age`}</div>
    </>
  );
};
 