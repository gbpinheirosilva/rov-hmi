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

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Compass Display */}
          <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
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
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                    <Box
                      key={angle}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: angle % 90 === 0 ? 3 : 2,
                        height: angle % 90 === 0 ? 25 : 15,
                        backgroundColor: angle % 90 === 0 ? 'primary.main' : 'text.secondary',
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

                  {/* Direction Labels */}
                  {[
                    { angle: 0, label: 'N' },
                    { angle: 90, label: 'E' },
                    { angle: 180, label: 'S' },
                    { angle: 270, label: 'W' }
                  ].map(({ angle, label }) => (
                    <Typography
                      key={label}
                      variant="h6"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translate(${Math.sin(angle * Math.PI / 180) * 70}px, ${-Math.cos(angle * Math.PI / 180) * 70}px)`,
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                    >
                      {label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Navigation Data */}
          <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <DepthIcon sx={{ color: 'info.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.depth.toFixed(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Depth (m)
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <AltitudeIcon sx={{ color: 'success.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.altitude.toFixed(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Altitude (m)
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <PitchIcon sx={{ color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.pitch.toFixed(1)}°
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Pitch
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <RollIcon sx={{ color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.roll.toFixed(1)}°
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Roll
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <SpeedIcon sx={{ color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {navigation.speed.toFixed(1)} kn
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Speed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Position Information */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Position
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
              <Typography variant="body2" color="text.secondary">
                Latitude: {navigation.position.latitude.toFixed(6)}°
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
              <Typography variant="body2" color="text.secondary">
                Longitude: {navigation.position.longitude.toFixed(6)}°
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
