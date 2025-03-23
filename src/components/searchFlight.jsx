import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import indianAirports from "../data/indianAirports";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ShowFlights from "../ui/showFlights";

export default function SearchFlight({
  from,
  to,
  date,
  setFrom,
  setTo,
  setDate,
  setSelectedMenuItem,
}) {
  const [showFlights, setShowFlights] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = date.format("DD MMM YYYY");
    console.log("Formatted Date:", formattedDate); // e.g., "17 Mar 2025"

    if (!from || !to || !date) {
      console.log("Please fill in all fields.");
      return;
    }
    setShowFlights(true);
  };

  return (
    <>
      <h1 className="m-0 font-['Roboto','Helvetica','Arial',sans-serif] font-bold text-[2.125rem] leading-[1.235] tracking-[0.00735em] text-center text-white py-10">
        Search Flight
      </h1>
      <div className="bg-[#f2f0f0] w-fit p-10 m-auto flex flex-row flex-wrap justify-center align-center gap-4 rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0,0.1)]">
        <Autocomplete
          id="from-airport"
          onChange={(e, value) => setFrom(value)}
          freeSolo
          options={indianAirports}
          getOptionLabel={(option) => `${option.code} - ${option.city}`}
          renderOption={(props, option) => {
            // Extract the `key` from `props` and pass it directly to the `<li>` element
            const { key, ...restProps } = props;
            return (
              <li
                key={key} // Pass the key directly here
                {...restProps} // Spread the remaining props
                style={{
                  backgroundColor: "#f2f0f0",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    padding: "10px",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <FlightTakeoffIcon sx={{ width: "20%", marginTop: "6px" }} />
                  <Box sx={{ width: "80%" }}>
                    <Typography fontWeight="bold">{`${option.code} - ${option.city}`}</Typography>
                    <Typography variant="body2">{option.name}</Typography>
                  </Box>
                </Box>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="From" sx={{ fontWeight: "700" }} />
          )}
          sx={{
            minWidth: 260,
          }}
        />
        <div className="flex items-center">
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
              p: "12px",
            }}
          >
            <SwapHorizIcon sx={{ color: "#FF66C4" }} />
          </IconButton>
        </div>
        <Autocomplete
          id="to-airport"
          onChange={(e, value) => setTo(value)}
          freeSolo
          options={indianAirports}
          getOptionLabel={(option) => `${option.code} - ${option.city}`}
          renderOption={(props, option) => {
            const { key, ...restProps } = props;
            return (
              <li
                key={key}
                {...restProps}
                style={{
                  backgroundColor: "#f2f0f0",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    padding: "10px",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <FlightTakeoffIcon sx={{ width: "20%", marginTop: "6px" }} />
                  <Box sx={{ width: "80%" }}>
                    <Typography fontWeight="bold">{`${option.code} - ${option.city}`}</Typography>
                    <Typography variant="body2">{option.name}</Typography>
                  </Box>
                </Box>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="To" className="font-bold" />
          )}
          sx={{
            minWidth: 260,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box components={["DatePicker"]}>
            <DatePicker
              label="Date"
              onChange={(newDate) => setDate(newDate)}
              sx={{ minWidth: 280 }}
            />
          </Box>
        </LocalizationProvider>
        <div className="flex justify-center">
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #aa53f1, #d9297c)",
              height: "54px",
              borderRadius: "10px",
              fontWeight: "700",
            }}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      {showFlights && (
        <div className="m-auto p-[10px]">
          <ShowFlights
            imgSrc={
              "https://vizuara-dot-ai.vercel.app/_next/image?url=https%3A%2F%2Fwww.skyscanner.net%2Fimages%2Fairlines%2Fsmall%2F0S.png&w=1920&q=75"
            }
            price={"₹ 7,350"}
            startTime={"20:08"}
            endTime={"22:08"}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <ShowFlights
            imgSrc={
              "https://vizuara-dot-ai.vercel.app/_next/image?url=https%3A%2F%2Fwww.skyscanner.net%2Fimages%2Fairlines%2Fsmall%2F49.png&w=1920&q=75"
            }
            price={"₹ 7,650"}
            startTime={"20:08"}
            endTime={"23:08"}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <ShowFlights
            imgSrc={
              "https://vizuara-dot-ai.vercel.app/_next/image?url=https%3A%2F%2Fwww.skyscanner.net%2Fimages%2Fairlines%2Fsmall%2FIK.png&w=1920&q=75"
            }
            price={"₹ 8,350"}
            startTime={"17:08"}
            endTime={"19:08"}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <ShowFlights
            imgSrc={
              "https://vizuara-dot-ai.vercel.app/_next/image?url=https%3A%2F%2Fwww.skyscanner.net%2Fimages%2Fairlines%2Fsmall%2FC).png&w=1920&q=75"
            }
            price={"₹ 8,180"}
            startTime={"14:08"}
            endTime={"16:08"}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </div>
      )}
    </>
  );
}
