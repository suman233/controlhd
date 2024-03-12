export interface CustomShadowsType {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  card: string;
  dropdown: string;
  dialog: string;
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    //add theme object extends
    customShadows: CustomShadowsType;
  }
  interface ThemeOptions {
    //all the theme interface options also needs to be here
    customShadows: Theme["customShadows"];
  }

  interface Palette {
    //add palate object extends
  }
  interface PaletteOptions {
    //all the palette interface options also needs to be here
  }
  interface TypeBackground {
    //add background over here
  }
}
