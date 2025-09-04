import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Videocam,
  Fullscreen,
  RecordVoiceOver,
  Stop,
  Settings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface CameraFeed {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  resolution: string;
  fps: number;
}

const availableCameras: CameraFeed[] = [
  { id: 'cam1', name: 'Forward Camera', status: 'active', resolution: '1920x1080', fps: 30 },
  { id: 'cam2', name: 'Downward Camera', status: 'active', resolution: '1920x1080', fps: 30 },
  { id: 'cam3', name: 'Port Camera', status: 'active', resolution: '1280x720', fps: 25 },
  { id: 'cam4', name: 'Starboard Camera', status: 'active', resolution: '1280x720', fps: 25 },
  { id: 'cam5', name: 'Manipulator Camera', status: 'inactive', resolution: '1920x1080', fps: 30 },
  { id: 'cam6', name: 'Aft Camera', status: 'active', resolution: '1280x720', fps: 25 },
];

export default function Cameras() {
  const [selectedCameras, setSelectedCameras] = useState({
    feed1: 'cam1',
    feed2: 'cam2',
    feed3: 'cam3',
    feed4: 'cam4',
  });
  const [recording, setRecording] = useState(false);

  const handleCameraChange = (feed: string, cameraId: string) => {
    setSelectedCameras(prev => ({
      ...prev,
      [feed]: cameraId,
    }));
  };

  const getCameraById = (id: string) => {
    return availableCameras.find(cam => cam.id === id) || availableCameras[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      overflow: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      p: 2
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2, 
        flexShrink: 0,
        p: 2,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Camera Views
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={recording ? 'Stop Recording' : 'Start Recording'}>
            <IconButton 
              onClick={() => setRecording(!recording)}
              sx={{ 
                background: recording ? 'linear-gradient(45deg, #f44336, #e57373)' : 'linear-gradient(45deg, #4caf50, #66bb6a)',
                color: 'white',
                '&:hover': {
                  background: recording ? 'linear-gradient(45deg, #d32f2f, #f44336)' : 'linear-gradient(45deg, #388e3c, #4caf50)',
                }
              }}
            >
              {recording ? <Stop /> : <RecordVoiceOver />}
            </IconButton>
          </Tooltip>
          <Chip
            label={recording ? 'RECORDING' : 'STANDBY'}
            color={recording ? 'error' : 'default'}
            size="small"
            sx={{ 
              fontWeight: 'bold',
              background: recording ? 'linear-gradient(45deg, #f44336, #e57373)' : 'linear-gradient(45deg, #666, #888)',
              color: 'white'
            }}
          />
        </Box>
      </Box>

      {/* Camera Grid */}
      <Box sx={{ 
        flex: 1, 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 2,
        minHeight: '600px'
      }}>
        {['feed1', 'feed2', 'feed3', 'feed4'].map((feed, index) => {
          const camera = getCameraById(selectedCameras[feed as keyof typeof selectedCameras]);
          return (
            <motion.div
              key={feed}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ height: '100%' }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                border: '1px solid rgba(0, 188, 212, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Camera Feed Header */}
                <Box sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  p: 1,
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Videocam sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ color: 'white' }}>
                      {camera.name}
                    </Typography>
                    <Chip
                      label={camera.status.toUpperCase()}
                      color={getStatusColor(camera.status) as any}
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Fullscreen">
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <Fullscreen fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <Settings fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Camera Feed Area */}
                <Box sx={{ 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                  position: 'relative'
                }}>
                  {/* Mock Video Feed */}
                  <Box sx={{
                    width: '80%',
                    height: '80%',
                    background: 'linear-gradient(45deg, #333, #555)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(0, 188, 212, 0.3)',
                    position: 'relative'
                  }}>
                    <Videocam sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      {camera.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {camera.resolution} @ {camera.fps}fps
                    </Typography>
                    
                    {/* Recording Indicator */}
                    {recording && (
                      <Box sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        background: 'rgba(244, 67, 54, 0.8)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        <Box sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'white',
                          animation: 'pulse 1s infinite'
                        }} />
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                          REC
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Camera Selection */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  p: 1,
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: 'white' }}>Camera</InputLabel>
                    <Select
                      value={selectedCameras[feed as keyof typeof selectedCameras]}
                      onChange={(e) => handleCameraChange(feed, e.target.value)}
                      label="Camera"
                      sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      {availableCameras.map((camera) => (
                        <MenuItem key={camera.id} value={camera.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={camera.status}
                              color={getStatusColor(camera.status) as any}
                              size="small"
                              sx={{ fontSize: '0.7rem' }}
                            />
                            {camera.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Card>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
