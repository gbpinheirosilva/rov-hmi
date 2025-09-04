import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  SensorData, 
  ThrusterData, 
  CameraFeed, 
  Alarm, 
  NavigationData, 
  SystemStatus, 
  MissionData,
  HMISettings,
  DataLog,
  User,
  AIInsight
} from '../types';

// State Interface
interface ROVState {
  sensors: SensorData[];
  thrusters: ThrusterData[];
  cameras: CameraFeed[];
  alarms: Alarm[];
  navigation: NavigationData;
  systemStatus: SystemStatus;
  mission: MissionData | null;
  settings: HMISettings;
  user: User | null;
  dataLogs: DataLog[];
  aiInsights: AIInsight[];
  isConnected: boolean;
  lastUpdate: Date;
}

// Action Types
type ROVAction =
  | { type: 'UPDATE_SENSORS'; payload: SensorData[] }
  | { type: 'UPDATE_THRUSTERS'; payload: ThrusterData[] }
  | { type: 'UPDATE_CAMERAS'; payload: CameraFeed[] }
  | { type: 'ADD_ALARM'; payload: Alarm }
  | { type: 'ACKNOWLEDGE_ALARM'; payload: string }
  | { type: 'RESOLVE_ALARM'; payload: string }
  | { type: 'UPDATE_NAVIGATION'; payload: NavigationData }
  | { type: 'UPDATE_SYSTEM_STATUS'; payload: SystemStatus }
  | { type: 'UPDATE_MISSION'; payload: MissionData }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<HMISettings> }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_DATA_LOG'; payload: DataLog }
  | { type: 'ADD_AI_INSIGHT'; payload: AIInsight }
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'UPDATE_LAST_UPDATE'; payload: Date };

// Initial State
const initialState: ROVState = {
  sensors: [],
  thrusters: [],
  cameras: [],
  alarms: [],
  navigation: {
    heading: 245.3,
    pitch: 4.0,
    roll: 1.0,
    depth: 40.0,
    altitude: 50.0,
    position: { latitude: 0, longitude: 0 },
    speed: 0.5,
    course: 245.3
  },
  systemStatus: {
    power: { battery: 85, voltage: 24.5, current: 12.3 },
    communication: { signal: 95, latency: 45, status: 'connected' },
    tether: { length: 150, tension: 1200, status: 'normal' }
  },
  mission: null,
  settings: {
    theme: 'dark',
    units: { depth: 'meters', temperature: 'celsius', pressure: 'bar' },
    refreshRate: 1000,
    autoSave: true,
    notifications: { audio: true, visual: true, email: false }
  },
  user: null,
  dataLogs: [],
  aiInsights: [],
  isConnected: true,
  lastUpdate: new Date()
};

