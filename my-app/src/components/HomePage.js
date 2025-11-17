import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'stem', name: 'STEM', icon: '🔬', color: '#667eea' },
    { id: 'ai', name: 'AI Programming', icon: '🤖', color: '#764ba2' },
    { id: 'robotics', name: 'Robotics', icon: '⚙️', color: '#f093fb' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>STEAM Teaching System</h1>
        <p>Welcome to your learning journey</p>
      </header>

      <section className="categories-section">
        <h2>Select a Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              style={{ backgroundColor: category.color }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
