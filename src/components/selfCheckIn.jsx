import React, { useEffect, useRef, useState, useCallback } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import * as faceapi from "face-api.js";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function SelfCheckIn({ trainedModel }) {
  const videoRef = useRef(null);
  const detectionInterval = useRef(null);
  const [open, setOpen] = useState(false);
  const [verifiedName, setVerifiedName] = useState("");

  const [recognitionResults, setRecognitionResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setVerifiedName(""); // Reset name when starting new verification
  };
  const handleClose = useCallback(() => {
    setOpen(false);
    setStatusMessage("");
    setIsProcessing(false);
    clearInterval(detectionInterval.current);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }, []);

  // Continuous face detection
  const startDetectionLoop = useCallback(async () => {
    if (!trainedModel) {
      setStatusMessage("Model not loaded");
      handleClose();
      return;
    }

    try {
      detectionInterval.current = setInterval(async () => {
        try {
          const detections = await faceapi
            .detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();

          if (detections.length === 0) {
            setStatusMessage("Please face the camera...");
            return;
          }

          const results = detections.map((d) => ({
            name: trainedModel.findBestMatch(d.descriptor).label,
            distance: trainedModel.findBestMatch(d.descriptor).distance,
          }));

          // Update verified name if we get valid results
          if (results.length > 0 && results[0].distance < 0.6) {
            clearInterval(detectionInterval.current);
            setVerifiedName(results[0].name);
            setStatusMessage(`Verified: ${results[0].name}`);
            setTimeout(handleClose, 2000);
          }
        } catch (error) {
          console.error("Detection error:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Detection setup error:", error);
      setStatusMessage("Detection failed");
      clearInterval(detectionInterval.current);
    }
  }, [trainedModel, handleClose]);

  // Initialize video stream when modal opens
  useEffect(() => {
    const initializeVideo = async () => {
      try {
        setIsProcessing(true);
        setStatusMessage("Initializing camera...");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 720, height: 560 },
          audio: false,
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;

        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(resolve);
          };
        });

        setStatusMessage("Scanning for faces...");
        startDetectionLoop();
      } catch (error) {
        console.error("Camera error:", error);
        setStatusMessage("Camera access denied");
        handleClose();
      } finally {
        setIsProcessing(false);
      }
    };

    if (open) initializeVideo();

    return () => clearInterval(detectionInterval.current);
  }, [open, handleClose, startDetectionLoop]);

  return (
    <div>
      <div>
        <h1 className="m-0 font-['Roboto','Helvetica','Arial',sans-serif] font-bold text-[2.125rem] leading-[1.235] tracking-[0.00735em] text-center text-white py-10">
          One Last Step To Fly
        </h1>
        <div className="flex justify-center gap-2 pt-10 pb-3">
          <div className="w-[300px]">
            <div className="flex font-normal text-sm py-[6px] px-4 rounded-[4px] bg-[rgb(237,247,237)] text-[rgb(30,70,32)]">
              <CheckCircleOutlinedIcon className="text-[rgb(46,125,50)] mr-3" />
              <div className="py-2">{verifiedName || ""}, Verified!</div>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(to right bottom, rgb(139, 92, 246), rgb(255, 77, 148))",
              borderRadius: "4px",
              padding: "6px 16px",
              gap: "8px",
            }}
          >
            <AirplaneTicketOutlinedIcon />
            BOARDING PASS
          </Button>
        </div>

        <div className="w-full flex justify-center py-20">
          <PrimaryButton
            name={"Verify passenger"}
            onClick={handleOpen}
            disabled={open || isProcessing}
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col bg-[rgb(242,240,240)] rounded-[4px] m-8 max-w-[900px] w-[calc(100%-64px)]">
          <div className="px-5 py-4">
            <Box
              sx={{
                background: "black",
                borderRadius: "20px",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: "white",
                  padding: "8px",
                  fontSize: "1.2rem",
                }}
              >
                Identity Verification
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "560px",
                  position: "relative",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full bg-black rounded-lg"
                />

                {(statusMessage || isProcessing) && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <div className="text-lg font-semibold mb-2">
                      {statusMessage}
                    </div>
                    {isProcessing && (
                      <div className="animate-pulse">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </div>

          <div className="flex justify-between items-center p-3 border-t">
            <Typography variant="body2" color="textSecondary">
              {recognitionResults[0]?.name &&
                `Recognized: ${recognitionResults[0].name}`}
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
