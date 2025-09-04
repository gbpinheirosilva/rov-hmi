import React, { useEffect, useState } from 'react';
import {
  Grid,
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
    <Box sx={{ 
      height: '100vh', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
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

      <Box sx={{ 
        flex: 1, 
        p: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        gap: 2,
        height: 'calc(100vh - 120px)'
      }}>
        {/* System Status - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            gridColumn: '1 / 9', 
            gridRow: '1 / 3',
            height: '100%'
          }}
        >
          <SystemStatusCard />
        </motion.div>

        {/* Mission Status - Top Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            gridColumn: '9 / 13', 
            gridRow: '1 / 3',
            height: '100%'
          }}
        >
          <MissionStatus />
        </motion.div>

        {/* Navigation Display - Middle Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            gridColumn: '1 / 7', 
            gridRow: '3 / 5',
            height: '100%'
          }}
        >
          <NavigationDisplay />
        </motion.div>

        {/* Thruster Control - Middle Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ 
            gridColumn: '7 / 13', 
            gridRow: '3 / 5',
            height: '100%'
          }}
        >
          <ThrusterControl />
        </motion.div>

        {/* Sensor Cards - Bottom Row */}
        {state.sensors.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            style={{ 
              gridColumn: `${(index % 4) * 3 + 1} / ${(index % 4) * 3 + 4}`, 
              gridRow: '5 / 7',
              height: '100%'
            }}
          >
            <SensorCard sensor={sensor} />
          </motion.div>
        ))}

        {/* Alarm Summary - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ 
            gridColumn: '1 / 7', 
            gridRow: '5 / 7',
            height: '100%'
          }}
        >
          <AlarmSummary />
        </motion.div>

        {/* AI Insights - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ 
            gridColumn: '7 / 13', 
            gridRow: '5 / 7',
            height: '100%'
          }}
        >
          <AIInsights />
        </motion.div>
      </Box>
    </Box>
  );
}
