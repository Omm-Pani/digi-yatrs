import { Button } from "@mui/material";
import React from "react";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import PrimaryButton from "../ui/PrimaryButton";
export default function BoardingPassPage() {
  return (
    <>
      <h1 className="m-0 pt-20 pb-12 font-['Roboto','Helvetica','Arial',sans-serif] font-bold text-[2.125rem] leading-[1.235] tracking-[0.00735em] text-center text-white">
        Collect Your Boarding Pass
      </h1>
      <div>
        <div className="flex flex-col items-center pl-54">
          <Button
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
          <Button
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

        <div className="flex justify-center pt-18">
          <PrimaryButton name={"Check In"} borderRadius={"4px"} />
        </div>
        <div className="flex justify-center py-20">
          <PrimaryButton name={"Previous"} borderRadius={"50px"} />
        </div>
      </div>
    </>
  );
}
