import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
} from '@mui/icons-material';

export default function MissionStatus() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Mission Status
        </Typography>
        
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Chip
            label="No Active Mission"
            color="default"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Ready for mission planning
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            size="small"
          >
            Start
          </Button>
          <Button
            variant="outlined"
            startIcon={<Pause />}
            size="small"
            disabled
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            startIcon={<Stop />}
            size="small"
            disabled
          >
            Stop
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
