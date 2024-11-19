import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubLogo from "../assets/icon-github.png";
import LinkedInLogo from "../assets/icon-linkedin.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "transparent",
        paddingTop: 10,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "text.primary",
            fontFamily: "Roboto, sans-serif",
            fontSize: 14,
            fontWeight: 300,
            lineHeight: "140%",
          }}
        >
          Built by{" "}
          <Link
            href="https://bentims.com/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="true"
          >
            Ben Tims
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            href="https://github.com/btims512"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ p: 0 }}
          >
            <Box
              component="img"
              src={GitHubLogo}
              alt="GitHub"
              sx={{ height: 24, width: 24 }}
            />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/benjamintims/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ p: 0 }}
          >
            <Box
              component="img"
              src={LinkedInLogo}
              alt="LinkedIn"
              sx={{ height: 24, width: 24 }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
