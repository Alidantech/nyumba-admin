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

const AccountPage = async () => {
  
  const user: any = {
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
