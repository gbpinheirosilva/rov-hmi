import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2 as Grid,
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
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <NavigationIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Navigation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Compass Display */}
          <Grid xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                {formatHeading(navigation.heading)}
              </Typography>
              
              {/* Compass Circle */}
              <Box
                sx={{
                  position: 'relative',
                  width: 200,
                  height: 200,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {/* Compass Background */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '3px solid',
                    borderColor: 'primary.main',
                    backgroundColor: 'background.paper',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Compass Markings */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <Box
                      key={angle}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 2,
                        height: 20,
                        backgroundColor: 'text.secondary',
                        transformOrigin: 'bottom center',
                        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                      }}
                    />
                  ))}

                  {/* Compass Needle */}
                  <motion.div
                    animate={{ rotate: navigation.heading }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 3,
                      height: 80,
                      backgroundColor: getHeadingColor(navigation.heading),
                      transformOrigin: 'bottom center',
                      transform: 'translate(-50%, -100%)',
                      borderRadius: '2px',
                      zIndex: 2,
                    }}
                  />

                  {/* Center Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 8,
                      height: 8,
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 3,
                    }}
                  />
                </Box>

                {/* Direction Labels */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">N</Typography>
                  <Typography variant="caption" color="text.secondary">E</Typography>
                  <Typography variant="caption" color="text.secondary">S</Typography>
                  <Typography variant="caption" color="text.secondary">W</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Navigation Data */}
          <Grid xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid xs={6}>
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

              <Grid xs={6}>
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

              <Grid xs={6}>
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

              <Grid xs={6}>
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

              <Grid xs={12}>
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
            <Grid xs={6}>
              <Typography variant="body2" color="text.secondary">
                Latitude: {navigation.position.latitude.toFixed(6)}°
              </Typography>
            </Grid>
            <Grid xs={6}>
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
