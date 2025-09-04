// Modern ROV HMI Types and Interfaces

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  minValue?: number;
  maxValue?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface ThrusterData {
  id: string;
  name: string;
  position: 'port-aft' | 'port-fore' | 'starboard-aft' | 'starboard-fore' | 'vertical-port' | 'vertical-starboard';
  power: number; // 0-100%
  direction: number; // -180 to 180 degrees
  temperature: number;
  status: 'active' | 'inactive' | 'fault' | 'maintenance';
}

export interface CameraFeed {
  id: string;
  name: string;
  type: 'front' | 'rear' | 'port' | 'starboard' | 'top' | 'bottom' | 'manipulator' | 'tool';
  resolution: string;
  fps: number;
  recording: boolean;
  zoom: number;
  focus: number;
  status: 'online' | 'offline' | 'error';
  streamUrl?: string;
}

export interface Alarm {
  id: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  category: 'system' | 'sensor' | 'thruster' | 'camera' | 'communication' | 'power';
  message: string;
  description?: string;
  acknowledged: boolean;
  resolved: boolean;
  source: string;
}

export interface NavigationData {
  heading: number; // 0-360 degrees
  pitch: number; // -90 to 90 degrees
  roll: number; // -180 to 180 degrees
  depth: number; // meters
  altitude: number; // meters
  position: {
    latitude: number;
    longitude: number;
  };
  speed: number; // knots
  course: number; // degrees
}

export interface SystemStatus {
  power: {
    battery: number; // percentage
    voltage: number; // volts
    current: number; // amps
  };
  communication: {
    signal: number; // percentage
    latency: number; // milliseconds
    status: 'connected' | 'disconnected' | 'poor';
  };
  tether: {
    length: number; // meters
    tension: number; // newtons
    status: 'normal' | 'high-tension' | 'fault';
  };
}

export interface MissionData {
  id: string;
  name: string;
  startTime: Date;
  endTime?: Date;
  waypoints: Array<{
    id: string;
    latitude: number;
    longitude: number;
    depth: number;
    timestamp: Date;
    completed: boolean;
  }>;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'aborted';
}

export interface HMISettings {
  theme: 'dark' | 'light' | 'auto';
  units: {
    depth: 'meters' | 'feet';
    temperature: 'celsius' | 'fahrenheit';
    pressure: 'bar' | 'psi';
  };
  refreshRate: number; // milliseconds
  autoSave: boolean;
  notifications: {
    audio: boolean;
    visual: boolean;
    email: boolean;
  };
}

export interface DataLog {
  id: string;
  timestamp: Date;
  type: 'sensor' | 'alarm' | 'command' | 'system';
  data: any;
  source: string;
}

export interface User {
  id: string;
  name: string;
  role: 'operator' | 'supervisor' | 'engineer' | 'admin';
  permissions: string[];
  lastLogin: Date;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: Array<{
    id: string;
    type: string;
    position: { x: number; y: number; w: number; h: number };
    config: any;
  }>;
  isDefault: boolean;
}

export interface TrendData {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'anomaly' | 'recommendation' | 'optimization';
  title: string;
  description: string;
  confidence: number; // 0-100
  timestamp: Date;
  actionable: boolean;
  category: string;
}
