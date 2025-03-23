import { Box, Button } from "@mui/material";
import React from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export default function WebCamButton() {
  return (
    <>
      <Box sx={{ padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              "&:hover": { backgroundColor: "rgb(204, 222, 253)" },
              padding: "16px 40px",
              width: "100%",
              borderRadius: "16px",
              bgcolor: "rgb(232, 240, 254)",
            }}
          >
            <Box
              sx={{
                fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
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
    </>
  );
}
