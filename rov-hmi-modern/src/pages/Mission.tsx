import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Mission() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Mission Planning
      </Typography>
      <Typography variant="body1">
        Mission planning and execution tools with waypoint management and autonomous capabilities will be implemented here.
      </Typography>
    </Box>
  );
}
