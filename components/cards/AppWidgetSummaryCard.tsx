import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, ReactNode } from "react";

interface AppWidgetSummaryCardProps {
  title: string;
  total: ReactNode;
  icon?: ReactNode;
  color?: string;
  sx?: object;
  [key: string]: any;
}

const AppWidgetSummaryCard: FC<AppWidgetSummaryCardProps> = ({
  title,
  total,
  icon,
  sx,
  ...other
}) => {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">{total}</Typography>

        <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
};

export default AppWidgetSummaryCard;
