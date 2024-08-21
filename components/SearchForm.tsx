import React from 'react';
import { FormControl, Select, MenuItem, TextField, Button, Box } from '@mui/material';

const SearchForm = () => {
  return (
    <FormControl
      variant="outlined"
      sx={{
        width: "100%",
        my: 2,
        p: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
      }}
    >
      <Select defaultValue="Recently added" size="small">
        <MenuItem value="Recently added">Recently added</MenuItem>
        <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
        <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
      </Select>
      <Box>
        <TextField
          name="location"
          label="Location"
          size="small"
          variant="outlined"
          sx={{ marginRight: 2 }}
          required
        />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </FormControl>
  );
};

export default SearchForm;
