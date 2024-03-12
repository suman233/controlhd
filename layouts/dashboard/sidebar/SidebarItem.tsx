/* eslint-disable no-nested-ternary */
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { alpha } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { createElement, useState } from "react";

import { Stack, Theme } from "@mui/material";
// import ListItemIcon from "@mui/material/ListItemIcon";
import { useRouter } from "next/router";
import { NavItem } from "../config-navigation";

interface SidebarItemProps {
  item: NavItem;
}

function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const active = item?.path === pathname;
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const sx = {
    minHeight: 44,
    borderRadius: 0.75,
    typography: "body2",
    color: "text.secondary",
    textTransform: "capitalize",
    fontWeight: "fontWeightMedium",
    ...(active && {
      color: "primary.main",
      fontWeight: "fontWeightSemiBold",
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
      "&:hover": {
        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16)
      }
    })
  };

  const handleClick = (item: NavItem) => {
    if (item?.hasChild) {
      setOpen(!open);
    } else {
      router.push(item?.path as string);
    }
  };

  return (
    <>
      <ListItemButton sx={sx} onClick={() => handleClick(item)}>
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon && createElement(item.icon)}
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          width="100%"
        >
          <Box component="span">{item.title} </Box>

          {item?.children?.length ? (
            open ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </Stack>
      </ListItemButton>

      {item?.children?.length ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.children?.map((item) => (
              <ListItemButton
                onClick={() => router.push(item?.path as string)}
                sx={{ ...sx, pl: 4 }}
              >
                <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                  {item.icon && createElement(item.icon)}
                </Box>
                <Box component="span">{item?.title} </Box>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

export default SidebarItem;
