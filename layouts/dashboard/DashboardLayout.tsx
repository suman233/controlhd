import { useState } from "react";

import Box from "@mui/material/Box";

import Header from "./header/header";
import Main from "./main";
import Sidebar from "./sidebar/Sidebar";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [openNav, setOpenNav] = useState(false);

  // useUser()

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }
        }}
      >
        <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
