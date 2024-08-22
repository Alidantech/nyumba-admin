import React from "react";
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import PropertyCard from "@/components/PropertyCard";
import SearchForm from "@/components/SearchForm";
import { Console } from "console";
import { API_URL } from "@/app/url";

const LandsPage = async ({
  params: { type },
}: {
  params: { type: string };
}) => {
  const response: any = await fetch(
    `${API_URL}/properties/${type}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <Typography variant="h6">Error fetching properties</Typography>;
  }

  const data = await response.json();

  return (
    <div>
      {data.length > 0 ? (
        <>
          {/* <SearchForm /> */}
          <Grid container spacing={2}>
            {data.map((property: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" align="center">
          No properties found
        </Typography>
      )}
    </div>
  );
};

export default LandsPage;
