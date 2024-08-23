"use client";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFormState } from "react-dom";
import { acceptRequest } from "./action";
import { toast } from "react-toastify";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

const RequestItem = ({ request }: { request: any }) => {
  const { owner, property, status } = request;
  const [state, action] = useFormState(acceptRequest, null);

  React.useEffect(() => {
    if (state?.success) {
      // Do something after removing the request
      toast.success(state?.message);
    } else if (!state?.success && state?.message) {
      // Do something if there is an
      toast.error(state?.message);
    }
  }, [state]);

  // Determine the color based on the status
  let statusColor = "textSecondary";
  if (status === "approved") statusColor = "primary";
  if (status === "cancelled") statusColor = "error";
  if (status === "pending") statusColor = "warning.main";
  if (status === "accepted") statusColor = "success.main";

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={owner?.avatar?.url} alt={owner?.firstName}>
          {owner?.firstName?.[0]}
        </Avatar>
      </ListItemAvatar>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <ListItemText
            primary={
              <Typography component="span" variant="body1">
                {owner?.firstName} {owner?.lastName}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {property?.title || "Property"}: ${property?.price}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  color={statusColor}
                  fontWeight="bold"
                >
                  {status}
                </Typography>
              </>
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          container
          alignItems="center"
          justifyContent="flex-end"
        >
          {/* accept and decline button */}
          <Box component="form" action={action} mr={1}>
            <input type="hidden" name="requestId" value={request._id} />
            <SubmitButton
              sx={{ m: 0 }}
              //@ts-ignore
              variant="outlined"
              aria-label="decline"
            >
              <Typography variant="body2">Accept</Typography>
            </SubmitButton>
          </Box>
          {/* <IconButton aria-label="more">
            <MoreVertIcon />
          </IconButton> */}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default RequestItem;
