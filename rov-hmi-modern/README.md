# Modern ROV HMI - React Edition

A cutting-edge Human-Machine Interface (HMI) for deepwater workclass Remotely Operated Vehicles (ROV) built with React, TypeScript, and Material-UI. This modern implementation incorporates contemporary HMI design principles, real-time data visualization, and advanced user experience features.

## 🚀 Modern Features

### 🎯 **Advanced Dashboard**
- **Real-time Data Visualization**: Live sensor data with animated gauges and trend indicators
- **Interactive Navigation Display**: 3D compass with dynamic heading visualization
- **System Health Monitoring**: Comprehensive power, communication, and tether status
- **AI-Powered Insights**: Machine learning recommendations and anomaly detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 **Modern HMI Principles**
- **Contextual Information Display**: Relevant data presented at the right time
- **Progressive Disclosure**: Information hierarchy with drill-down capabilities
- **Predictive Analytics**: AI-driven insights for proactive maintenance
- **Situational Awareness**: Enhanced operator understanding through visual cues
- **Error Prevention**: Smart validation and confirmation workflows

### 📊 **Real-time Monitoring**
- **Live Sensor Data**: Temperature, pressure, depth, altitude with trend analysis
- **Thruster Control**: Visual thruster status with power and direction indicators
- **Alarm Management**: Intelligent alarm prioritization and acknowledgment
- **Mission Status**: Real-time mission progress and waypoint tracking
- **System Diagnostics**: Comprehensive health monitoring and diagnostics

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript for type-safe development
- **Material-UI (MUI)** for modern, accessible components
- **Framer Motion** for smooth animations and transitions
- **React Router** for navigation and routing
- **Recharts** for advanced data visualization

### **State Management**
- **React Context API** with useReducer for centralized state management
- **Real-time Data Simulation** with configurable update intervals
- **Persistent Settings** with localStorage integration

### **Modern Development Tools**
- **TypeScript** for type safety and better developer experience
- **ESLint & Prettier** for code quality and formatting
- **Hot Module Replacement** for fast development cycles

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/       # Dashboard-specific components
│   └── Layout/          # Layout and navigation components
├── context/             # React Context for state management
├── pages/               # Page components for routing
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and helpers
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Cyan (#00bcd4) - Primary actions and highlights
- **Secondary**: Orange (#ff5722) - Warnings and secondary actions
- **Success**: Green (#4caf50) - Normal states and success indicators
- **Warning**: Amber (#ff9800) - Caution and warning states
- **Error**: Red (#f44336) - Critical alerts and errors
- **Background**: Dark (#0a0a0a) - Industrial dark theme

### **Typography**
- **Font Family**: Roboto Mono, Courier New (monospace for technical data)
- **Hierarchy**: Clear heading structure with consistent sizing
- **Readability**: High contrast for industrial environments

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd rov-hmi-modern

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_UPDATE_INTERVAL=1000
```

### **Customization**
- **Theme**: Modify `App.tsx` for color scheme changes
- **Data Sources**: Update `ROVContext.tsx` for real data integration
- **Components**: Extend components in `components/` directory

## 📊 Data Integration

### **Real-time Data Sources**
The system is designed to integrate with:
- **WebSocket APIs** for live data streaming
- **REST APIs** for configuration and historical data
- **OPC UA** for industrial protocol integration
- **MQTT** for IoT sensor data

### **Data Types**
- **Sensor Data**: Temperature, pressure, depth, altitude
- **Navigation**: Heading, pitch, roll, position, speed
- **System Status**: Power, communication, tether status
- **Alarms**: System alerts with severity and categorization
- **Mission Data**: Waypoints, progress, and status

## 🎯 Modern HMI Features

### **1. Intelligent Dashboard**
- **Adaptive Layout**: Widgets rearrange based on importance
- **Contextual Information**: Relevant data highlighted during operations
- **Predictive Indicators**: Early warning systems for potential issues

### **2. Advanced Visualization**
- **3D Navigation Display**: Immersive compass and orientation
- **Trend Analysis**: Historical data with predictive curves
- **Heat Maps**: Visual representation of system status

### **3. AI-Powered Insights**
- **Anomaly Detection**: Automatic identification of unusual patterns
- **Predictive Maintenance**: Early warning for component failures
- **Optimization Recommendations**: AI-suggested operational improvements

### **4. Enhanced User Experience**
- **Gesture Controls**: Touch and swipe support for tablets
- **Voice Commands**: Hands-free operation capabilities
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design

## 🔒 Security Features

- **Role-based Access Control**: Different permission levels for operators
- **Audit Logging**: Complete operation history tracking
- **Secure Communication**: Encrypted data transmission
- **Session Management**: Automatic timeout and re-authentication

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: 1200px+ (Full feature set)
- **Tablet**: 768px-1199px (Optimized touch interface)
- **Mobile**: <768px (Essential functions only)

### **Adaptive Features**
- **Collapsible Sidebar**: Space optimization on smaller screens
- **Touch-friendly Controls**: Larger touch targets for mobile
- **Simplified Navigation**: Streamlined menu for mobile users

## 🚀 Future Enhancements

### **Planned Features**
- **Augmented Reality**: AR overlay for enhanced situational awareness
- **Machine Learning**: Advanced predictive analytics
- **Cloud Integration**: Remote monitoring and data analytics
- **Multi-ROV Support**: Fleet management capabilities
- **Advanced Mission Planning**: 3D mission visualization

### **Integration Roadmap**
- **OPC UA Client**: Industrial protocol support
- **Database Integration**: Historical data storage
- **API Gateway**: Microservices architecture
- **Container Deployment**: Docker and Kubernetes support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for the comprehensive component library
- **Framer Motion** for smooth animations
- **React Community** for excellent documentation and tools
- **Industrial HMI Standards** for design guidance and best practices

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for the future of underwater operations**