import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Alarms() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Alarm Management
      </Typography>
      <Typography variant="body1">
        Comprehensive alarm management system with filtering, acknowledgment, and escalation will be implemented here.
      </Typography>
    </Box>
  );
}
