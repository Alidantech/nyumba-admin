"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  CardActions,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormState } from "react-dom";
import { listProperty } from "./action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  images: { url: string; id: string }[];
  status: string;
  ownerAddress: string;
  owner: {
    firstName: string;
    lastName: string;
    avatar: { url: string; id: string };
  };
  isOwner: boolean;
  myAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface ConfirmationPageProps {
  property: Property;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ property }) => {
  const [state, action] = useFormState(listProperty, null);
  const router = useRouter();

  React.useEffect(() => {
    if (state?.success) {
      toast.success("Property approved successfully");
    } else if (state?.message) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <Box component="form" action={action}>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia>
          <Carousel showThumbs={false}>
            {property.images.map((img) => (
              <div key={img.id}>
                <img
                  style={{ height: "300px", width: "auto" }}
                  src={img.url}
                  alt={property.title}
                />
              </div>
            ))}
          </Carousel>
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            Price: ${property.price}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Do you want to request this property?
          </Typography>
          {/* hidden inputs for the form */}
          <input type="hidden" name="propertyId" value={property._id} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <SubmitButton
              sx={{
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Approve Listing
            </SubmitButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfirmationPage;
