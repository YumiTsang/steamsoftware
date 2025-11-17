import React, { useState } from 'react';
import '../styles/STEM.css';

const STEM = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'science',
      name: 'Science',
      icon: '🔬',
      description: 'Physics, Chemistry, Biology',
      courses: [
        { id: 1, title: 'Basic Physics', duration: '6 weeks' },
        { id: 2, title: 'Chemistry Fundamentals', duration: '6 weeks' },
        { id: 3, title: 'Biology Essentials', duration: '5 weeks' },
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: '💻',
      description: 'Programming, Web Development',
      courses: [
        { id: 1, title: 'JavaScript Basics', duration: '4 weeks' },
        { id: 2, title: 'Web Development', duration: '8 weeks' },
        { id: 3, title: 'Mobile App Development', duration: '10 weeks' },
      ],
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: '⚙️',
      description: 'Mechanics, Design, Robotics',
      courses: [
        { id: 1, title: 'Mechanical Engineering', duration: '6 weeks' },
        { id: 2, title: 'Robotics 101', duration: '7 weeks' },
        { id: 3, title: 'CAD Design', duration: '5 weeks' },
      ],
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📐',
      description: 'Algebra, Geometry, Calculus',
      courses: [
        { id: 1, title: 'Algebra Fundamentals', duration: '4 weeks' },
        { id: 2, title: 'Geometry & Trigonometry', duration: '6 weeks' },
        { id: 3, title: 'Calculus Basics', duration: '8 weeks' },
      ],
    },
  ];

  return (
    <div className="stem-page">
      <header className="stem-header">
        <h1>STEM Learning</h1>
        <p>Science, Technology, Engineering, and Mathematics</p>
      </header>

      <div className="stem-container">
        {/* 分類卡片 */}
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory?.id === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="course-count">📚 {category.courses.length} courses</span>
            </div>
          ))}
        </div>

        {/* 詳細課程列表 */}
        {selectedCategory && (
          <div className="course-list-section">
            <div className="section-header">
              <h2>
                {selectedCategory.icon} {selectedCategory.name} Courses
              </h2>
              <p>{selectedCategory.description}</p>
            </div>

            <div className="courses-list">
              {selectedCategory.courses.map((course) => (
                <div key={course.id} className="course-item">
                  <div className="course-number">{course.id}</div>
                  <div className="course-details">
                    <h4>{course.title}</h4>
                    <p>{course.duration}</p>
                  </div>
                  <button className="enroll-btn">Enroll Now</button>
                </div>
              ))}
            </div>

            {/* 分類資訊 */}
            <div className="category-info">
              <h3>About This Category</h3>
              <p>
                This comprehensive collection of courses is designed to help you master the
                fundamentals and advanced concepts of {selectedCategory.name.toLowerCase()}.
                Whether you're a beginner or advanced learner, we have courses tailored to your
                level.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default STEM;
