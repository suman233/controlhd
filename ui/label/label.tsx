/* eslint-disable react/require-default-props */
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { ReactNode, forwardRef } from "react";
import { StyledLabel } from "./styles";

interface LabelProps {
  children: ReactNode;
  color?: string;
  variant?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      children,
      color = "default",
      variant = "soft",
      startIcon,
      endIcon,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      "& svg, img": { width: 1, height: 1, objectFit: "cover" }
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { paddingLeft: 0.75 }),
          ...(endIcon && { paddingRight: 0.75 }),
          ...sx
        }}
        theme={theme}
        {...other}
      >
        {startIcon && (
          <Box sx={{ marginRight: 0.75, ...iconStyles }}> {startIcon} </Box>
        )}

        {children}

        {endIcon && (
          <Box sx={{ marginLeft: 0.75, ...iconStyles }}> {endIcon} </Box>
        )}
      </StyledLabel>
    );
  }
);

export default Label;
