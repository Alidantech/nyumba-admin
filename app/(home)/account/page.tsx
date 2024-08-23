import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UserDataForm from "./form";
import { getLoggedInAdmin } from "@/app/login/action";

const AccountPage = async () => {
  
  const user: any = await getLoggedInAdmin();

  return (
    <Container
      sx={{
        padding: 3,
      }}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <UserDataForm user={user} />
      </Box>
    </Container>
  );
};

export default AccountPage;
