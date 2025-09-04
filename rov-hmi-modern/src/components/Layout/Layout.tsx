import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MonitorHeart as DiagnosticsIcon,
  Videocam as CameraIcon,
  Warning as AlarmIcon,
  FlightTakeoff as MissionIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  BatteryFull as BatteryIcon,
  SignalCellular4Bar as SignalIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useROV } from '../../context/ROVContext';
import { format } from 'date-fns';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Diagnostics', icon: <DiagnosticsIcon />, path: '/diagnostics' },
  { text: 'Cameras', icon: <CameraIcon />, path: '/cameras' },
  { text: 'Alarms', icon: <AlarmIcon />, path: '/alarms' },
  { text: 'Mission', icon: <MissionIcon />, path: '/mission' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useROV();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const path = menuItems[newValue]?.path;
    if (path) {
      navigate(path);
    }
  };

  const getCurrentTabIndex = () => {
    const currentPath = location.pathname;
    const index = menuItems.findIndex(item => item.path === currentPath);
    return index >= 0 ? index : 0;
  };

  const activeAlarms = state.alarms.filter(alarm => !alarm.acknowledged && !alarm.resolved);
  const criticalAlarms = activeAlarms.filter(alarm => alarm.severity === 'critical' || alarm.severity === 'emergency');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top App Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src={require('../../images/abyss-logo.png')}
              alt="Abyss Logo"
              sx={{ height: 50, width: 60, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
              }}
            >
              ROV Telemetry
            </Typography>
          </Box>

          {/* Status Indicators */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            {/* Connection Status */}
            <Tooltip title={state.isConnected ? 'Connected' : 'Disconnected'}>
              <Chip
                icon={state.isConnected ? <WifiIcon /> : <WifiOffIcon />}
                label={state.isConnected ? 'Connected' : 'Disconnected'}
                color={state.isConnected ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </Tooltip>

            {/* Battery Status */}
            <Tooltip title={`Battery: ${state.systemStatus.power.battery}%`}>
              <Chip
                icon={<BatteryIcon />}
                label={`${state.systemStatus.power.battery}%`}
                color={state.systemStatus.power.battery > 20 ? 'success' : 'warning'}
                size="small"
                variant="outlined"
              />
            </Tooltip>

            {/* Signal Strength */}
            <Tooltip title={`Signal: ${state.systemStatus.communication.signal}%`}>
              <Chip
                icon={<SignalIcon />}
                label={`${state.systemStatus.communication.signal}%`}
                color={state.systemStatus.communication.signal > 80 ? 'success' : 'warning'}
                size="small"
                variant="outlined"
              />
            </Tooltip>

            {/* Alarms */}
            <Tooltip title={`${activeAlarms.length} active alarms`}>
              <Badge badgeContent={activeAlarms.length} color="error">
                <Chip
                  icon={<AlarmIcon />}
                  label="Alarms"
                  color={criticalAlarms.length > 0 ? 'error' : 'default'}
                  size="small"
                  variant="outlined"
                />
              </Badge>
            </Tooltip>

            {/* Current Time */}
            <Typography variant="body2" sx={{ minWidth: 80, color: 'text.secondary' }}>
              {format(new Date(), 'HH:mm:ss')}
            </Typography>
          </Box>

          {/* User Profile */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {state.user?.name.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
        </Toolbar>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={getCurrentTabIndex()}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 48,
                textTransform: 'none',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          >
            {menuItems.map((item, index) => (
              <Tab
                key={item.path}
                icon={item.icon}
                label={item.text}
                iconPosition="start"
                sx={{ minWidth: 120 }}
              />
            ))}
          </Tabs>
        </Box>
      </AppBar>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.default',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={() => navigate('/settings')}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <AccountIcon fontSize="small" sx={{ mr: 1 }} />
          Profile
        </MenuItem>
      </Menu>
    </Box>
  );
}