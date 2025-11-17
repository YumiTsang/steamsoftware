import React, { useState } from 'react';
import '../styles/UserProfile.css';

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setEditMode(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'management', label: 'Management', icon: '⚙️' },
    { id: 'preferences', label: 'Preferences', icon: '🎨' },
  ];

  return (
    <div className="user-profile">
      <header className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account and preferences</p>
      </header>

      {/* 標籤導航 */}
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="profile-container">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="profile-section">
            <div className="profile-card">
              <div className="profile-header-card">
                <div className="avatar">👤</div>
                <div className="user-info">
                  <h2>{user?.name || 'User Name'}</h2>
                  <p>{user?.userId || 'user_id'}</p>
                </div>
              </div>

              {!editMode ? (
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{formData.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>User ID:</label>
                    <span>{user?.userId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{formData.email || 'Not set'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{formData.phone || 'Not set'}</span>
                  </div>
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form className="profile-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Management Tab */}
        {activeTab === 'management' && (
          <section className="management-section">
            <div className="management-card">
              <h3>Account Management</h3>
              <div className="management-items">
                <div className="management-item">
                  <div className="item-header">
                    <h4>Learning Progress</h4>
                    <p>Track your learning journey</p>
                  </div>
                  <button className="btn btn-secondary">View Progress</button>
                </div>

                <div className="management-item">
                  <div className="item-header">
                    <h4>My Drawings</h4>
                    <p>View and manage your saved drawings</p>
                  </div>
                  <button className="btn btn-secondary">View Drawings</button>
                </div>

                <div className="management-item">
                  <div className="item-header">
                    <h4>My Projects</h4>
                    <p>Access your projects and assignments</p>
                  </div>
                  <button className="btn btn-secondary">View Projects</button>
                </div>

                <div className="management-item">
                  <div className="item-header">
                    <h4>Change Password</h4>
                    <p>Update your account password</p>
                  </div>
                  <button className="btn btn-secondary">Change Password</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <section className="preferences-section">
            <div className="preferences-card">
              <h3>Display & Theme</h3>
              <div className="preference-item">
                <label>
                  <span>Light Mode</span>
                  <input type="radio" name="theme" value="light" defaultChecked />
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <span>Dark Mode</span>
                  <input type="radio" name="theme" value="dark" />
                </label>
              </div>

              <h3>Learning Preferences</h3>
              <div className="preference-item">
                <label>
                  <span>Difficulty Level</span>
                  <select>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <span>Notifications</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              <button className="btn btn-primary">Save Preferences</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
