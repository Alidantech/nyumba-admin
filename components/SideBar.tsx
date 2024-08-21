"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
const drawerWidth: number = 240;
import { mainListItems, secondaryListItems } from "./LinksList";

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  user: any;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Sidebar({ open, toggleDrawer, user }: DrawerProps) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          zIndex: 100,
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Link href="/" style={{ margin: "auto", marginLeft: "10px" }}>
          <Image
            width={100}
            height={40}
            style={{
              marginTop: 6,
            }}
            src="/nyumba-logo.svg"
            alt="Nyumba Logo"
          />
        </Link>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider />
        {secondaryListItems}
      </List>
      <Box flexGrow={1} />
      <Divider />
    </Drawer>
  );
}
