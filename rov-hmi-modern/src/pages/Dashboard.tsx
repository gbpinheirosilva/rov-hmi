import React, { useEffect, useState } from 'react';
import {
  Grid2 as Grid,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh,
  PlayArrow,
  Pause,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useROV } from '../context/ROVContext';
import SensorCard from '../components/Dashboard/SensorCard';
import ThrusterControl from '../components/Dashboard/ThrusterControl';
import NavigationDisplay from '../components/Dashboard/NavigationDisplay';
import SystemStatusCard from '../components/Dashboard/SystemStatusCard';
import AlarmSummary from '../components/Dashboard/AlarmSummary';
import MissionStatus from '../components/Dashboard/MissionStatus';
import AIInsights from '../components/Dashboard/AIInsights';

export default function Dashboard() {
  const { state, dispatch } = useROV();
  const [isSimulating, setIsSimulating] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
              // Update sensor data with realistic variations
        const updatedSensors = state.sensors.map(sensor => {
          const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
          const newValue = Math.max(0, sensor.value + (sensor.value * variation));
          
          // Determine status based on value
          let status: 'normal' | 'warning' | 'critical' | 'offline' = 'normal';
          if (sensor.minValue && sensor.maxValue) {
            const percentage = (newValue - sensor.minValue) / (sensor.maxValue - sensor.minValue);
            if (percentage > 0.9 || percentage < 0.1) {
              status = 'warning';
            }
            if (percentage > 0.95 || percentage < 0.05) {
              status = 'critical';
            }
          }

          const trendValue = Math.random();
          const trend: 'up' | 'down' | 'stable' = trendValue > 0.6 ? 'up' : trendValue > 0.3 ? 'down' : 'stable';

          return {
            ...sensor,
            value: Number(newValue.toFixed(1)),
            timestamp: new Date(),
            status,
            trend
          };
        });

      // Update navigation data
      const updatedNavigation = {
        ...state.navigation,
        heading: (state.navigation.heading + (Math.random() - 0.5) * 2) % 360,
        depth: Math.max(0, state.navigation.depth + (Math.random() - 0.5) * 0.5),
        altitude: Math.max(0, state.navigation.altitude + (Math.random() - 0.5) * 0.2),
        pitch: Math.max(-90, Math.min(90, state.navigation.pitch + (Math.random() - 0.5) * 0.5)),
        roll: Math.max(-180, Math.min(180, state.navigation.roll + (Math.random() - 0.5) * 0.5)),
      };

      // Update system status
      const updatedSystemStatus = {
        ...state.systemStatus,
        power: {
          ...state.systemStatus.power,
          battery: Math.max(0, Math.min(100, state.systemStatus.power.battery + (Math.random() - 0.5) * 0.1)),
          voltage: Math.max(20, Math.min(30, state.systemStatus.power.voltage + (Math.random() - 0.5) * 0.1)),
          current: Math.max(0, Math.min(20, state.systemStatus.power.current + (Math.random() - 0.5) * 0.2)),
        },
        communication: {
          ...state.systemStatus.communication,
          signal: Math.max(0, Math.min(100, state.systemStatus.communication.signal + (Math.random() - 0.5) * 2)),
          latency: Math.max(10, Math.min(200, state.systemStatus.communication.latency + (Math.random() - 0.5) * 5)),
        }
      };

      dispatch({ type: 'UPDATE_SENSORS', payload: updatedSensors });
      dispatch({ type: 'UPDATE_NAVIGATION', payload: updatedNavigation });
      dispatch({ type: 'UPDATE_SYSTEM_STATUS', payload: updatedSystemStatus });

      // Occasionally generate alarms for demonstration
      if (Math.random() < 0.01) { // 1% chance every update
        const alarmTypes = [
          { message: 'High temperature detected', severity: 'warning' as const, category: 'sensor' as const },
          { message: 'Communication latency high', severity: 'warning' as const, category: 'communication' as const },
          { message: 'Battery level low', severity: 'critical' as const, category: 'power' as const },
          { message: 'Thruster performance degraded', severity: 'warning' as const, category: 'thruster' as const },
        ];
        
        const randomAlarm = alarmTypes[Math.floor(Math.random() * alarmTypes.length)];
        
        dispatch({
          type: 'ADD_ALARM',
          payload: {
            id: Date.now().toString(),
            timestamp: new Date(),
            severity: randomAlarm.severity,
            category: randomAlarm.category,
            message: randomAlarm.message,
            acknowledged: false,
            resolved: false,
            source: 'System Monitor',
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.sensors, state.navigation, state.systemStatus, dispatch, isSimulating]);

  const handleSimulationToggle = () => {
    setIsSimulating(!isSimulating);
  };

  const handleRefresh = () => {
    // Force refresh all data
    dispatch({ type: 'UPDATE_LAST_UPDATE', payload: new Date() });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isSimulating ? 'Pause simulation' : 'Start simulation'}>
            <IconButton onClick={handleSimulationToggle} color="primary">
              {isSimulating ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>
          <Chip
            label={isSimulating ? 'Live' : 'Paused'}
            color={isSimulating ? 'success' : 'default'}
            size="small"
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* System Status Overview */}
        <Grid xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SystemStatusCard />
          </motion.div>
        </Grid>

        {/* Mission Status */}
        <Grid xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MissionStatus />
          </motion.div>
        </Grid>

        {/* Navigation Display */}
        <Grid xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavigationDisplay />
          </motion.div>
        </Grid>

        {/* Thruster Control */}
        <Grid xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ThrusterControl />
          </motion.div>
        </Grid>

        {/* Sensor Cards */}
        {state.sensors.map((sensor, index) => (
          <Grid xs={12} sm={6} md={3} key={sensor.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <SensorCard sensor={sensor} />
            </motion.div>
          </Grid>
        ))}

        {/* Alarm Summary */}
        <Grid xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <AlarmSummary />
          </motion.div>
        </Grid>

        {/* AI Insights */}
        <Grid xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <AIInsights />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
