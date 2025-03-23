import { Checkbox } from "@mui/material";
import React from "react";
import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
export default function Seat({ seatNumber, isSelected, onSelect, disabled }) {
  return (
    <div className="w-10 flex flex-col justify-center">
      <Checkbox
        icon={<ChairRoundedIcon className="text-gray-400" />}
        checkedIcon={<ChairRoundedIcon className="text-[rgb(255,102,196)]" />}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
        checked={isSelected}
        onChange={() => onSelect(seatNumber)}
        disabled={disabled}
      />
      <p className="text-center mt-[-8px] m-0 font-bold text-sm leading-none p-0">
        {seatNumber}
      </p>
    </div>
  );
}
