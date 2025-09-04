import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Badge,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Search,
  FilterList,
  Clear,
  Notifications,
  NotificationsActive,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Alarm {
  id: string;
  title: string;
  message: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: Date;
  source: string;
  category: string;
}

const mockAlarms: Alarm[] = [
  {
    id: '1',
    title: 'Battery Low',
    message: 'Battery level has dropped below 20%. Consider returning to surface.',
    priority: 'high',
    status: 'active',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    source: 'Power System',
    category: 'Power',
  },
  {
    id: '2',
    title: 'Tether Tension High',
    message: 'Tether tension exceeds normal operating parameters.',
    priority: 'critical',
    status: 'active',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    source: 'Tether Management',
    category: 'Mechanical',
  },
  {
    id: '3',
    title: 'Camera 3 Offline',
    message: 'Port camera has lost communication with the control system.',
    priority: 'medium',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    source: 'Camera System',
    category: 'Communication',
  },
  {
    id: '4',
    title: 'Depth Sensor Calibration',
    message: 'Depth sensor requires calibration before next dive.',
    priority: 'low',
    status: 'resolved',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: 'Navigation',
    category: 'Navigation',
  },
  {
    id: '5',
    title: 'Thruster 2 Overheating',
    message: 'Port thruster temperature exceeds safe operating limits.',
    priority: 'critical',
    status: 'active',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    source: 'Propulsion',
    category: 'Mechanical',
  },
];

export default function Alarms() {
  const [alarms, setAlarms] = useState<Alarm[]>(mockAlarms);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <Error />;
      case 'high': return <Warning />;
      case 'medium': return <Info />;
      case 'low': return <CheckCircle />;
      default: return <Info />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'error';
      case 'acknowledged': return 'warning';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const filteredAlarms = alarms.filter(alarm => {
    const matchesSearch = alarm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || alarm.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || alarm.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const activeAlarms = alarms.filter(alarm => alarm.status === 'active');
  const criticalAlarms = alarms.filter(alarm => alarm.priority === 'critical' && alarm.status === 'active');

  const acknowledgeAlarm = (id: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, status: 'acknowledged' as const } : alarm
    ));
  };

  const resolveAlarm = (id: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, status: 'resolved' as const } : alarm
    ));
  };

  const clearAllAlarms = () => {
    setAlarms(prev => prev.map(alarm => ({ ...alarm, status: 'resolved' as const })));
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ 
            background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Alarm Management
          </Typography>
          <Badge badgeContent={activeAlarms.length} color="error">
            <NotificationsActive sx={{ color: 'primary.main' }} />
          </Badge>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={clearAllAlarms}
            disabled={activeAlarms.length === 0}
            sx={{
              background: 'linear-gradient(45deg, #f44336, #e57373)',
              '&:hover': {
                background: 'linear-gradient(45deg, #d32f2f, #f44336)',
              }
            }}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexShrink: 0 }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(244, 67, 54, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {criticalAlarms.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Critical Alarms
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(255, 152, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
              {activeAlarms.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Alarms
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Filters */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexShrink: 0 }}>
        <TextField
          placeholder="Search alarms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            label="Priority"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="acknowledged">Acknowledged</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Alarms List */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <Card sx={{ 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ height: '100%', p: 0 }}>
            <List sx={{ height: '100%', overflow: 'auto' }}>
              {filteredAlarms.map((alarm, index) => (
                <motion.div
                  key={alarm.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ListItem
                    sx={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      {getPriorityIcon(alarm.priority)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {alarm.title}
                          </Typography>
                          <Chip
                            label={alarm.priority.toUpperCase()}
                            color={getPriorityColor(alarm.priority) as any}
                            size="small"
                          />
                          <Chip
                            label={alarm.status.toUpperCase()}
                            color={getStatusColor(alarm.status) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {alarm.message}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              {alarm.timestamp.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Source: {alarm.source}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Category: {alarm.category}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {alarm.status === 'active' && (
                        <Tooltip title="Acknowledge">
                          <IconButton
                            onClick={() => acknowledgeAlarm(alarm.id)}
                            sx={{ color: 'warning.main' }}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                      )}
                      {alarm.status === 'acknowledged' && (
                        <Tooltip title="Resolve">
                          <IconButton
                            onClick={() => resolveAlarm(alarm.id)}
                            sx={{ color: 'success.main' }}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
              {filteredAlarms.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Notifications sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No alarms found
                  </Typography>
                </Box>
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}