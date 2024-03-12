import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import CustomInput from "@/ui/Inputs/CustomInput";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";

export default function index() {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home Cms
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Box component="form" noValidate autoComplete="off">
                  <Box mt={3}>
                    <CustomInput
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue="Hello World"
                      fullWidth
                    />
                  </Box>

                  <Box mt={3}>
                    <CustomInput
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue="Hello World"
                      fullWidth
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
