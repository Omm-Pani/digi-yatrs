import { Button } from "@mui/material";
import React, { useState } from "react";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import PrimaryButton from "../ui/PrimaryButton";
import BoardingPassTemplate from "./boardingPassTemplate";
export default function BoardingPassPage({
  setSelectedMenuItem,
  firstName1,
  lastName1,
  firstName2,
  lastName2,
  date,
  from,
  to,
  selectedSeats,
}) {
  const [person1BoardingPass, setPerson1BoardingPass] = useState(false);
  const [person2BoardingPass, setPerson2BoardingPass] = useState(false);
  const seat1 = selectedSeats?.[0] || "N/A";
  const seat2 = selectedSeats?.[1] || "N/A";

  return (
    <>
      <h1 className="m-0 pt-20 pb-12 font-['Roboto','Helvetica','Arial',sans-serif] font-bold text-[2.125rem] leading-[1.235] tracking-[0.00735em] text-center text-white">
        Collect Your Boarding Pass
      </h1>
      <div>
        <div className="flex flex-col items-center ">
          <div className="flex justify-center items-center pl-30 gap-3">
            <h4 className="font-bold text-lg">{firstName1}</h4>
            <Button
              onClick={() => setPerson1BoardingPass(true)}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(to right bottom, rgb(139, 92, 246), rgb(255, 77, 148))",
                borderRadius: "4px",
                fontWeight: "500",
                padding: "6px 16px",
                color: "black",
                gap: "8px",
                margin: "8px",
              }}
            >
              <AirplaneTicketOutlinedIcon />
              BOARDING PASS
            </Button>
          </div>
          <div className="flex justify-center items-center pl-30 gap-3">
            <h4 className="font-bold text-lg">{firstName2}</h4>
            <Button
              onClick={() => setPerson2BoardingPass(true)}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(to right bottom, rgb(139, 92, 246), rgb(255, 77, 148))",
                borderRadius: "4px",
                fontWeight: "500",
                padding: "6px 16px",
                color: "black",
                gap: "8px",
                margin: "8px",
              }}
            >
              <AirplaneTicketOutlinedIcon />
              BOARDING PASS
            </Button>
          </div>
        </div>

        <div className="flex justify-center pt-18">
          <PrimaryButton
            name={"Check In"}
            borderRadius={"4px"}
            onClick={() => setSelectedMenuItem("5")}
          />
        </div>
        <div className="flex justify-center py-20">
          <PrimaryButton
            name={"Previous"}
            borderRadius={"50px"}
            onClick={() => setSelectedMenuItem("3")}
          />
        </div>
      </div>

      <BoardingPassTemplate
        open={person1BoardingPass}
        setOpen={setPerson1BoardingPass}
        firstName={firstName1}
        lastName={lastName1}
        seat={seat1}
        date={date}
        from={from}
        to={to}
      />
      <BoardingPassTemplate
        open={person2BoardingPass}
        setOpen={setPerson2BoardingPass}
        firstName={firstName2}
        lastName={lastName2}
        seat={seat2}
        date={date}
        from={from}
        to={to}
      />
    </>
  );
}
