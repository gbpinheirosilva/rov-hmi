import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import { useROV } from '../../context/ROVContext';

export default function ThrusterControl() {
  const { state } = useROV();
  const { thrusters } = state;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Thruster Control
        </Typography>
        <Grid container spacing={2}>
          {thrusters.map((thruster) => (
            <Grid xs={6} md={4} key={thruster.id}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {thruster.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {thruster.power}%
                </Typography>
                <Chip
                  label={thruster.status}
                  color={thruster.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
