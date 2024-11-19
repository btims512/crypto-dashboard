import React from "react";
import { Typography, Button, Box } from "@mui/material";

const Title = ({ onRefresh }) => {
  return (
    <Box
      className="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
        flexDirection: "row",
        py: 5,
        textAlign: "center",
        "@media (max-width: 429px)": {
          justifyContent: "center",
        },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 300 }}>
        Crypto Dashboard
      </Typography>
      <Button variant="contained" onClick={onRefresh}>
        Refresh
      </Button>
    </Box>
  );
};

export default Title;
