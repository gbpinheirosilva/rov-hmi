import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ROVProvider } from './context/ROVContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Diagnostics from './pages/Diagnostics';
import Cameras from './pages/Cameras';
import Alarms from './pages/Alarms';
import Mission from './pages/Mission';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Modern dark theme for industrial HMI
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4', // Cyan for primary actions
      light: '#4dd0e1',
      dark: '#00838f',
    },
    secondary: {
      main: '#ff5722', // Orange for warnings
      light: '#ff8a65',
      dark: '#d84315',
    },
    error: {
      main: '#f44336', // Red for critical alerts
    },
    warning: {
      main: '#ff9800', // Amber for warnings
    },
    success: {
      main: '#4caf50', // Green for success states
    },
    info: {
      main: '#2196f3', // Blue for information
    },
    background: {
      default: '#0a0a0a', // Very dark background
      paper: '#1a1a1a', // Slightly lighter for panels
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ROVProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diagnostics" element={<Diagnostics />} />
              <Route path="/cameras" element={<Cameras />} />
              <Route path="/alarms" element={<Alarms />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </ROVProvider>
    </ThemeProvider>
  );
}

export default App;
