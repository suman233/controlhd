import animationData from "@/json/lottie/404.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import dynamic from "next/dynamic";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"));
// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Lottie
          className="errorPage_image"
          animationData={animationData}
          loop
          style={{
            height: 300,
            width: 300
          }}
          height={300}
          width={300}
        />

        <Link href="/dashboard">
          <Button size="large" variant="contained">
            Go to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
