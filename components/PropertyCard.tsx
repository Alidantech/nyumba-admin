"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Property {
  _id: any;
  title: string;
  description: string;
  price: number;
  location: {
    latitude: number;
    longitude: number;
  };
  images: { url: string; id: string }[];
  owner: {
    firstName: string;
    lastName: string;
    avatar: {
      url: string;
      id: string;
    };
  };
  propertyType: string; // Add propertyType to the interface
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const { title, description, price, location, images, owner, propertyType } =
    property;

  // Determine the action button based on the property type
  const renderActionButton = () => {
    switch (propertyType) {
      case "lease-land":
        return (
          <Button size="small" variant="contained" color="primary">
            Lease Now
          </Button>
        );
      case "rental":
        return (
          <Button size="small" variant="contained" color="primary">
            Rent Now
          </Button>
        );
      case "land":
        return (
          <Button size="small" variant="contained" color="primary">
            Buy Land
          </Button>
        );
      case "real-estate":
        return (
          <Button size="small" variant="contained" color="primary">
            Buy Now
          </Button>
        );
      default:
        return null; // No action button for unknown property types
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={false}
        infiniteLoop
      >
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.url}
              alt={title}
              style={{ height: 200, objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="h6" color="primary">
            ${price}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <Avatar
              src={owner?.avatar?.url}
              alt={`${owner.firstName} ${owner.lastName}`}
            />
            <Typography variant="body1" color="text.primary" ml={2}>
              {owner.firstName} {owner.lastName}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button size="small" color="primary">
            View Location
          </Button>
        </a>
        <Link href={`/home/request/${property._id}`}>
          {renderActionButton()}
        </Link>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
