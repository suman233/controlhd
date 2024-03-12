/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable mui-path-imports/mui-path-imports */
import { PaletteMode, alpha, outlinedInputClasses } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { shape } from "@mui/system";
import { base, customPalette, grey } from "./_muiPalette";
import { customShadows } from "./custom-shadows";
import { typography } from "./typography";

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const palette = customPalette(mode);

  return {
    palette,
    typography,
    customShadows: customShadows(),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            boxSizing: "border-box"
          },
          html: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
            WebkitOverflowScrolling: "touch"
          },
          body: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%"
          },
          "#root": {
            width: "100%",
            height: "100%"
          },
          input: {
            "&[type=number]": {
              MozAppearance: "textfield",
              "&::-webkit-outer-spin-button": {
                margin: 0,
                WebkitAppearance: "none"
              },
              "&::-webkit-inner-spin-button": {
                margin: 0,
                WebkitAppearance: "none"
              }
            }
          },
          img: {
            maxWidth: "100%",
            display: "inline-block",
            verticalAlign: "bottom"
          }
        }
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(grey[900], 0.8)
          },
          invisible: {
            background: "transparent"
          }
        }
      },

      MuiButton: {
        styleOverrides: {
          containedInherit: {
            color: base.common.white,
            backgroundColor: base.grey[800],
            "&:hover": {
              color: base.common.white,
              backgroundColor: base.grey[800]
            }
          },
          sizeLarge: {
            minHeight: 48
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              boxShadow: theme.customShadows?.card,
              borderRadius: Number(shape.borderRadius) * 2,
              position: "relative",
              zIndex: 0 // Fix Safari overflow: hidden with border radius
            };
          }
        }
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: "h6" },
          subheaderTypographyProps: { variant: "body2" }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: alpha(base.grey[500], 0.24)
            }
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0
        }
      },
      // MuiTableCell: {
      //   styleOverrides: {
      //     head: {
      //       color: palette.text.secondary,
      //       backgroundColor: palette.background.neutral
      //     }
      //   }
      // },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: base.grey[800]
          },
          arrow: {
            color: base.grey[800]
          }
        }
      },
      // MuiTypography: {
      //   styleOverrides: {
      //     paragraph: {
      //       // marginBottom: spacing(2)
      //     },
      //     gutterBottom: {
      //       marginBottom: spacing(1)
      //     }
      //   }
      // },
      MuiMenuItem: {
        // styleOverrides: {
        //   root: {
        //     ...typography.body2
        //   }
        // }
      }
    }
    // shadows: shadows()
  };
};
