import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function ShowFlights({
  imgSrc,
  startTime,
  endTime,
  price,
  setSelectedMenuItem,
}) {
  return (
    <div className="bg-[#f2f0f0] w-full mb-[2px] p-6 m-auto flex flex-row flex-wrap justify-between align-center gap-4 rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0,0.1)]">
      <div className="flex w-[120px] h-[50px] m-2 justify-center">
        <div className="w-full h-full mx-auto relative">
          <img
            src={imgSrc}
            alt=""
            className="absolute h-full w-full inset-0 object-cover"
          />
        </div>
      </div>
      <div className="w-auto flex gap-2 items-center justify-center">
        <div className="p-1 text-right">
          <h5 className="m-0 font-bold text-2xl">{startTime}</h5>
          <p className="m-0">HYD</p>
        </div>
        <div className="p-1 text-center">
          <p className="font-medium">2hr 15min</p>
          <div className="w-[110px] bg-[rgb(73,80,87)] h-[3px] my-[2px]"></div>
          <p className="">Non Stop</p>
        </div>
        <div className="p-1 text-left">
          <h5 className="m-0 font-bold text-2xl">{endTime}</h5>
          <p className="m-0">DEL</p>
        </div>
      </div>
      <div className="m-0 flex flex-col items-center justify-center">
        <h4 className="text-4xl font-normal">{price}</h4>
        <div className="pt-2">
          <PrimaryButton
            name={"select"}
            onClick={() => {
              setSelectedMenuItem("2");
            }}
            borderRadius={"4px"}
            textTransform={"uppercase"}
          />
        </div>
      </div>
    </div>
  );
}
