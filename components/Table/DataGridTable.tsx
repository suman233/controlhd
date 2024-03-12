import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

export default function DataGridTable(props: DataGridProps) {
  return (
    <Box style={{ height: "65vh", width: "100%",  }}>
      <DataGrid {...props} />
    </Box>
  );
}
