import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomInput = forwardRef((props: TextFieldProps, ref: any) => {
  return <TextField {...props} ref={ref} />;
});

export default CustomInput;
