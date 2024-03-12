import { HEADER, NAV } from "@/config/constants";
import { useResponsive } from "@/hooks/utils/use-responsive";
import Box from "@mui/material/Box";
import React from "react";

interface MainProps {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  other?: any; // Adjust the type according to your needs
}

const SPACING = 8;

const Main: React.FC<MainProps> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive("up", "lg") as boolean; // Adjust the type according to your needs

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`
        }),
        ...sx
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default Main;
