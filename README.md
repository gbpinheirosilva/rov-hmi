# ROV HMI - Tuna II

A mock Human-Machine Interface (HMI) for a deepwater workclass Remotely Operated Vehicle (ROV) system. This is a non-functional prototype designed to demonstrate the interface layout and user experience of an industrial ROV control system.

## Features

### Dashboard Tab
- **System Status**: Real-time display of depth, altitude, temperature, pressure, and compensator status
- **Interactive Gauges**: Visual gauges with animated needles showing system parameters
- **ROV Visualization**: 3D wireframe model with compass and thruster indicators
- **Alarm Panel**: Active alarm counter and status display

### Diagnostics Tab
- **Pilot Panel**: Joystick and trim control voltage readings (input data)
- **Vehicle Actuators**: Thruster control unit (TCU) status and light controls (output data)
- **Analog Sensors**: Pressure, temperature, and compensator readings (input data)
- **Serial Interface Sensors**: Altimeter, gyro, AHRS, and turns counter data (input data)

### Alarm History Tab
- **Alarm List**: Chronological display of system alarms and warnings
- **Alarm Details**: Detailed information panel for selected alarms

### Waveform Chart Tab
- **Multi-Channel Display**: Four stacked waveform charts for joystick data
- **Interactive Controls**: Zoom and pan functionality
- **Real-time Data**: Simulated joystick position data visualization

### Camera Views Tab
- **4x4 Grid Layout**: 16 camera feed slots in a grid arrangement
- **Camera Selection**: Dropdown menus to select different camera feeds
- **Available Cameras**: Front, Rear, Port, Starboard, Top, Bottom, Manipulator, and Tool cameras

## Technical Features

### Interactive Elements
- **Tab Navigation**: Click tabs or use keyboard shortcuts (Ctrl+1-5)
- **Mode Toggles**: Click on mode indicators to switch between Manual/Auto
- **Light Controls**: Click light indicators to toggle on/off
- **Navigation Buttons**: Quick access to different HMI sections

### Real-time Simulation
- **Data Updates**: Simulated sensor data updates every 2 seconds
- **Gauge Animation**: Animated gauge needles responding to data changes
- **Compass Movement**: Dynamic compass needle rotation
- **Alarm Generation**: Simulated system events and alarms

### Responsive Design
- **Adaptive Layout**: Responsive design for different screen sizes
- **Mobile Friendly**: Optimized for tablet and mobile viewing
- **Industrial Aesthetic**: Dark theme with high contrast colors for industrial environments

## File Structure

```
rov-hmi/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Usage

1. Open `index.html` in a web browser
2. Navigate between tabs using the tab buttons or keyboard shortcuts
3. Interact with various controls and indicators
4. Observe real-time data simulation and animations

## Keyboard Shortcuts

- `Ctrl+1`: Dashboard tab
- `Ctrl+2`: Diagnostics tab
- `Ctrl+3`: Alarm History tab
- `Ctrl+4`: Waveform Chart tab
- `Ctrl+5`: Camera Views tab

## Browser Compatibility

- Modern web browsers (Chrome, Firefox, Safari, Edge)
- HTML5 and CSS3 support required
- JavaScript ES6+ features used

## Customization

### Company Logo
Replace the "LOGO" placeholder in the header with your company logo:
```html
<div class="company-logo">
    <img src="your-logo.png" alt="Company Logo" />
</div>
```

### Color Scheme
Modify the CSS variables in `styles.css` to match your brand colors:
- Primary blue: `#0066cc`
- Warning red: `#ff0000`
- Success green: `#00aa00`
- Warning yellow: `#ffaa00`

### Data Sources
The JavaScript file contains simulation functions that can be replaced with real data sources:
- `updateSensorData()`: Replace with actual sensor API calls
- `updateGauges()`: Connect to real-time gauge data
- `updateCompass()`: Link to navigation system data

## Future Enhancements

- Real-time data integration
- WebSocket connections for live updates
- User authentication and permissions
- Data logging and export functionality
- Advanced alarm management
- Customizable dashboard layouts
- Multi-language support

## License

This project is a mock prototype for demonstration purposes. Please ensure compliance with your organization's policies when using or modifying this code.
