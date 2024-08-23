"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Sidebar from "@/components/SideBar";
import AppBar from "@/components/AppBar";
import { getLoggedInAdmin } from "../login/action";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to manage the sidebar open/close state
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // State to manage the current user
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    // Simulate fetching the current user
    const currentUser: any = await getLoggedInAdmin();
    setUser(currentUser);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AppBar user={user} open={open} toggleDrawer={toggleDrawer} />
      <Sidebar user={user} open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
          pt: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
