import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
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

const drawerWidth = 240;

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useROV();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const activeAlarms = state.alarms.filter(alarm => !alarm.acknowledged && !alarm.resolved);
  const criticalAlarms = activeAlarms.filter(alarm => alarm.severity === 'critical' || alarm.severity === 'emergency');

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
          ROV HMI
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              cursor: 'pointer',
              backgroundColor: location.pathname === item.path ? 'primary.dark' : 'transparent',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.light' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Tuna II - Deepwater Workclass ROV
          </Typography>

          {/* Status Indicators */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            {/* Connection Status */}
            <Tooltip title={state.isConnected ? 'Connected' : 'Disconnected'}>
              <IconButton color="inherit">
                {state.isConnected ? (
                  <WifiIcon color="success" />
                ) : (
                  <WifiOffIcon color="error" />
                )}
              </IconButton>
            </Tooltip>

            {/* Battery Status */}
            <Tooltip title={`Battery: ${state.systemStatus.power.battery}%`}>
              <IconButton color="inherit">
                <BatteryIcon 
                  color={state.systemStatus.power.battery > 20 ? 'success' : 'warning'} 
                />
              </IconButton>
            </Tooltip>

            {/* Signal Strength */}
            <Tooltip title={`Signal: ${state.systemStatus.communication.signal}%`}>
              <IconButton color="inherit">
                <SignalIcon 
                  color={state.systemStatus.communication.signal > 80 ? 'success' : 'warning'} 
                />
              </IconButton>
            </Tooltip>

            {/* Alarms */}
            <Tooltip title={`${activeAlarms.length} active alarms`}>
              <IconButton color="inherit">
                <Badge badgeContent={activeAlarms.length} color="error">
                  <AlarmIcon color={criticalAlarms.length > 0 ? 'error' : 'inherit'} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Current Time */}
            <Typography variant="body2" sx={{ minWidth: 120 }}>
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
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: 'background.default',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
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
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Menu>
    </Box>
  );
}
