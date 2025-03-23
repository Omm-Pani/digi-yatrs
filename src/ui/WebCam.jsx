import React from "react";

export default function WebCam() {
  return (
    <div>
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
              <CloseIcon />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <video
              ref={videoRef1}
              autoPlay
              style={{
                clear: "both",
                display: "block",
                background: "black",
                width: "100%",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            ></video>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                margin: "8px 0 8px auto",
              }}
            >
              Hold to capture
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
