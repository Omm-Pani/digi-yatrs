import { Button } from "@mui/material";
import React from "react";

export default function PrimaryButton({
  name,
  borderRadius,
  onClick,
  textTransform,
}) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size="medium"
      sx={{
        "&:hover": {
          background:
            "linear-gradient(to right, rgb(217, 41, 124), rgb(170, 83, 241))",
          transform: "scale(1.05)",
          boxShadow: "none",
        },
        background:
          "linear-gradient(to right, rgb(170, 83, 241), rgb(217, 41, 124))",
        borderRadius: borderRadius || "",
        textTransform: textTransform || "none",
        fontWeight: "700",
        letterSpacing: "1px",
        padding: "6px 16px",
        boxShadow: "none",
        transition: "background 0.3s, transform 0.2s",
      }}
    >
      {name}
    </Button>
  );
}