// Reducer
function rovReducer(state: ROVState, action: ROVAction): ROVState {
  switch (action.type) {
    case 'UPDATE_SENSORS':
      return { ...state, sensors: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_THRUSTERS':
      return { ...state, thrusters: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_CAMERAS':
      return { ...state, cameras: action.payload, lastUpdate: new Date() };
    
    case 'ADD_ALARM':
      return { 
        ...state, 
        alarms: [action.payload, ...state.alarms].slice(0, 100), // Keep last 100 alarms
        lastUpdate: new Date() 
      };
    
    case 'ACKNOWLEDGE_ALARM':
      return {
        ...state,
        alarms: state.alarms.map(alarm =>
          alarm.id === action.payload ? { ...alarm, acknowledged: true } : alarm
        ),
        lastUpdate: new Date()
      };
    
    case 'RESOLVE_ALARM':
      return {
        ...state,
        alarms: state.alarms.map(alarm =>
          alarm.id === action.payload ? { ...alarm, resolved: true } : alarm
        ),
        lastUpdate: new Date()
      };
    
    case 'UPDATE_NAVIGATION':
      return { ...state, navigation: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_SYSTEM_STATUS':
      return { ...state, systemStatus: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_MISSION':
      return { ...state, mission: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload }, lastUpdate: new Date() };
    
    case 'SET_USER':
      return { ...state, user: action.payload, lastUpdate: new Date() };
    
    case 'ADD_DATA_LOG':
      return { 
        ...state, 
        dataLogs: [action.payload, ...state.dataLogs].slice(0, 1000), // Keep last 1000 logs
        lastUpdate: new Date() 
      };
    
    case 'ADD_AI_INSIGHT':
      return { 
        ...state, 
        aiInsights: [action.payload, ...state.aiInsights].slice(0, 50), // Keep last 50 insights
        lastUpdate: new Date() 
      };
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload, lastUpdate: new Date() };
    
    case 'UPDATE_LAST_UPDATE':
      return { ...state, lastUpdate: action.payload };
    
    default:
      return state;
  }
}

// Context
const ROVContext = createContext<{
  state: ROVState;
  dispatch: React.Dispatch<ROVAction>;
} | null>(null);

// Provider Component
interface ROVProviderProps {
  children: ReactNode;
}

export function ROVProvider({ children }: ROVProviderProps) {
  const [state, dispatch] = useReducer(rovReducer, initialState);

  // Initialize with mock data
  useEffect(() => {
    // Initialize sensors
    const initialSensors: SensorData[] = [
      {
        id: 'depth',
        name: 'Depth',
        value: 40.0,
        unit: 'm',
        timestamp: new Date(),
        status: 'normal',
        minValue: 0,
        maxValue: 1000
      },
      {
        id: 'altitude',
        name: 'Altitude',
        value: 50.0,
        unit: 'm',
        timestamp: new Date(),
        status: 'normal',
        minValue: 0,
        maxValue: 200
      },
      {
        id: 'tcu-temp',
        name: 'TCU Temperature',
        value: 34.0,
        unit: '°C',
        timestamp: new Date(),
        status: 'normal',
        minValue: 0,
        maxValue: 80
      },
      {
        id: 'hpu-temp',
        name: 'HPU Temperature',
        value: 32.0,
        unit: '°C',
        timestamp: new Date(),
        status: 'normal',
        minValue: 0,
        maxValue: 80
      },
      {
        id: 'hydraulic-pressure',
        name: 'Hydraulic Pressure',
        value: 50.0,
        unit: 'bar',
        timestamp: new Date(),
        status: 'normal',
        minValue: 0,
        maxValue: 300
      }
    ];

    // Initialize thrusters
    const initialThrusters: ThrusterData[] = [
      { id: 't1', name: 'Port Aft', position: 'port-aft', power: 50, direction: 0, temperature: 25, status: 'active' },
      { id: 't2', name: 'Port Fore', position: 'port-fore', power: 50, direction: 0, temperature: 25, status: 'active' },
      { id: 't3', name: 'Starboard Aft', position: 'starboard-aft', power: 50, direction: 0, temperature: 25, status: 'active' },
      { id: 't4', name: 'Starboard Fore', position: 'starboard-fore', power: 50, direction: 0, temperature: 25, status: 'active' },
      { id: 't5', name: 'Vertical Port', position: 'vertical-port', power: 50, direction: 0, temperature: 25, status: 'active' },
      { id: 't6', name: 'Vertical Starboard', position: 'vertical-starboard', power: 50, direction: 0, temperature: 25, status: 'active' }
    ];

    // Initialize cameras
    const initialCameras: CameraFeed[] = [
      { id: 'cam1', name: 'Front Camera', type: 'front', resolution: '4K', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam2', name: 'Rear Camera', type: 'rear', resolution: '4K', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam3', name: 'Port Camera', type: 'port', resolution: '1080p', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam4', name: 'Starboard Camera', type: 'starboard', resolution: '1080p', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam5', name: 'Top Camera', type: 'top', resolution: '4K', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam6', name: 'Bottom Camera', type: 'bottom', resolution: '4K', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam7', name: 'Manipulator Camera', type: 'manipulator', resolution: '1080p', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' },
      { id: 'cam8', name: 'Tool Camera', type: 'tool', resolution: '1080p', fps: 30, recording: false, zoom: 1, focus: 50, status: 'online' }
    ];

    dispatch({ type: 'UPDATE_SENSORS', payload: initialSensors });
    dispatch({ type: 'UPDATE_THRUSTERS', payload: initialThrusters });
    dispatch({ type: 'UPDATE_CAMERAS', payload: initialCameras });

    // Set initial user
    dispatch({
      type: 'SET_USER',
      payload: {
        id: '1',
        name: 'ROV Operator',
        role: 'operator',
        permissions: ['read', 'control'],
        lastLogin: new Date()
      }
    });
  }, []);

  return (
    <ROVContext.Provider value={{ state, dispatch }}>
      {children}
    </ROVContext.Provider>
  );
}

// Hook to use the context
export function useROV() {
  const context = useContext(ROVContext);
  if (!context) {
    throw new Error('useROV must be used within a ROVProvider');
  }
  return context;
}
