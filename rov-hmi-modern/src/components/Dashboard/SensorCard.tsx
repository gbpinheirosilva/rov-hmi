import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Warning,
  Error,
  CheckCircle,
  OfflineBolt,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { SensorData } from '../../types';

interface SensorCardProps {
  sensor: SensorData;
}

export default function SensorCard({ sensor }: SensorCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle />;
      case 'warning': return <Warning />;
      case 'critical': return <Error />;
      case 'offline': return <OfflineBolt />;
      default: return <CheckCircle />;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp />;
      case 'down': return <TrendingDown />;
      case 'stable': return <TrendingFlat />;
      default: return <TrendingFlat />;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'error';
      case 'stable': return 'info';
      default: return 'info';
    }
  };

  const calculateProgress = () => {
    if (!sensor.minValue || !sensor.maxValue) return 0;
    return ((sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue)) * 100;
  };

  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress > 90 || progress < 10) return 'error';
    if (progress > 80 || progress < 20) return 'warning';
    return 'success';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${
            sensor.status === 'critical' ? 'rgba(244, 67, 54, 0.1)' :
            sensor.status === 'warning' ? 'rgba(255, 152, 0, 0.1)' :
            sensor.status === 'normal' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(102, 102, 102, 0.1)'
          } 0%, rgba(0, 0, 0, 0.3) 100%)`,
          border: `1px solid ${
            sensor.status === 'critical' ? 'rgba(244, 67, 54, 0.3)' :
            sensor.status === 'warning' ? 'rgba(255, 152, 0, 0.3)' :
            sensor.status === 'normal' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(102, 102, 102, 0.3)'
          }`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {sensor.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title={sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}>
                <IconButton size="small" color={getStatusColor(sensor.status)}>
                  {getStatusIcon(sensor.status)}
                </IconButton>
              </Tooltip>
              {sensor.trend && (
                <Tooltip title={`Trend: ${sensor.trend}`}>
                  <IconButton size="small" color={getTrendColor(sensor.trend)}>
                    {getTrendIcon(sensor.trend)}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 700,
                color: sensor.status === 'critical' ? 'error.main' :
                       sensor.status === 'warning' ? 'warning.main' :
                       'text.primary',
                fontSize: '2rem',
              }}
            >
              {sensor.value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {sensor.unit}
            </Typography>
          </Box>

          {sensor.minValue && sensor.maxValue && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {sensor.minValue} {sensor.unit}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {sensor.maxValue} {sensor.unit}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                color={getProgressColor()}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
              color={getStatusColor(sensor.status)}
              size="small"
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              {new Date(sensor.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
