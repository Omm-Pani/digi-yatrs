import { Button, Checkbox } from "@mui/material";
import React from "react";
import Seat from "../ui/Seat";
import PrimaryButton from "../ui/PrimaryButton";
export default function SelectSeat({
  selectedSeats,
  setSelectedSeats,
  setSelectedMenuItem,
}) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length < 2) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  return (
    <div>
      <h4 className="m-0 text-center text-[2.125rem] leading-[1.235] tracking-[0.00735em] text-black/87 font-bold pt-5 font-[roboto,Helvetica,Arial,sans-serif]">
        Select 2 Seats
      </h4>
      <div className="w-full mt-20 flex flex-wrap justify-center gap-6 pb-5 lowercase">
        <PrimaryButton
          name={"Previous"}
          borderRadius={"50px"}
          onClick={() => setSelectedMenuItem("2")}
        />
        <Button
          onClick={() => setSelectedMenuItem("4")}
          variant="contained"
          size="medium"
          disabled={selectedSeats.length < 2}
          sx={{
            background:
              selectedSeats.length < 2
                ? "rgb(178, 186, 187)"
                : "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))",
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "700",
            letterSpacing: "1px",
            padding: "6px 16px",
            boxShadow: "none",
            "&.Mui-disabled": {
              background:
                selectedSeats.length < 2
                  ? "rgb(178, 186, 187)"
                  : "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))", // Ensures background is applied when disabled
              opacity: 1, // Prevents MUI's default reduced opacity
            },
          }}
        >
          Next
        </Button>
      </div>
      <div>
        <div className="mb-[-350px] w-[350px] h-[700px] border border-t border-r border-l rounded-t-[50%] bg-white flex justify-center mx-auto">
          <div className="w-[80%] h-[200px] mt-[100px] bg-[#808b96] clip-path-custom1"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-[600px] h-[500px] mt-[300px] bg-white clip-path-custom2"></div>
          <div className="w-[350px] min-w-[350px] border border-t-0 border-solid bg-white">
            {numbers.map((num) => (
              <div
                className="flex justify-between items-center py-1 px-2"
                key={num}
              >
                <div className="flex">
                  {["A", "B", "C"].map((letter) => {
                    const seatNumber = `${num}${letter}`;
                    return (
                      <Seat
                        key={seatNumber}
                        seatNumber={seatNumber}
                        isSelected={selectedSeats.includes(seatNumber)}
                        onSelect={handleSeatSelect}
                        disabled={
                          !selectedSeats.includes(seatNumber) &&
                          selectedSeats.length >= 2
                        }
                      />
                    );
                  })}
                </div>
                <div className="flex">
                  {["D", "E", "F"].map((letter) => {
                    const seatNumber = `${num}${letter}`;
                    return (
                      <Seat
                        key={seatNumber}
                        seatNumber={seatNumber}
                        isSelected={selectedSeats.includes(seatNumber)}
                        onSelect={handleSeatSelect}
                        disabled={
                          !selectedSeats.includes(seatNumber) &&
                          selectedSeats.length >= 2
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[600px] h-[500px] mt-[300px] bg-white clip-path-custom3"></div>
        </div>
      </div>
    </div>
  );
}
