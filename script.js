// ROV HMI JavaScript
class ROVHMI {
    constructor() {
        this.currentTab = 'dashboard';
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.updateTime();
        this.setupCameraSelectors();
        this.setupInteractiveElements();
        this.startDataSimulation();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        const now = new Date();
        const timeString = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/,/g, '');
        
        timeElement.textContent = timeString;
        
        // Update time every second
        setTimeout(() => this.updateTime(), 1000);
    }

    setupCameraSelectors() {
        const cameraSelectors = document.querySelectorAll('.camera-selector select');
        
        cameraSelectors.forEach(selector => {
            selector.addEventListener('change', (e) => {
                const cameraSlot = e.target.closest('.camera-slot');
                const cameraPlaceholder = cameraSlot.querySelector('.camera-placeholder');
                const selectedCamera = e.target.value;
                
                // Update the camera placeholder text
                cameraPlaceholder.textContent = `${selectedCamera.charAt(0).toUpperCase() + selectedCamera.slice(1)} Feed`;
                
                // Add some visual feedback
                cameraPlaceholder.style.color = '#66aaff';
                setTimeout(() => {
                    cameraPlaceholder.style.color = '#666';
                }, 1000);
            });
        });
    }

    setupInteractiveElements() {
        // Mode buttons
        const modeButtons = document.querySelectorAll('.mode-value');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleMode(button);
            });
        });

        // Light indicators
        const lightIndicators = document.querySelectorAll('.light-indicator');
        lightIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                this.toggleLight(indicator);
            });
        });

        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleNavigation(button);
            });
        });
    }

    toggleMode(button) {
        const currentMode = button.textContent;
        const newMode = currentMode === 'MANUAL' ? 'AUTO' : 'MANUAL';
        
        button.textContent = newMode;
        
        if (newMode === 'AUTO') {
            button.classList.remove('manual');
            button.classList.add('auto');
            button.style.background = '#003300';
            button.style.borderColor = '#00aa00';
            button.style.color = '#66ff66';
        } else {
            button.classList.remove('auto');
            button.classList.add('manual');
            button.style.background = '#330000';
            button.style.borderColor = '#ff0000';
            button.style.color = '#ff6666';
        }
    }

    toggleLight(indicator) {
        indicator.classList.toggle('active');
    }

    handleNavigation(button) {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('ALARM HISTORY')) {
            this.switchTab('alarm-history');
        } else if (buttonText.includes('GRAPHS')) {
            this.switchTab('waveform');
        } else if (buttonText.includes('DIAGNOSTICS')) {
            this.switchTab('diagnostics');
        }
    }

    startDataSimulation() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateSensorData();
            this.updateGauges();
            this.updateCompass();
        }, 2000);
    }

    updateSensorData() {
        // Update depth
        const depthElement = document.querySelector('.left-panel .status-item:nth-child(1) .value-box');
        if (depthElement) {
            const currentDepth = parseFloat(depthElement.textContent);
            const newDepth = (currentDepth + (Math.random() - 0.5) * 2).toFixed(1);
            depthElement.textContent = newDepth;
        }

        // Update altitude
        const altitudeElement = document.querySelector('.left-panel .status-item:nth-child(2) .value-box');
        if (altitudeElement) {
            const currentAltitude = parseFloat(altitudeElement.textContent);
            const newAltitude = (currentAltitude + (Math.random() - 0.5) * 1).toFixed(1);
            altitudeElement.textContent = newAltitude;
        }

        // Update temperature
        const tempElement = document.querySelector('.left-panel .status-item:nth-child(3) .value-box');
        if (tempElement) {
            const currentTemp = parseFloat(tempElement.textContent);
            const newTemp = (currentTemp + (Math.random() - 0.5) * 0.5).toFixed(1);
            tempElement.textContent = newTemp + ' °C';
        }

        // Update pressure
        const pressureElement = document.querySelector('.left-panel .status-item:nth-child(4) .value-box');
        if (pressureElement) {
            const currentPressure = parseFloat(pressureElement.textContent);
            const newPressure = (currentPressure + (Math.random() - 0.5) * 5).toFixed(0);
            pressureElement.textContent = newPressure + ' bar';
        }
    }

    updateGauges() {
        // Update temperature gauge
        const tempGauge = document.querySelector('.left-panel .status-item:nth-child(3) .gauge-needle');
        if (tempGauge) {
            const newPosition = 20 + Math.random() * 20; // 20-40%
            tempGauge.style.left = newPosition + '%';
        }

        // Update pressure gauge
        const pressureGauge = document.querySelector('.left-panel .status-item:nth-child(4) .gauge-needle');
        if (pressureGauge) {
            const newPosition = 20 + Math.random() * 30; // 20-50%
            pressureGauge.style.left = newPosition + '%';
        }
    }

    updateCompass() {
        const compassNeedle = document.querySelector('.compass-needle');
        if (compassNeedle) {
            const currentRotation = parseFloat(compassNeedle.style.transform.match(/rotate\((\d+(?:\.\d+)?)deg\)/)?.[1] || '245');
            const newRotation = (currentRotation + (Math.random() - 0.5) * 10) % 360;
            compassNeedle.style.transform = `rotate(${newRotation}deg)`;
            
            // Update compass title
            const compassTitle = document.querySelector('.compass-title');
            if (compassTitle) {
                compassTitle.textContent = `COMPASS ${newRotation.toFixed(1)}°`;
            }
        }
    }

    // Method to add new alarms
    addAlarm(message) {
        const alarmList = document.querySelector('.alarm-list');
        if (alarmList) {
            const now = new Date();
            const timeString = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(/,/g, '');
            
            const alarmItem = document.createElement('div');
            alarmItem.className = 'alarm-item';
            alarmItem.innerHTML = `
                <span class="alarm-time">${timeString}</span>
                <span class="alarm-message">- ${message}</span>
            `;
            
            alarmList.insertBefore(alarmItem, alarmList.firstChild);
            
            // Update alarm count
            const alarmCount = document.querySelector('.alarms-count');
            if (alarmCount) {
                const currentCount = parseInt(alarmCount.textContent.match(/\d+/)?.[0] || '0');
                alarmCount.textContent = `Active Alarms: ${currentCount + 1}`;
            }
        }
    }

    // Method to simulate system events
    simulateSystemEvent() {
        const events = [
            'HPU LEAK',
            'TCU OVERHEAT',
            'THRUSTER FAILURE',
            'SENSOR OFFLINE',
            'COMMUNICATION LOST',
            'BATTERY LOW',
            'HYDRAULIC PRESSURE LOW',
            'COMPENSATOR FAILURE'
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        this.addAlarm(randomEvent);
    }
}

// Initialize the HMI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const hmi = new ROVHMI();
    
    // Simulate some system events for demonstration
    setTimeout(() => {
        hmi.simulateSystemEvent();
    }, 5000);
    
    setTimeout(() => {
        hmi.simulateSystemEvent();
    }, 15000);
    
    // Make HMI instance globally available for debugging
    window.rovHMI = hmi;
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                window.rovHMI?.switchTab('dashboard');
                break;
            case '2':
                e.preventDefault();
                window.rovHMI?.switchTab('diagnostics');
                break;
            case '3':
                e.preventDefault();
                window.rovHMI?.switchTab('alarm-history');
                break;
            case '4':
                e.preventDefault();
                window.rovHMI?.switchTab('waveform');
                break;
            case '5':
                e.preventDefault();
                window.rovHMI?.switchTab('cameras');
                break;
        }
    }
});
