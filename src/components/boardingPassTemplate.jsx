import QrCode2Icon from "@mui/icons-material/QrCode2";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const BoardingPassTemplate = ({
  setOpen,
  open,
  firstName,
  lastName,
  seat,
  date,
  from,
  to,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate =
    date && typeof date.format === "function"
      ? date.format("DD MMM YYYY")
      : "Invalid Date";

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col bg-[rgb(242,240,240)] rounded-[4px] m-8 max-h-[calc(100%-64px)] overflow-y-auto">
          <div className="flex-auto overflow-y-auto py-5 px-6">
            <h5 className="text-[rgb(237,28,36)] pt-2 pb-8 text-2xl font-normal text-center">
              <b>Boarding Pass Issued</b> (Final Approval Pending)
            </h5>
            <div style={{ transform: "scale(1.5)" }}>
              <div
                className="flex justify-center"
                style={{ transform: "scale(0.6)" }}
              >
                {/* Part 1 */}
                <div className="w-[1000px] border border-solid">
                  <div className="border border-b-black h-15 px-6 flex text-[rgb(35,95,223)] items-center gap-4">
                    <FlightTakeoffIcon fontSize="large" />
                    <h5 className="text-2xl font-bold">
                      Boarding Pass (Web Check In)
                    </h5>
                  </div>

                  <div className="flex justify-between px-6 py-4">
                    <h5 className="text-2xl font-bold">
                      {firstName}/{lastName}
                    </h5>
                    <h5 className="text-2xl font-bold">
                      {from || "Unknown"} T1 To {to || "Unknown"}
                    </h5>
                  </div>

                  <div className="px-8 flex justify-between">
                    <div className="border-2 border-solid px-4 py-1 w-[170px]">
                      <h6 className="font-normal text-base leading-[1.75]">
                        Flight
                      </h6>
                      <h5 className="text-2xl font-bold pb-1 ">6E 6182</h5>
                    </div>
                    <div className="border-2 border-solid px-4 py-1 w-[170px]">
                      <h6 className="font-normal text-base leading-[1.75]">
                        Gate
                      </h6>
                      <h5 className="text-2xl font-bold pb-1 ">A 21</h5>
                    </div>
                    <div className="border-2 border-solid px-4 py-1 w-[170px]">
                      <h6 className="font-normal text-base leading-[1.75]">
                        Boarding Time
                      </h6>
                      <h5 className="text-2xl font-bold pb-1 ">1500</h5>
                    </div>
                    <div className="border-2 border-solid px-4 py-1 w-[170px]">
                      <h6 className="font-normal text-base leading-[1.75]">
                        Boarding
                      </h6>
                      <h5 className="text-2xl font-bold pb-1 ">Zone 1</h5>
                    </div>
                    <div className="border-2 border-solid px-4 py-1 w-[170px]">
                      <h6 className="font-normal text-base leading-[1.75]">
                        Seat
                      </h6>
                      <h5 className="text-2xl font-bold pb-1 ">{seat}</h5>
                    </div>
                  </div>

                  <div className="px-8 py-4 relative flex gap-[24px]">
                    <div className="h-[180px] w-[180px]">
                      <QrCode2Icon sx={{ width: "180px", height: "180px" }} />
                    </div>

                    <table>
                      <tbody>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Date
                          </td>
                          <td className="text-xl font-bold">
                            {formattedDate ? formattedDate : "undefined"}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">Seq</td>
                          <td className="text-xl font-bold">0102</td>
                        </tr>
                      </tbody>
                    </table>

                    <table>
                      <tbody>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Departure
                          </td>
                          <td className="text-xl font-bold">1555 Hrs</td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Services
                          </td>
                          <td className="text-xl font-bold">NIL</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="absolute bottom-[2px] text-center w-full">
                      <p className="text-normal text-base text-center">
                        Gate is subject to change and will close 25 minutes
                        prior to departure.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Part 2 */}
                <div className="w-[360px] border border-solid">
                  <div className="border border-b-black h-15 px-6 flex items-center gap-[8px] text-[rgb(35,95,223)]">
                    <p className="text-xl font-bold">
                      Your Departure Terminal is T1
                    </p>
                    <FlightTakeoffIcon fontSize="medium" />
                  </div>

                  <div className="py-4 px-8">
                    <h6 className="font-bold text-xl">
                      {firstName}/{lastName}
                    </h6>
                    <h6 className="font-bold text-xl">
                      {from || "Unknown"} T1 To {to || "Unknown"}
                    </h6>
                    <table>
                      <tbody>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Flight
                          </td>
                          <td className="text-xl font-bold">6E 6182</td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Date
                          </td>
                          <td className="text-xl font-bold">
                            {formattedDate ? formattedDate : "undefined"}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">PNR</td>
                          <td className="text-xl font-bold">KV4FXW</td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[110px]">
                            Services
                          </td>
                          <td className="text-xl font-bold">NIL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="px-8 gap-6 flex items-center">
                    <div className="h-[100px] w-[100px]">
                      <QrCode2Icon sx={{ width: "100px", height: "100px" }} />
                    </div>

                    <table>
                      <tbody>
                        <tr>
                          <td className="text-xl font-medium w-[60px]">Seat</td>
                          <td className="text-xl font-bold">{seat}</td>
                        </tr>
                        <tr>
                          <td className="text-xl font-medium w-[60px]">Seq</td>
                          <td className="text-xl font-bold">0102</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center p-3 gap-2">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handlePrint} variant="text">
              Print
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BoardingPassTemplate;
