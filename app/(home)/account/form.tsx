"use client";
import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { updateUserDetails } from "./actions";
import SubmitButton from "@/components/SubmitButton";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
  avatar: {
    url: string;
    id: string;
  };
}

interface UserFormProps {
  user: User;
}

const UserDataForm: React.FC<UserFormProps> = ({ user }) => {
  const [state, action] = useFormState(updateUserDetails, null);

  React.useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      {/* text field with wallet address */}
      <TextField
        label="Wallet Address"
        value={user?.walletAddress}
        fullWidth
        variant="outlined"
        disabled
        sx={{ marginBottom: 2 }}
      ></TextField>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={user?.firstName}
            label="First Name"
            name="firstName"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={user?.lastName}
            label="Last Name"
            name="lastName"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            defaultValue={user?.email}
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton>Save Changes</SubmitButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserDataForm;
