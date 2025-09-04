import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Chip,
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  Warning,
  Lightbulb,
} from '@mui/icons-material';

export default function AIInsights() {
  const insights = [
    {
      id: '1',
      type: 'optimization',
      title: 'Thruster Efficiency',
      description: 'Consider reducing vertical thruster power by 15% for optimal energy consumption',
      confidence: 87,
      actionable: true,
    },
    {
      id: '2',
      type: 'prediction',
      title: 'Battery Life',
      description: 'Current mission profile suggests 4.2 hours remaining at current power consumption',
      confidence: 92,
      actionable: false,
    },
    {
      id: '3',
      type: 'anomaly',
      title: 'Temperature Trend',
      description: 'TCU temperature showing unusual pattern - monitor for potential cooling issues',
      confidence: 76,
      actionable: true,
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp color="success" />;
      case 'prediction': return <Psychology color="info" />;
      case 'anomaly': return <Warning color="warning" />;
      case 'recommendation': return <Lightbulb color="primary" />;
      default: return <Psychology color="info" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'success';
      case 'prediction': return 'info';
      case 'anomaly': return 'warning';
      case 'recommendation': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          AI Insights
        </Typography>

        <List>
          {insights.map((insight) => (
            <ListItem
              key={insight.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                backgroundColor: 'background.default',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                {getInsightIcon(insight.type)}
                <Typography variant="subtitle2" sx={{ ml: 1, flexGrow: 1 }}>
                  {insight.title}
                </Typography>
                <Chip
                  label={`${insight.confidence}%`}
                  color={insight.confidence > 80 ? 'success' : insight.confidence > 60 ? 'warning' : 'error'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {insight.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={insight.type}
                  color={getInsightColor(insight.type)}
                  size="small"
                  variant="outlined"
                />
                {insight.actionable && (
                  <Chip
                    label="Actionable"
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
