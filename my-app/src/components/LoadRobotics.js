import React, { useState } from 'react';
import '../styles/LoadRobotics.css';

const LoadRobotics = () => {
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [bluetoothStatus, setBluetoothStatus] = useState('disconnected');

  const robots = [
    { id: 1, name: 'Robot A', model: 'RX-100', status: 'available' },
    { id: 2, name: 'Robot B', model: 'RX-200', status: 'available' },
    { id: 3, name: 'Robot C', model: 'RX-300', status: 'available' },
  ];

  const handleRobotSelect = (robot) => {
    setSelectedRobot(robot);
  };

  const handleBluetoothConnect = () => {
    setBluetoothStatus(bluetoothStatus === 'connected' ? 'disconnected' : 'connecting');
    setTimeout(() => {
      setBluetoothStatus(bluetoothStatus === 'connected' ? 'disconnected' : 'connected');
    }, 1000);
  };

  return (
    <div className="load-robotics">
      <header className="robotics-header">
        <h1>Load Robotics</h1>
        <p>Select and connect to your robot</p>
      </header>

      <div className="robotics-container">
        {/* 機器人列表 */}
        <section className="robots-section">
          <h2>Available Robots</h2>
          <div className="robots-list">
            {robots.map((robot) => (
              <div
                key={robot.id}
                className={`robot-card ${selectedRobot?.id === robot.id ? 'selected' : ''}`}
                onClick={() => handleRobotSelect(robot)}
              >
                <div className="robot-icon">⚙️</div>
                <div className="robot-info">
                  <h3>{robot.name}</h3>
                  <p>{robot.model}</p>
                  <span className={`status ${robot.status}`}>{robot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 詳細資訊 */}
        {selectedRobot && (
          <section className="details-section">
            <h2>Robot Details</h2>
            <div className="details-card">
              <div className="detail-item">
                <label>Name:</label>
                <span>{selectedRobot.name}</span>
              </div>
              <div className="detail-item">
                <label>Model:</label>
                <span>{selectedRobot.model}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className={selectedRobot.status}>{selectedRobot.status}</span>
              </div>

              {/* 藍牙連接 */}
              <div className="bluetooth-section">
                <h3>Bluetooth Connection</h3>
                <div className="bluetooth-status">
                  <div className={`status-indicator ${bluetoothStatus}`}></div>
                  <span>{bluetoothStatus.toUpperCase()}</span>
                </div>
                <button
                  className={`connect-btn ${bluetoothStatus === 'connected' ? 'disconnect' : ''}`}
                  onClick={handleBluetoothConnect}
                >
                  {bluetoothStatus === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {/* Hands-on Lab Content */}
              <div className="lab-content-section">
                <h3>Hands-on Lab Content</h3>
                <div className="lab-items">
                  <div className="lab-item">📚 Lesson 1: Basic Movement</div>
                  <div className="lab-item">📚 Lesson 2: Sensor Control</div>
                  <div className="lab-item">📚 Lesson 3: Advanced Programming</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LoadRobotics;
