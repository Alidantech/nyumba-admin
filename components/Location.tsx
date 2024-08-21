import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Card,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type LocationSelectorProps = {
  name: string;
  label: string;
  formState: any;
  defaultLat?: number; // Optional default latitude
  defaultLng?: number; // Optional default longitude
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
  name,
  label,
  formState,
  defaultLat = 20.5937, // Default to India if no prop is passed
  defaultLng = 78.9629, // Default to India if no prop is passed
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [locationName, setLocationName] = useState<string>(
    "No location selected"
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(defaultLat);
  const [longitude, setLongitude] = useState<number | null>(defaultLng);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      // Fit bounds to the default location initially
      map.setCenter({ lat: defaultLat, lng: defaultLng });
    },
    [defaultLat, defaultLng]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setMarker({ lat, lng });
      setLatitude(lat);
      setLongitude(lng);
      fetchLocationName(lat, lng);
    }
  };

  const fetchLocationName = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setLocationName(results[0].formatted_address);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarker({ lat: latitude, lng: longitude });
          setLatitude(latitude);
          setLongitude(longitude);
          fetchLocationName(latitude, longitude);
          if (map) {
            map.setCenter({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          setError(error.message || "Unable to fetch current location");
        }
      );
    }
  };

  return (
    <FormControl fullWidth error={!!error} sx={{ mt: 2 }}>
      <FormLabel>{label}</FormLabel>
      {error && (
        <Typography sx={{ mb: 1, color: "error.main" }}>{error}</Typography>
      )}
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{
          width: "100%",
          justifyContent: "center",
          mb: 2,
          borderColor: error ? "error.main" : "background.default",
        }}
      >
        <Button
          color={selectedButton === "current" ? "primary" : "inherit"}
          onClick={() => {
            fetchCurrentLocation();
            setSelectedButton("current");
          }}
          sx={{
            borderColor:
              selectedButton === "current"
                ? "primary.main"
                : "background.default",
          }}
        >
          Use Current Location
        </Button>
        <Button
          color={selectedButton === "map" ? "primary" : "inherit"}
          onClick={() => {
            setSelectedButton("map");
          }}
          sx={{
            borderColor:
              selectedButton === "map" ? "primary.main" : "background.default",
          }}
        >
          Select From Map
        </Button>
      </ButtonGroup>
      {isLoaded && (
        <Card
          sx={{
            borderRadius: 1,
            border: "1px solid",
            borderColor: "background.default",
            width: "100%",
            height: 200,
            m: 0,
            p: 0,
            overflow: "hidden",
          }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: latitude ?? defaultLat,
              lng: longitude ?? defaultLng,
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </Card>
      )}
      {latitude !== null && longitude !== null && (
        <Box display="none">
          <input type="hidden" name={`${name}.latitude`} value={latitude} />
          <input type="hidden" name={`${name}.longitude`} value={longitude} />
        </Box>
      )}
      {locationName && (
        <Typography>{locationName ?? "Please select a location"}</Typography>
      )}
      {formState?.errors[`${name}.latitude`] && (
        <FormHelperText>
          {formState?.errors[`${name}.latitude`]?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default LocationSelector;
