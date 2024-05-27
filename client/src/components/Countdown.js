import { memo } from "react";
const Countdown = ({unit, number}) => {
  return (
    <>
      <div className="border-solid border-1 border-400 border-round-2xl bg-gray-200 text-center" style={{width: "90px"}}>
        <div className="font-bold col-12">{number}</div>
        <small className="text">{unit}</small>
      </div>
    </>
  );
}

export default memo(Countdown);