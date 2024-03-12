import DataGridTable from "@/components/Table/DataGridTable";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const Index = () => {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100
  });

  console.log(data, "data");
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Users</Typography>

          <Button variant="contained" color="inherit">
            New User
          </Button>
        </Stack>

        <Card>
          <CardContent>
            <DataGridTable {...data} loading={false} />
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default Index;
