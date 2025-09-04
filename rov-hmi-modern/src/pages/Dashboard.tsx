import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  LinearProgress,
  Slider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import image1 from '../images/image1.png';
import {
  Refresh,
  PlayArrow,
  Pause,
  Stop,
  Warning,
  CheckCircle,
  Error,
  Info,
  BatteryFull,
  Wifi,
  SignalCellular4Bar,
  Cable,
  Videocam,
  Settings,
  Navigation,
  Speed,
  Height,
  Straighten,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useROV } from '../context/ROVContext';
import SystemStatusCard from '../components/Dashboard/SystemStatusCard';
import MissionStatus from '../components/Dashboard/MissionStatus';
import NavigationDisplay from '../components/Dashboard/NavigationDisplay';
import ThrusterControl from '../components/Dashboard/ThrusterControl';
import SensorCard from '../components/Dashboard/SensorCard';
import AlarmSummary from '../components/Dashboard/AlarmSummary';
import AIInsights from '../components/Dashboard/AIInsights';

// Artificial Horizon Component
const ArtificialHorizon = ({ pitch, roll }: { pitch: number; roll: number }) => {
  return (
    <Box sx={{ 
      width: 200, 
      height: 200, 
      position: 'relative',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid #00bcd4',
      background: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 50%, #8B4513 50%, #8B4513 100%)',
      transform: `rotate(${roll}deg)`,
    }}>
      {/* Horizon Line */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        background: '#FFD700',
        transform: `translateY(${pitch * 2}px)`,
      }} />
      
      {/* Pitch Lines */}
      {[-30, -20, -10, 0, 10, 20, 30].map((angle) => (
        <Box
          key={angle}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: angle === 0 ? 60 : 40,
            height: 1,
            background: angle === 0 ? '#FFD700' : '#FFFFFF',
            transform: `translate(-50%, ${angle * 2}px) rotate(${-roll}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
      
      {/* Center Cross */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 20,
        height: 20,
        transform: 'translate(-50%, -50%)',
        border: '2px solid #FFD700',
        borderRadius: '50%',
      }} />
    </Box>
  );
};

export default function Dashboard() {
  const { state, dispatch } = useROV();
  const [isSimulating, setIsSimulating] = useState(true);

  // Real-time data simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Update sensors with realistic variations
      const updatedSensors = state.sensors.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * sensor.value * 0.05,
        status: sensor.value > sensor.maxValue * 0.8 ? 'warning' : 
                sensor.value < sensor.minValue * 1.2 ? 'critical' : 'normal',
        trend: (['up', 'down', 'stable'] as const)[Math.floor(Math.random() * 3)],
      }));

      // Update navigation with realistic movement
      const updatedNavigation = {
        ...state.navigation,
        heading: (state.navigation.heading + (Math.random() - 0.5) * 2) % 360,
        depth: state.navigation.depth + (Math.random() - 0.5) * 0.5,
        altitude: state.navigation.altitude + (Math.random() - 0.5) * 0.3,
        pitch: state.navigation.pitch + (Math.random() - 0.5) * 1,
        roll: state.navigation.roll + (Math.random() - 0.5) * 1,
        speed: state.navigation.speed + (Math.random() - 0.5) * 0.2,
      };

      // Update system status
      const updatedSystemStatus = {
        ...state.systemStatus,
        power: {
          ...state.systemStatus.power,
          battery: Math.max(0, state.systemStatus.power.battery - 0.01),
          voltage: 24 + (Math.random() - 0.5) * 0.5,
          current: 15 + (Math.random() - 0.5) * 2,
        },
        communication: {
          ...state.systemStatus.communication,
          signal: 85 + (Math.random() - 0.5) * 10,
          latency: 50 + (Math.random() - 0.5) * 20,
        },
        tether: {
          ...state.systemStatus.tether,
          length: state.systemStatus.tether.length + (Math.random() - 0.5) * 0.1,
        },
      };

      dispatch({
        type: 'UPDATE_SENSORS',
        payload: updatedSensors,
      });

      dispatch({
        type: 'UPDATE_NAVIGATION',
        payload: updatedNavigation,
      });

      dispatch({
        type: 'UPDATE_SYSTEM_STATUS',
        payload: updatedSystemStatus,
      });

      dispatch({
        type: 'UPDATE_LAST_UPDATE',
        payload: new Date(),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, state, dispatch]);

  const handleSimulationToggle = () => {
    setIsSimulating(!isSimulating);
  };

  const handleRefresh = () => {
    dispatch({ type: 'UPDATE_LAST_UPDATE', payload: new Date() });
  };

  const activeAlarms = state.alarms.filter(alarm => !alarm.acknowledged && !alarm.resolved);
  const criticalAlarms = activeAlarms.filter(alarm => alarm.severity === 'critical' || alarm.severity === 'emergency');

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
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          ROV Control Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isSimulating ? 'Pause simulation' : 'Start simulation'}>
            <IconButton 
              onClick={handleSimulationToggle} 
              sx={{ 
                background: isSimulating ? 'linear-gradient(45deg, #4caf50, #66bb6a)' : 'linear-gradient(45deg, #666, #888)',
                color: 'white',
                '&:hover': {
                  background: isSimulating ? 'linear-gradient(45deg, #388e3c, #4caf50)' : 'linear-gradient(45deg, #555, #777)',
                }
              }}
            >
              {isSimulating ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh data">
            <IconButton 
              onClick={handleRefresh}
              sx={{ 
                background: 'linear-gradient(45deg, #2196f3, #42a5f5)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Chip
            label={isSimulating ? 'LIVE' : 'PAUSED'}
            color={isSimulating ? 'success' : 'default'}
            size="small"
            sx={{ 
              fontWeight: 'bold',
              background: isSimulating ? 'linear-gradient(45deg, #4caf50, #66bb6a)' : 'linear-gradient(45deg, #666, #888)',
              color: 'white'
            }}
          />
        </Box>
      </Box>

      {/* Main Dashboard Layout - 3 Column Layout */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex',
        gap: 2,
        minHeight: '800px'
      }}>
        
        {/* Left Column - Navigation & Thrusters */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Navigation Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontSize: '1.3em' }}>
                  Navigation
                </Typography>
                
                {/* Depth & Altitude */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 'bold', fontSize: '1.3em' }}>
                      {state.navigation.depth.toFixed(1)}m
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3em' }}>DEPTH</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 'bold', fontSize: '1.3em' }}>
                      {state.navigation.altitude.toFixed(1)}m
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3em' }}>ALTITUDE</Typography>
                  </Box>
                </Box>

                {/* Heading */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.3em' }}>
                    {state.navigation.heading.toFixed(1)}°
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3em' }}>HEADING</Typography>
                </Box>

                {/* Artificial Horizon */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <ArtificialHorizon 
                    pitch={state.navigation.pitch} 
                    roll={state.navigation.roll} 
                  />
                </Box>

                {/* Position */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3em' }}>
                    Lat: {state.navigation.position.latitude.toFixed(4)}°
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3em' }}>
                    Lon: {state.navigation.position.longitude.toFixed(4)}°
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Thruster Control */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'success.main', fontSize: '1.3em' }}>
                  Thrusters
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {state.thrusters.map((thruster) => (
                    <Box key={thruster.id} sx={{ 
                      p: 1, 
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 1,
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" sx={{ display: 'block', mb: 0.5, fontSize: '1.3em' }}>
                        {thruster.name}
                      </Typography>
                      <Typography variant="h5" sx={{ 
                        color: thruster.power > 50 ? 'warning.main' : 'success.main',
                        fontWeight: 'bold',
                        fontSize: '1.3em'
                      }}>
                        {thruster.power.toFixed(0)}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Center Column - Main Camera & Controls */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 2 }}>
          {/* Main Camera Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ 
              flex: 1,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)',
              border: '2px solid rgba(0, 188, 212, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              minHeight: '400px'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ color: 'primary.main', fontSize: '1.3em' }}>
                    MAIN CAMERA FEED
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label="REC" color="error" size="small" />
                    <Chip label="LIVE" color="success" size="small" />
                  </Box>
                </Box>
                
                {/* Camera Display Area */}
                <Box sx={{ 
                  flex: 1,
                  background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0, 188, 212, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={image1} 
                    alt="ROV Camera Feed" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} 
                  />
                  
                  {/* Camera Overlay Info */}
                  <Box sx={{ 
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(0, 0, 0, 0.7)',
                    p: 1,
                    borderRadius: 1
                  }}>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: '1.3em' }}>
                      DEPTH {state.navigation.depth.toFixed(1)}m
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(0, 0, 0, 0.7)',
                    p: 1,
                    borderRadius: 1
                  }}>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: '1.3em' }}>
                      {state.navigation.heading.toFixed(1)}°
                    </Typography>
                  </Box>
                </Box>

                {/* Control Panel */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="medium" startIcon={<Videocam />} sx={{ fontSize: '1.3em' }}>
                      Main
                    </Button>
                    <Button variant="outlined" size="medium" sx={{ fontSize: '1.3em' }}>
                      Rear
                    </Button>
                    <Button variant="outlined" size="medium" sx={{ fontSize: '1.3em' }}>
                      Tool
                    </Button>
                  </Box>
                  
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<Stop />}
                    sx={{ 
                      minWidth: 140,
                      fontSize: '1.3em',
                      background: 'linear-gradient(45deg, #f44336, #e57373)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #d32f2f, #f44336)',
                      }
                    }}
                  >
                    EMERGENCY STOP
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="medium" sx={{ fontSize: '1.3em' }}>
                      Heading
                    </Button>
                    <Button variant="outlined" size="medium" sx={{ fontSize: '1.3em' }}>
                      Depth
                    </Button>
                    <Button variant="outlined" size="medium" sx={{ fontSize: '1.3em' }}>
                      Station
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Alarms - Below Main Camera */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ color: 'error.main', fontSize: '1.3em' }}>
                    Active Alarms
                  </Typography>
                  <Chip 
                    label={`${activeAlarms.length} ACTIVE`} 
                    color="error" 
                    size="small"
                    sx={{ fontSize: '1.3em' }}
                  />
                </Box>
                
                {activeAlarms.length > 0 ? (
                  <List dense>
                    {activeAlarms.slice(0, 3).map((alarm, index) => (
                      <React.Fragment key={alarm.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {alarm.severity === 'critical' ? (
                              <Error color="error" />
                            ) : (
                              <Warning color="warning" />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={alarm.message}
                            secondary={alarm.timestamp.toLocaleTimeString()}
                            primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                            secondaryTypographyProps={{ variant: 'body2', sx: { fontSize: '1.3em' } }}
                          />
                        </ListItem>
                        {index < activeAlarms.slice(0, 3).length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2, fontSize: '1.3em' }}>
                    No active alarms
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Right Column - Systems Status */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'warning.main', fontSize: '1.3em' }}>
                  System Status
                </Typography>
                
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Main Power OK"
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                    />
                  </ListItem>
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`HPU #1 ${state.systemStatus.power.battery.toFixed(0)}%`}
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                    />
                  </ListItem>
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="HPU #2 88%"
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                    />
                  </ListItem>
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Hydraulics 207 bar"
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                    />
                  </ListItem>
                  
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Insulation 5.2 MΩ"
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1.3em' } }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Environmental */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(33, 150, 243, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'info.main', fontSize: '1.3em' }}>
                  Environmental
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3em' }}>Water Temp</Typography>
                    <Typography variant="body1" sx={{ color: 'info.main', fontSize: '1.3em' }}>8.2°C</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3em' }}>Current</Typography>
                    <Typography variant="body1" sx={{ color: 'info.main', fontSize: '1.3em' }}>0.8 kts</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3em' }}>Visibility</Typography>
                    <Typography variant="body1" sx={{ color: 'info.main', fontSize: '1.3em' }}>12m</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lighting Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              border: '1px solid rgba(156, 39, 176, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'secondary.main', fontSize: '1.3em' }}>
                  Lighting
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.3em' }}>MAIN LIGHTS 70%</Typography>
                    <Slider
                      value={70}
                      disabled
                      sx={{ color: 'primary.main' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.3em' }}>TOOL LIGHTS 50%</Typography>
                    <Slider
                      value={50}
                      disabled
                      sx={{ color: 'primary.main' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.3em' }}>CAMERA LED 100%</Typography>
                    <Slider
                      value={100}
                      disabled
                      sx={{ color: 'primary.main' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

        </Box>
      </Box>
    </Box>
  );
}