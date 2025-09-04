import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
} from '@mui/icons-material';
import { useROV } from '../../context/ROVContext';

export default function AlarmSummary() {
  const { state, dispatch } = useROV();
  const { alarms } = state;

  const activeAlarms = alarms.filter(alarm => !alarm.acknowledged && !alarm.resolved);
  const recentAlarms = activeAlarms.slice(0, 5);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency': return <Error color="error" />;
      case 'critical': return <Error color="error" />;
      case 'warning': return <Warning color="warning" />;
      case 'info': return <Info color="info" />;
      default: return <Info color="info" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'error';
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const handleAcknowledge = (alarmId: string) => {
    dispatch({ type: 'ACKNOWLEDGE_ALARM', payload: alarmId });
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Active Alarms
          </Typography>
          <Chip
            label={`${activeAlarms.length} active`}
            color={activeAlarms.length > 0 ? 'error' : 'success'}
            size="small"
          />
        </Box>

        {recentAlarms.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No active alarms
            </Typography>
          </Box>
        ) : (
          <List>
            {recentAlarms.map((alarm) => (
              <ListItem
                key={alarm.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: 'background.default',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {getSeverityIcon(alarm.severity)}
                </Box>
                <ListItemText
                  primary={alarm.message}
                  secondary={`${alarm.category} • ${new Date(alarm.timestamp).toLocaleTimeString()}`}
                />
                <Chip
                  label={alarm.severity}
                  color={getSeverityColor(alarm.severity)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleAcknowledge(alarm.id)}
                  color="primary"
                >
                  <CheckCircle />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
