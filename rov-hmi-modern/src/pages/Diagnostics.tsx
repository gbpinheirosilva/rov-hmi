import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Refresh,
  CheckCircle,
  Error,
  Warning,
  Info,
  Build,
  Memory,
  Speed,
  BatteryChargingFull,
  Wifi,
  Cable,
  CameraAlt,
  Navigation,
  Settings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface DiagnosticResult {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  progress: number;
  message: string;
  timestamp: Date;
}

interface SystemData {
  name: string;
  data: Array<{
    time: string;
    value: number;
    status: 'normal' | 'warning' | 'critical';
  }>;
  unit: string;
  color: string;
}

const mockTimeSeriesData: SystemData[] = [
  {
    name: 'Power System',
    unit: 'V',
    color: '#4caf50',
    data: Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 30000).toLocaleTimeString(),
      value: 24 + Math.sin(i * 0.5) * 2 + Math.random() * 0.5,
      status: 'normal' as const,
    })),
  },
  {
    name: 'Temperature',
    unit: '°C',
    color: '#ff9800',
    data: Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 30000).toLocaleTimeString(),
      value: 15 + Math.sin(i * 0.3) * 3 + Math.random() * 1,
      status: 'normal' as const,
    })),
  },
  {
    name: 'Pressure',
    unit: 'bar',
    color: '#2196f3',
    data: Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 30000).toLocaleTimeString(),
      value: 15 + Math.sin(i * 0.2) * 2 + Math.random() * 0.3,
      status: 'normal' as const,
    })),
  },
  {
    name: 'Communication Signal',
    unit: '%',
    color: '#9c27b0',
    data: Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 30000).toLocaleTimeString(),
      value: 85 + Math.sin(i * 0.4) * 10 + Math.random() * 5,
      status: 'normal' as const,
    })),
  },
];

const diagnosticSystems = [
  {
    id: 'power',
    name: 'Power System',
    icon: <BatteryChargingFull />,
    description: 'Battery, voltage, current diagnostics',
    estimatedTime: 30,
  },
  {
    id: 'propulsion',
    name: 'Propulsion System',
    icon: <Speed />,
    description: 'Thruster motors, controllers, feedback',
    estimatedTime: 45,
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: <Wifi />,
    description: 'Tether, wireless, data transmission',
    estimatedTime: 20,
  },
  {
    id: 'navigation',
    name: 'Navigation System',
    icon: <Navigation />,
    description: 'IMU, compass, depth sensors',
    estimatedTime: 25,
  },
  {
    id: 'cameras',
    name: 'Camera System',
    icon: <CameraAlt />,
    description: 'All camera feeds and controls',
    estimatedTime: 15,
  },
  {
    id: 'manipulator',
    name: 'Manipulator',
    icon: <Build />,
    description: 'Manipulator joints and grippers',
    estimatedTime: 35,
  },
  {
    id: 'sensors',
    name: 'Environmental Sensors',
    icon: <Memory />,
    description: 'Temperature, pressure, water quality',
    estimatedTime: 20,
  },
  {
    id: 'tether',
    name: 'Tether Management',
    icon: <Cable />,
    description: 'Tether tension, length, integrity',
    estimatedTime: 40,
  },
];

