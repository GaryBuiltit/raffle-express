import React from "react";

function Contestant(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={props.avatar} className="h-24 w-24" />
      <p className="text-white">{props.name}</p>
    </div>
  );
}

export default Contestant;
