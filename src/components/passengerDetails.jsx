import React, { useEffect, useRef, useState } from "react";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PrimaryButton from "../ui/PrimaryButton";

const videoStyles = {
  clear: "both",
  display: "block",
  background: "black",
  width: "100%",
  objectFit: "cover",
  transform: "scaleX(-1)",
};

export default function PassengerDetails({
  gallery1,
  setGallery1,
  gallery2,
  setGallery2,
  firstName1,
  setFirstName1,
  firstName2,
  setFirstName2,
  lastName1,
  lastName2,
  setLastName1,
  setLastName2,
  setIsDetailsSubmitted,
  training,
  trainedModel,
  setSelectedMenuItem,
}) {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [isWebcamActive1, setIsWebcamActive1] = useState(false);
  const [isWebcamActive2, setIsWebcamActive2] = useState(false);
  const [captureCompleted1, setCaptureCompleted1] = useState(false);
  const [captureCompleted2, setCaptureCompleted2] = useState(false);
  const [isHolding1, setIsHolding1] = useState(false);
  const [isHolding2, setIsHolding2] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const intervalRef1 = useRef(null);
  const intervalRef2 = useRef(null);
  const progressIntervalRef1 = useRef(null);
  const progressIntervalRef2 = useRef(null);
  const [isDetailsAdded, setIsDetailsAdded] = useState(false);

  useEffect(() => {
    if (gallery1.length && gallery2.length > 0) {
      setIsDetailsAdded(true);
    }
  }, [gallery1, gallery2]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef1.current);
      clearInterval(progressIntervalRef1.current);
      clearInterval(intervalRef2.current);
      clearInterval(progressIntervalRef2.current);
    };
  }, []);

  const startWebcam = async (videoRef) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const stopWebcam = (videoRef) => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage1 = () => {
    console.log("img 1 captured");
    const video = videoRef1.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      name: firstName1 || "Unknown",
    };

    setGallery1((prevGallery) => [...prevGallery, newImage]);
  };

  const captureImage2 = () => {
    const video = videoRef2.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      name: firstName2 || "Unknown",
    };

    setGallery2((prevGallery) => [...prevGallery, newImage]);
  };

  const startCapture1 = () => {
    if (captureCompleted1 || progress1 >= 100) return;

    setIsHolding1(true);
    // Start image capture interval
    intervalRef1.current = setInterval(captureImage1, 50);
    // Start progress interval

    progressIntervalRef1.current = setInterval(() => {
      setProgress1((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef1.current);
          clearInterval(intervalRef1.current);
          setCaptureCompleted1(true);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 80);
  };

  const pauseCapture1 = () => {
    setIsHolding1(false);
    clearInterval(intervalRef1.current);
    clearInterval(progressIntervalRef1.current);
  };

  const handleMouseLeave1 = () => {
    if (isHolding1) {
      setIsHolding1(false);
      clearInterval(intervalRef1.current);
      clearInterval(progressIntervalRef1.current);
    }
  };

  const startCapture2 = () => {
    if (captureCompleted2 || progress2 >= 100) return;

    setIsHolding2(true);
    intervalRef2.current = setInterval(captureImage2, 50);
    // Start progress interval
    progressIntervalRef2.current = setInterval(() => {
      setProgress2((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef2.current);
          clearInterval(intervalRef2.current);
          setCaptureCompleted2(true);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 80);
  };

  const pauseCapture2 = () => {
    if (!isHolding2) return;

    setIsHolding2(false);
    clearInterval(intervalRef2.current);
    clearInterval(progressIntervalRef2.current);
  };

  const retake1 = () => {
    setCaptureCompleted1(false);
    setProgress1(0);
    setGallery1([]);
  };

  const retake2 = () => {
    setCaptureCompleted2(false);
    setProgress2(0);
    setGallery2([]);
  };

  useEffect(() => {
    if (isWebcamActive1) {
      startWebcam(videoRef1);
      stopWebcam(videoRef2);
      setIsWebcamActive2(false);
    }

    return () => {
      stopWebcam(videoRef1);
    };
  }, [isWebcamActive1]);

  useEffect(() => {
    if (isWebcamActive2) {
      startWebcam(videoRef2);
      stopWebcam(videoRef1);
      setIsWebcamActive1(false);
    }

    return () => {
      stopWebcam(videoRef2);
    };
  }, [isWebcamActive2]);

  return (
    <div>
      <div className="mx-auto rounded-[16px] p-5 shadow-md bg-gray-100 w-[400px]">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 text-white text-[1.25rem] leading-none rounded-full overflow-hidden select-none m-2 bg-[rgb(156,39,176)]">
            <RememberMeIcon />
          </div>
          <h1 className="m-0 font-['Roboto','Helvetica','Arial',sans-serif] font-normal text-2xl leading-[1.334] tracking-normal pb-5">
            Enter Details
          </h1>

          <div className="mt-2">
            {/* Person 1 */}
            <div className="mt-4 self-start">
              <h1 className="m-0 font-['Roboto','Helvetica','Arial',sans-serif] font-normal text-[1.5rem] leading-[1.334] tracking-normal pb-5">
                Person 1
              </h1>
              <Box sx={{ width: "100%" }}>
                <Grid2
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Grid2 size={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name*"
                      variant="outlined"
                      onChange={(e) => setFirstName1(e.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name*"
                      variant="outlined"
                      onChange={(e) => setLastName1(e.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      id="outlined-basic"
                      label="Email Address*"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <Box
                      sx={{
                        width: "100%",
                        margin: "24px auto",
                        border: "1px solid rgb(203,213,224)",
                        borderRadius: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "6px",
                          }}
                          aria-label="Open the webcam, click and hold the button, then rotate your face from left to right and back to left for accurate results."
                        >
                          <Typography
                            variant="p"
                            component="p"
                            sx={{
                              margin: 0,
                              fontFamily:
                                "'Roboto','Helvetica','Arial',sans-serif",
                              fontSize: "0.875rem",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              letterSpacing: "0.01071em",
                            }}
                          >
                            Capture your face from different angles
                          </Typography>
                          <InfoIcon fontSize="small" />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          aspectRatio: "16 / 9",
                          position: "relative",
                          width: 150,
                          mx: "auto",
                          overflow: "hidden",
                          borderRadius: 2,
                          boxShadow:
                            "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
                          mb: 1,
                        }}
                      >
                        <img
                          src="https://vizuara-dot-ai.vercel.app/_next/image?url=%2Fimages%2Fdigiyatra%2Frotateface.gif&w=1920&q=75"
                          alt="alt"
                          loading="lazy"
                          className="absolute h-full w-full inset-0 transparent object-cover "
                        />
                      </Box>

                      {!isWebcamActive1 ? (
                        <Box sx={{ padding: "16px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              onClick={() => setIsWebcamActive1(true)}
                              variant="contained"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "rgb(204, 222, 253)",
                                },
                                padding: "16px 40px",
                                width: "100%",
                                borderRadius: "16px",
                                bgcolor: "rgb(232, 240, 254)",
                              }}
                            >
                              <Box
                                sx={{
                                  fontFamily:
                                    "'Roboto','Helvetica','Arial',sans-serif",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  userSelect: "none",
                                  color: "rgb(27, 104, 210)",
                                }}
                              >
                                <VideocamOutlinedIcon />
                                <p>WEBCAM</p>
                              </Box>
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            transition: "1000ms",
                            maxWidth: "500px !important",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              background: "rgb(232, 240, 254)",
                              color: "rgb(27, 104, 210)",
                              padding: "16px",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "8px",
                                }}
                              >
                                <Typography>Webcam</Typography>
                                <CloseIcon
                                  onClick={() => {
                                    setIsWebcamActive1(false);
                                    stopWebcam(videoRef1);
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <video
                                ref={videoRef1}
                                autoPlay
                                style={videoStyles}
                              ></video>
                              {captureCompleted1 ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      margin: "8px 20px 8px",
                                      bgcolor: "green",
                                      "&:hover": { bgcolor: "darkgreen" },
                                    }}
                                    disabled
                                  >
                                    Completed
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      margin: "8px 20px 8px ",
                                      bgcolor: "red",
                                      "&:hover": { bgcolor: "darkred" },
                                    }}
                                    onClick={retake1}
                                  >
                                    Retake
                                  </Button>
                                </Box>
                              ) : (
                                <Button
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    margin: "8px 0 8px auto",
                                  }}
                                  onMouseDown={startCapture1}
                                  onMouseUp={pauseCapture1}
                                  onMouseLeave={handleMouseLeave1}
                                >
                                  Hold to capture
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      )}

                      <Box
                        sx={{
                          border: "1px solid rgb(213, 219, 219)",
                          padding: "4px",
                          borderRadius: "16px",
                          ml: "16px",
                          mr: "16px",
                          mb: "8px",
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={progress1}
                          sx={{
                            backgroundColor: "rgb(238, 238, 238)",
                            height: "6px",
                            borderRadius: "6px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          maxHeight: "80px",
                          overflow: "hidden",
                        }}
                      >
                        <div className="relative h-full overflow-hidden">
                          <Box
                            sx={{
                              display: "flex",
                              marginLeft: "4px",
                              minWidth: "50%",
                              width: "350px",
                              mb: "10px",
                              maxWidth: "100% !important",
                              gap: "8px",
                              paddingY: "8px",
                              paddingX: "14px",
                              overflowX: "auto",
                            }}
                          >
                            {gallery1.map((image) => (
                              <div
                                key={image.id}
                                className="flex flex-col justify-center items-center min-w-[48px] max-w-[49px] rounded-[16px]"
                              >
                                <div className="relative w-full aspect-[1/1] mx-auto overflow-hidden rounded-[8px]">
                                  <img
                                    src={image.url}
                                    alt="img1"
                                    loading="lazy"
                                    className="absolute h-full w-full inset-0 object-cover text-transparent"
                                  />
                                  <div className=" hover:opacity-100 absolute inset-0 z-10 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out">
                                    <Button
                                      sx={{
                                        padding: "8px",
                                        borderRadius: "50%",
                                        overflow: "visible",
                                        flex: "0 0 auto",
                                        textAlign: "center",
                                      }}
                                    >
                                      <DeleteIcon
                                        aria-hidden="true"
                                        focusable="false"
                                        sx={{
                                          userSelect: "none",
                                          width: "1em",
                                          height: "1em",
                                          display: "inline-block",
                                          fill: "currentColor",
                                          flexShrink: 0,
                                          fontSize: "2.1875rem",
                                          color: "rgb(250, 60, 41)",
                                          transition:
                                            "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Box>
                          <div id="XscrollBAR"></div>
                        </div>
                      </Box>
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </div>

            {/* Person 2 */}
            <div className="mt-4 self-start">
              <h1 className="m-0 font-['Roboto','Helvetica','Arial',sans-serif] font-normal text-[1.5rem] leading-[1.334] tracking-normal pb-5">
                Person 2
              </h1>
              <Box sx={{ width: "100%" }}>
                <Grid2
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Grid2 size={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name*"
                      variant="outlined"
                      onChange={(e) => setFirstName2(e.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name*"
                      variant="outlined"
                      onChange={(e) => setLastName2(e.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      id="outlined-basic"
                      label="Email Address*"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <Box
                      sx={{
                        width: "100%",
                        margin: "24px auto",
                        border: "1px solid rgb(203,213,224)",
                        borderRadius: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "6px",
                          }}
                          aria-label="Open the webcam, click and hold the button, then rotate your face from left to right and back to left for accurate results."
                        >
                          <Typography
                            variant="p"
                            component="p"
                            sx={{
                              margin: 0,
                              fontFamily:
                                "'Roboto','Helvetica','Arial',sans-serif",
                              fontSize: "0.875rem",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              letterSpacing: "0.01071em",
                            }}
                          >
                            Capture your face from different angles
                          </Typography>
                          <InfoIcon fontSize="small" />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          aspectRatio: "16 / 9",
                          position: "relative",
                          width: 150,
                          mx: "auto",
                          overflow: "hidden",
                          borderRadius: 2,
                          boxShadow:
                            "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
                          mb: 1,
                        }}
                      >
                        <img
                          src="https://vizuara-dot-ai.vercel.app/_next/image?url=%2Fimages%2Fdigiyatra%2Frotateface.gif&w=1920&q=75"
                          alt="alt"
                          loading="lazy"
                          className="absolute h-full w-full inset-0 transparent object-cover "
                        />
                      </Box>

                      {!isWebcamActive2 ? (
                        <Box sx={{ padding: "16px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              onClick={() => setIsWebcamActive2(true)}
                              variant="contained"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "rgb(204, 222, 253)",
                                },
                                padding: "16px 40px",
                                width: "100%",
                                borderRadius: "16px",
                                bgcolor: "rgb(232, 240, 254)",
                              }}
                            >
                              <Box
                                sx={{
                                  fontFamily:
                                    "'Roboto','Helvetica','Arial',sans-serif",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  userSelect: "none",
                                  color: "rgb(27, 104, 210)",
                                }}
                              >
                                <VideocamOutlinedIcon />
                                <p>WEBCAM</p>
                              </Box>
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            transition: "1000ms",
                            maxWidth: "500px !important",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              background: "rgb(232, 240, 254)",
                              color: "rgb(27, 104, 210)",
                              padding: "16px",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "8px",
                                }}
                              >
                                <Typography>Webcam</Typography>
                                <CloseIcon
                                  onClick={() => {
                                    setIsWebcamActive2(false);
                                    stopWebcam(videoRef2);
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <video
                                ref={videoRef2}
                                autoPlay
                                style={videoStyles}
                              ></video>
                              {captureCompleted2 ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      margin: "8px 20px 8px",
                                      bgcolor: "green",
                                      "&:hover": { bgcolor: "darkgreen" },
                                    }}
                                    disabled
                                  >
                                    Completed
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      margin: "8px 20px 8px",
                                      bgcolor: "red",
                                      "&:hover": { bgcolor: "darkred" },
                                    }}
                                    onClick={retake2}
                                  >
                                    Retake
                                  </Button>
                                </Box>
                              ) : (
                                <Button
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    margin: "8px 0 8px auto",
                                  }}
                                  onMouseDown={startCapture2}
                                  onMouseUp={pauseCapture2}
                                  onMouseLeave={pauseCapture2}
                                >
                                  Hold to capture
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      )}

                      <Box
                        sx={{
                          border: "1px solid rgb(213, 219, 219)",
                          padding: "4px",
                          borderRadius: "16px",
                          ml: "16px",
                          mr: "16px",
                          mb: "8px",
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={progress2}
                          sx={{
                            backgroundColor: "rgb(238, 238, 238)",
                            height: "6px",
                            borderRadius: "6px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          maxHeight: "80px",
                          overflow: "hidden",
                        }}
                      >
                        <div className="relative h-full">
                          <Box
                            sx={{
                              display: "flex",
                              marginLeft: "4px",
                              minWidth: "50%",
                              width: "344px",
                              mb: "10px",
                              maxWidth: "100% !important",
                              gap: "8px",
                              paddingY: "8px",
                              paddingX: "14px",
                              overflowX: "auto",
                            }}
                          >
                            {gallery2.map((image) => (
                              <div
                                key={image.id}
                                className="flex flex-col justify-center items-center min-w-[48px] max-w-[49px] rounded-[16px]"
                              >
                                <div className="relative w-full aspect-[1/1] mx-auto overflow-hidden rounded-[8px]">
                                  <img
                                    src={image.url}
                                    alt="img2"
                                    loading="lazy"
                                    className="absolute h-full w-full inset-0 object-cover text-transparent"
                                  />
                                  <div className=" hover:opacity-100 absolute inset-0 z-10 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out">
                                    <Button
                                      sx={{
                                        padding: "8px",
                                        borderRadius: "50%",
                                        overflow: "visible",
                                        flex: "0 0 auto",
                                        textAlign: "center",
                                      }}
                                    >
                                      <DeleteIcon
                                        aria-hidden="true"
                                        focusable="false"
                                        sx={{
                                          userSelect: "none",
                                          width: "1em",
                                          height: "1em",
                                          display: "inline-block",
                                          fill: "currentColor",
                                          flexShrink: 0,
                                          fontSize: "2.1875rem",
                                          color: "rgb(250, 60, 41)",
                                          transition:
                                            "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Box>
                          <div id="XscrollBAR"></div>
                        </div>
                      </Box>
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </div>

            {/* <Button
              onClick={() => setIsDetailsSubmitted(true)}
              variant="contained"
              disabled={!isDetailsAdded}
              loading={training}
              sx={{
                width: "100%",
                margin: "24px 0 16px",
                padding: "12px 16px",
                color: !isDetailsAdded ? "" : "white !important",
                background: isDetailsAdded
                  ? "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))"
                  : "",
              }}
            >
              Submit
            </Button> */}
            <Button
              onClick={() => setIsDetailsSubmitted(true)}
              variant="contained"
              disabled={!isDetailsAdded || training}
              sx={{
                width: "100%",
                margin: "24px 0 16px",
                padding: "12px 16px",
                color: !isDetailsAdded || training ? "" : "white !important",
                background:
                  !isDetailsAdded || training
                    ? ""
                    : "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))",
                position: "relative",
              }}
            >
              {training ? (
                <>
                  Training Model...
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "inherit",
                      position: "absolute",
                      right: "16px",
                    }}
                  />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 flex flex-wrap justify-center gap-6 pb-5">
        <PrimaryButton name={"Previous"} borderRadius={"50px"} />
        <Button
          onClick={() => setSelectedMenuItem("3")}
          variant="contained"
          size="medium"
          disabled={trainedModel === null}
          sx={{
            background:
              trainedModel !== null
                ? "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))"
                : "rgb(178, 186, 187)",
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "700",
            letterSpacing: "1px",
            padding: "6px 16px",
            transition: "background 0.3s, transform 0.2s",
            "&:hover": {
              background:
                "linear-gradient(to right, rgb(217, 41, 124), rgb(170, 83, 241))",
              transform: "scale(1.05)",
            },
            "&.Mui-disabled": {
              backgroundColor:
                trainedModel === null
                  ? "rgb(178, 186, 187)"
                  : "linear-gradient(to right, rgb(81, 112, 255), rgb(255, 102, 196))", // Ensures background is applied when disabled
              opacity: 1, // Prevents MUI's default reduced opacity
            },
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
