"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Sidebar from "@/components/SideBar";
import AppBar from "@/components/AppBar";
// import { getCurrentUser } from "../actions";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
  avatar: {
    url: string;
    id: string;
  };
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
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    // Simulate fetching the current user
    const currentUser: User = {
      _id: "66b3cdab2880cebad5dadafe",
      firstName: "Peter",
      lastName: "Irungu",
      email: "peteralidante254@gmail.com",
      walletAddress: "0x15535e1ad8899855072e4e2762b93e3a7c856ef8",
      avatar: {
        url: "http://res.cloudinary.com/dogrmupfk/image/upload/v1723113247/file_lcfio6.jpg",
        id: "file_lcfio6",
      },
    };

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
