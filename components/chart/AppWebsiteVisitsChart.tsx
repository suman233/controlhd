import useChart from "@/hooks/utils/use-chart";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chart, { ChartProps } from "./chart";

export interface AppWebsiteVisitsChartProps {
  title: string;
  subheader: string;
  chart: ChartProps;
  [key: string]: any;
}

const AppWebsiteVisitsChart = ({
  title,
  subheader,
  chart,
  ...other
}: AppWebsiteVisitsChartProps) => {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "16%"
      }
    },
    fill: {
      type: series?.map((i) => i.fill)
    },
    labels,
    xaxis: {
      type: "datetime"
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number | undefined) => {
          if (typeof value !== "undefined") {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        }
      }
    },
    ...options
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
};

export default AppWebsiteVisitsChart;
