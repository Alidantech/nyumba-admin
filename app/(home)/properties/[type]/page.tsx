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
import { revalidatePath } from "next/cache";

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

  revalidatePath(`/properties/${type}`);

   // Filter properties to only include those with the desired status
   const statusToDisplay = "pending_Approval"; // Adjust this value to the desired status
   const filteredProperties = data.filter(
     (property: any) => property.status === statusToDisplay
   );

  return (
    <div>
      {filteredProperties.length > 0 ? (
        <>
          {/* <SearchForm /> */}
          <Grid container spacing={2}>
            {filteredProperties.map((property: any, index: any) => (
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
