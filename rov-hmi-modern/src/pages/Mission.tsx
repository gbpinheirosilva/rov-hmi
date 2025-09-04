import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  CheckCircle,
  RadioButtonUnchecked,
  Add,
  Edit,
  Delete,
  Navigation,
  Schedule,
  Timer,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface MissionStep {
  id: string;
  title: string;
  description: string;
  type: 'navigation' | 'inspection' | 'manipulation' | 'sampling';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedDuration: number; // minutes
  actualDuration?: number;
  waypoint?: {
    latitude: number;
    longitude: number;
    depth: number;
  };
}

interface Mission {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  startTime?: Date;
  endTime?: Date;
  steps: MissionStep[];
  totalEstimatedDuration: number;
  progress: number;
}

const mockMission: Mission = {
  id: '1',
  name: 'Deep Sea Inspection Mission',
  description: 'Comprehensive inspection of underwater structure at 150m depth',
  status: 'active',
  startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  steps: [
    {
      id: '1',
      title: 'Descent to Target Depth',
      description: 'Navigate to target location at 150m depth',
      type: 'navigation',
      status: 'completed',
      estimatedDuration: 10,
      actualDuration: 12,
      waypoint: { latitude: 45.5231, longitude: -73.5534, depth: 150 },
    },
    {
      id: '2',
      title: 'Visual Inspection - Port Side',
      description: 'Complete visual inspection of port side structure',
      type: 'inspection',
      status: 'completed',
      estimatedDuration: 15,
      actualDuration: 18,
    },
    {
      id: '3',
      title: 'Visual Inspection - Starboard Side',
      description: 'Complete visual inspection of starboard side structure',
      type: 'inspection',
      status: 'in_progress',
      estimatedDuration: 15,
    },
    {
      id: '4',
      title: 'Sample Collection',
      description: 'Collect sediment samples from base of structure',
      type: 'sampling',
      status: 'pending',
      estimatedDuration: 20,
    },
    {
      id: '5',
      title: 'Manipulator Test',
      description: 'Test manipulator functionality and dexterity',
      type: 'manipulation',
      status: 'pending',
      estimatedDuration: 10,
    },
    {
      id: '6',
      title: 'Ascent to Surface',
      description: 'Return to surface following safety protocols',
      type: 'navigation',
      status: 'pending',
      estimatedDuration: 15,
    },
  ],
  totalEstimatedDuration: 85,
  progress: 35,
};

export default function Mission() {
  const [mission, setMission] = useState<Mission>(mockMission);
  const [selectedStep, setSelectedStep] = useState<MissionStep | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'navigation': return <Navigation />;
      case 'inspection': return <CheckCircle />;
      case 'manipulation': return <Edit />;
      case 'sampling': return <Add />;
      default: return <RadioButtonUnchecked />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'failed': return 'error';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'primary';
      case 'paused': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'planning': return 'default';
      default: return 'default';
    }
  };

  const startMission = () => {
    setMission(prev => ({
      ...prev,
      status: 'active',
      startTime: new Date(),
    }));
  };

  const pauseMission = () => {
    setMission(prev => ({
      ...prev,
      status: 'paused',
    }));
  };

  const resumeMission = () => {
    setMission(prev => ({
      ...prev,
      status: 'active',
    }));
  };

  const completeStep = (stepId: string) => {
    setMission(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId
          ? { ...step, status: 'completed' as const, actualDuration: step.estimatedDuration }
          : step
      ),
      progress: Math.min(100, prev.progress + (100 / prev.steps.length)),
    }));
  };

  const startStep = (stepId: string) => {
    setMission(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId
          ? { ...step, status: 'in_progress' as const }
          : step
      ),
    }));
  };

  const elapsedTime = mission.startTime 
    ? Math.floor((Date.now() - mission.startTime.getTime()) / (1000 * 60))
    : 0;

  const remainingTime = mission.totalEstimatedDuration - elapsedTime;

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
        <Box>
          <Typography variant="h4" component="h1" sx={{ 
            background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mb: 1
          }}>
            Mission Control
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {mission.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {mission.status === 'planning' && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={startMission}
              sx={{
                background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                }
              }}
            >
              Start Mission
            </Button>
          )}
          {mission.status === 'active' && (
            <Button
              variant="contained"
              startIcon={<Pause />}
              onClick={pauseMission}
              sx={{
                background: 'linear-gradient(45deg, #ff9800, #ffb74d)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #f57c00, #ff9800)',
                }
              }}
            >
              Pause
            </Button>
          )}
          {mission.status === 'paused' && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={resumeMission}
              sx={{
                background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                }
              }}
            >
              Resume
            </Button>
          )}
          <Chip
            label={mission.status.toUpperCase()}
            color={getMissionStatusColor(mission.status) as any}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Box>

      {/* Mission Overview */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexShrink: 0 }}>
        <Card sx={{ 
          flex: 1,
          background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mission Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={mission.progress}
              sx={{ height: 10, borderRadius: 5, mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              {mission.progress.toFixed(1)}% Complete
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ textAlign: 'center', minWidth: 150 }}>
            <Timer sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {elapsedTime}m
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Elapsed Time
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(255, 152, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent sx={{ textAlign: 'center', minWidth: 150 }}>
            <Schedule sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {remainingTime}m
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Remaining
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Mission Steps */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <Card sx={{ 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mission Steps
            </Typography>
            <List>
              {mission.steps.map((step, index) => (
                <motion.div
                  key={step.id}
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
                      {getStepIcon(step.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {step.title}
                          </Typography>
                          <Chip
                            label={step.status.replace('_', ' ').toUpperCase()}
                            color={getStepColor(step.status) as any}
                            size="small"
                          />
                          <Chip
                            label={`${step.estimatedDuration}m`}
                            color="default"
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {step.description}
                          </Typography>
                          {step.waypoint && (
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {step.waypoint.latitude.toFixed(4)}°, {step.waypoint.longitude.toFixed(4)}°
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Depth: {step.waypoint.depth}m
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {step.status === 'pending' && (
                        <Tooltip title="Start Step">
                          <IconButton
                            onClick={() => startStep(step.id)}
                            sx={{ color: 'primary.main' }}
                          >
                            <PlayArrow />
                          </IconButton>
                        </Tooltip>
                      )}
                      {step.status === 'in_progress' && (
                        <Tooltip title="Complete Step">
                          <IconButton
                            onClick={() => completeStep(step.id)}
                            sx={{ color: 'success.main' }}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                      )}
                      {step.status === 'completed' && (
                        <CheckCircle sx={{ color: 'success.main' }} />
                      )}
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Step Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Step Details</DialogTitle>
        <DialogContent>
          {selectedStep && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedStep.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedStep.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Typography variant="subtitle2">Type:</Typography>
                  <Typography variant="body2">{selectedStep.type}</Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2">Status:</Typography>
                  <Typography variant="body2">{selectedStep.status}</Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2">Estimated Duration:</Typography>
                  <Typography variant="body2">{selectedStep.estimatedDuration} minutes</Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2">Actual Duration:</Typography>
                  <Typography variant="body2">
                    {selectedStep.actualDuration ? `${selectedStep.actualDuration} minutes` : 'Not completed'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}