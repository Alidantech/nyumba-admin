"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Modal,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DocumentIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    description: string;
    price: number;
    propertyType: string;
    location: {
      latitude: number;
      longitude: number;
    };
    images: { url: string; id: string }[];
    documents: { url: string; id: string }[];
    status: string;
    ownerAddress: string;
  };
}

const MyPropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [open, setOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLocationOpen = () => setLocationOpen(true);
  const handleLocationClose = () => setLocationOpen(false);

  function onEdit(_id: string): void {
    throw new Error("Function not implemented.");
  }

  function onDelete(_id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop>
        {property.images.map((image) => (
          <CardMedia
            key={image.id}
            component="img"
            height="200"
            image={image.url}
            alt={property.title}
          />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
          ${property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Type: {property.propertyType}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, textTransform: "capitalize" }}
        >
          Status: {property.status.split("_").join(" ")}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<DocumentIcon />}
          sx={{ mr: 1 }}
          size="small"
        >
          Documents
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={handleLocationOpen}
          startIcon={<LocationOnIcon />}
        >
          Location
        </Button>
        <IconButton color="primary" onClick={() => onEdit(property._id)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(property._id)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Modal for displaying documents */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Documents
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {property.documents.map((document) => (
              <Grid item xs={12} key={document.id}>
                <Button
                  variant="outlined"
                  href={document.url}
                  target="_blank"
                  fullWidth
                >
                  View Document
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      {/* Dialog for viewing location */}
      <Dialog open={locationOpen} onClose={handleLocationClose}>
        <DialogTitle>Property Location</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Latitude: {property.location.latitude}
          </Typography>
          <Typography variant="body1">
            Longitude: {property.location.longitude}
          </Typography>
          <Typography variant="body1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${property.location.latitude},${property.location.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLocationClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MyPropertyCard;