export default function Diagnostics() {
  const [runningDiagnostics, setRunningDiagnostics] = useState<DiagnosticResult[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<SystemData[]>(mockTimeSeriesData);
  const [isRunning, setIsRunning] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(prev => prev.map(system => ({
        ...system,
        data: [
          ...system.data.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            value: system.data[system.data.length - 1].value + (Math.random() - 0.5) * 2,
            status: 'normal' as const,
          },
        ],
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runDiagnostic = (systemId: string) => {
    const system = diagnosticSystems.find(s => s.id === systemId);
    if (!system) return;

    const diagnostic: DiagnosticResult = {
      id: systemId,
      name: system.name,
      status: 'running',
      progress: 0,
      message: 'Initializing diagnostic...',
      timestamp: new Date(),
    };

    setRunningDiagnostics(prev => [...prev, diagnostic]);
    setIsRunning(true);

    // Simulate diagnostic progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setRunningDiagnostics(prev => prev.map(d => 
          d.id === systemId 
            ? { ...d, status: 'completed', progress: 100, message: 'Diagnostic completed successfully' }
            : d
        ));
        clearInterval(progressInterval);
        setIsRunning(false);
      } else {
        setRunningDiagnostics(prev => prev.map(d => 
          d.id === systemId 
            ? { 
                ...d, 
                progress, 
                message: progress < 30 ? 'Checking hardware...' :
                         progress < 60 ? 'Testing sensors...' :
                         progress < 90 ? 'Validating data...' :
                         'Finalizing results...'
              }
            : d
        ));
      }
    }, 1000);
  };

  const runAllDiagnostics = () => {
    diagnosticSystems.forEach(system => {
      if (!runningDiagnostics.find(d => d.id === system.id)) {
        runDiagnostic(system.id);
      }
    });
  };

  const stopDiagnostic = (systemId: string) => {
    setRunningDiagnostics(prev => prev.filter(d => d.id !== systemId));
  };

  const clearCompleted = () => {
    setRunningDiagnostics(prev => prev.filter(d => d.status === 'running'));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <PlayArrow color="primary" />;
      case 'completed': return <CheckCircle color="success" />;
      case 'failed': return <Error color="error" />;
      case 'pending': return <Info color="info" />;
      default: return <Info />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'primary';
      case 'completed': return 'success';
      case 'failed': return 'error';
      case 'pending': return 'default';
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
          System Diagnostics
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={runAllDiagnostics}
            disabled={isRunning}
            sx={{
              background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
              '&:hover': {
                background: 'linear-gradient(45deg, #388e3c, #4caf50)',
              }
            }}
          >
            Run All Diagnostics
          </Button>
          <Button
            variant="outlined"
            onClick={clearCompleted}
            disabled={runningDiagnostics.length === 0}
          >
            Clear Completed
          </Button>
        </Box>
      </Box>

      {/* Time Series Charts */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
          Real-time System Monitoring
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {timeSeriesData.map((system, index) => (
            <Box sx={{ flex: "1 1 50%", minWidth: "300px" }} key={system.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  height: 300,
                  background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                  border: '1px solid rgba(0, 188, 212, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                      {system.name}
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={system.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="time" 
                          stroke="rgba(255,255,255,0.7)"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.7)"
                          fontSize={12}
                        />
                        <RechartsTooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 8,
                            color: 'white'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={system.color}
                          fill={system.color}
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Current: {system.data[system.data.length - 1]?.value.toFixed(1)} {system.unit}
                      </Typography>
                      <Chip
                        label="Normal"
                        color="success"
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Diagnostic Systems */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
          System Diagnostics
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {diagnosticSystems.map((system, index) => {
            const isRunning = runningDiagnostics.find(d => d.id === system.id);
            return (
              <Box sx={{ flex: "1 1 25%", minWidth: "200px" }} key={system.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                    border: '1px solid rgba(0, 188, 212, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          mr: 2
                        }}>
                          {system.icon}
                        </Box>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                          {system.name}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {system.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Settings sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          Est. {system.estimatedTime}s
                        </Typography>
                      </Box>

                      {isRunning && (
                        <Box sx={{ mb: 2 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={isRunning.progress} 
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {isRunning.message}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {!isRunning ? (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<PlayArrow />}
                            onClick={() => runDiagnostic(system.id)}
                            fullWidth
                            sx={{
                              background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                              }
                            }}
                          >
                            Run
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Stop />}
                            onClick={() => stopDiagnostic(system.id)}
                            fullWidth
                            color="error"
                          >
                            Stop
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Running Diagnostics Status */}
      {runningDiagnostics.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            Running Diagnostics
          </Typography>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
            border: '1px solid rgba(0, 188, 212, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <List>
              {runningDiagnostics.map((diagnostic, index) => (
                <React.Fragment key={diagnostic.id}>
                  <ListItem>
                    <ListItemIcon>
                      {getStatusIcon(diagnostic.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {diagnostic.name}
                          </Typography>
                          <Chip
                            label={diagnostic.status.toUpperCase()}
                            color={getStatusColor(diagnostic.status) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {diagnostic.message}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={diagnostic.progress} 
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {diagnostic.progress.toFixed(0)}% - {diagnostic.timestamp.toLocaleTimeString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < runningDiagnostics.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Box>
      )}
    </Box>
  );
}