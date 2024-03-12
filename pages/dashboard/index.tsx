import AppWidgetSummaryCard from "@/components/cards/AppWidgetSummaryCard";

import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { Container, Grid, Typography } from "@mui/material";

import dynamic from "next/dynamic";

const AppWebsiteVisitsChart = dynamic(
  () => import("@/components/chart/AppWebsiteVisitsChart"),
  { ssr: false }
);

export default function Home() {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryCard
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryCard
              title="New Users"
              total={1352831}
              color="info"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryCard
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryCard
              title="Bug Reports"
              total={234}
              color="error"
              icon={
                <img
                  alt="icon"
                  src="/assets/icons/glass/ic_glass_message.png"
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisitsChart
              title="Website Visits"
              subheader="(+43%) than last year"
              chart={{
                labels: [
                  "01/01/2003",
                  "02/01/2003",
                  "03/01/2003",
                  "04/01/2003",
                  "05/01/2003",
                  "06/01/2003",
                  "07/01/2003",
                  "08/01/2003",
                  "09/01/2003",
                  "10/01/2003",
                  "11/01/2003"
                ],
                series: [
                  {
                    name: "Team A",
                    type: "column",
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                  },
                  {
                    name: "Team B",
                    type: "area",
                    fill: "gradient",
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                  },
                  {
                    name: "Team C",
                    type: "line",
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                  }
                ] as ApexAxisChartSeries
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {/* <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          /> */}
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          /> */}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {/* <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          /> */}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {/* <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          /> */}
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            {/* <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          /> */}
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
