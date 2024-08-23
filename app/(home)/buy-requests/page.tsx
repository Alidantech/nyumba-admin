import React from "react";
import { Container, Box, List, Divider, Typography } from "@mui/material";
import CustomerItem from "./Item";
import { API_URL } from "@/app/url";

const RequestsPage = async () => {
  const response = await fetch(`${API_URL}` + "/requests", {
    cache: "no-store",
  });

  if (!response.ok) {
    return <div>Failed to fetch customers</div>;
  }

  const customers: any = await response.json();

  return (
    <Container maxWidth="md">
      <Box mt={1}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "text.secondary",
            my: 2,
            textAlign: "center",
          }}
          component="h1"
        >
          Verify that the owner has surrendered the correct documents for the
          property, before approving the request.
        </Typography>
        <List>
          {customers.map((customer: any, index: any) => (
            <React.Fragment key={index}>
              <CustomerItem request={customer} />
              {index < customers.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default RequestsPage;
