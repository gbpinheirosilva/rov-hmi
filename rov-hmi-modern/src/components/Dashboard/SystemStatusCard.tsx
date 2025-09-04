import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  BatteryFull,
  Wifi,
  Cable,
} from '@mui/icons-material';
import { useROV } from '../../context/ROVContext';

export default function SystemStatusCard() {
  const { state } = useROV();
  const { systemStatus } = state;

  const getBatteryColor = (percentage: number) => {
    if (percentage > 50) return 'success';
    if (percentage > 20) return 'warning';
    return 'error';
  };

  const getSignalColor = (percentage: number) => {
    if (percentage > 80) return 'success';
    if (percentage > 50) return 'warning';
    return 'error';
  };

  const getConnectionStatus = (status: string): { color: 'success' | 'error' | 'warning' | 'default', label: string } => {
    switch (status) {
      case 'connected': return { color: 'success', label: 'Connected' };
      case 'disconnected': return { color: 'error', label: 'Disconnected' };
      case 'poor': return { color: 'warning', label: 'Poor' };
      default: return { color: 'default', label: 'Unknown' };
    }
  };

  const getTetherStatus = (status: string): { color: 'success' | 'error' | 'warning' | 'default', label: string } => {
    switch (status) {
      case 'normal': return { color: 'success', label: 'Normal' };
      case 'high-tension': return { color: 'warning', label: 'High Tension' };
      case 'fault': return { color: 'error', label: 'Fault' };
      default: return { color: 'default', label: 'Unknown' };
    }
  };

  return (
    <Card sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          System Status
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Power System */}
          <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
            <Box sx={{ textAlign: 'center' }}>
              <BatteryFull sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {systemStatus.power.battery.toFixed(0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Battery Level
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemStatus.power.battery}
                color={getBatteryColor(systemStatus.power.battery)}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                  <Typography variant="caption" color="text.secondary">
                    Voltage: {systemStatus.power.voltage.toFixed(1)}V
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
                  <Typography variant="caption" color="text.secondary">
                    Current: {systemStatus.power.current.toFixed(1)}A
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Communication */}
          <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
            <Box sx={{ textAlign: 'center' }}>
              <Wifi sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {systemStatus.communication.signal.toFixed(0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Signal Strength
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemStatus.communication.signal}
                color={getSignalColor(systemStatus.communication.signal)}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={getConnectionStatus(systemStatus.communication.status).label}
                  color={getConnectionStatus(systemStatus.communication.status).color}
                  size="small"
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Latency: {systemStatus.communication.latency.toFixed(0)}ms
              </Typography>
            </Box>
          </Box>

          {/* Tether */}
          <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
            <Box sx={{ textAlign: 'center' }}>
              <Cable sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {systemStatus.tether.length.toFixed(0)}m
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Tether Length
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={getTetherStatus(systemStatus.tether.status).label}
                  color={getTetherStatus(systemStatus.tether.status).color}
                  size="small"
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Tension: {systemStatus.tether.tension.toFixed(0)}N
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Overall System Health */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">
              System Health
            </Typography>
            <Chip
              label="Operational"
              color="success"
              size="small"
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={85}
            color="success"
            sx={{ height: 6, borderRadius: 3, mt: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
