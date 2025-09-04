import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import {
  Navigation as NavigationIcon,
  Straighten as DepthIcon,
  Height as AltitudeIcon,
  TrendingUp as PitchIcon,
  TrendingFlat as RollIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GaugeChart from 'react-gauge-chart';
import { useROV } from '../../context/ROVContext';

export default function NavigationDisplay() {
  const { state } = useROV();
  const { navigation } = state;

  const formatHeading = (heading: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return `${heading.toFixed(1)}° ${directions[index]}`;
  };

  const getHeadingColor = (heading: number) => {
    // Color based on heading direction
    const hue = (heading / 360) * 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
      border: '1px solid rgba(76, 175, 80, 0.3)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <NavigationIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Navigation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Compass Display */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                {formatHeading(navigation.heading)}
              </Typography>
              
              {/* Compass Gauge */}
              <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GaugeChart
                  id="compass-gauge"
                  nrOfLevels={8}
                  percent={navigation.heading / 360}
                  colors={['#FF5F6D', '#FFC371', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']}
                  arcWidth={0.3}
                  needleColor="#FF6B6B"
                  needleBaseColor="#FF6B6B"
                  textColor="#FFFFFF"
                  animate={true}
                  animateDuration={1000}
                  formatTextValue={(value) => `${Math.round(value * 360)}°`}
                />
              </Box>
              
              {/* Direction Labels */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 2 }}>
                <Typography variant="caption" color="text.secondary">N</Typography>
                <Typography variant="caption" color="text.secondary">NE</Typography>
                <Typography variant="caption" color="text.secondary">E</Typography>
                <Typography variant="caption" color="text.secondary">SE</Typography>
                <Typography variant="caption" color="text.secondary">S</Typography>
                <Typography variant="caption" color="text.secondary">SW</Typography>
                <Typography variant="caption" color="text.secondary">W</Typography>
                <Typography variant="caption" color="text.secondary">NW</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Navigation Data */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <DepthIcon sx={{ color: 'info.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.depth.toFixed(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Depth (m)
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <AltitudeIcon sx={{ color: 'success.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.altitude.toFixed(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Altitude (m)
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <PitchIcon sx={{ color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.pitch.toFixed(1)}°
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Pitch
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <RollIcon sx={{ color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.roll.toFixed(1)}°
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Roll
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <SpeedIcon sx={{ color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.speed.toFixed(1)} kn
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Speed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Position Information */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Position
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Latitude: {navigation.position.latitude.toFixed(6)}°
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Longitude: {navigation.position.longitude.toFixed(6)}°
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
