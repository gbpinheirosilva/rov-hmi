import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Settings
      </Typography>
      <Typography variant="body1">
        System configuration, user preferences, and advanced settings will be implemented here.
      </Typography>
    </Box>
  );
}
