import React, { useState } from 'react';
import '../styles/AIProgramming.css';

const AIProgramming = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseList] = useState([
    {
      id: 1,
      title: 'Introduction to AI',
      description: 'Learn the basics of artificial intelligence',
      duration: '4 weeks',
      level: 'Beginner',
      image: '🤖',
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description: 'Understand machine learning concepts and algorithms',
      duration: '6 weeks',
      level: 'Intermediate',
      image: '📊',
    },
    {
      id: 3,
      title: 'Deep Learning with Neural Networks',
      description: 'Build and train neural networks',
      duration: '8 weeks',
      level: 'Advanced',
      image: '🧠',
    },
    {
      id: 4,
      title: 'Natural Language Processing',
      description: 'Process and understand human language',
      duration: '5 weeks',
      level: 'Intermediate',
      image: '💬',
    },
  ]);

  return (
    <div className="ai-programming">
      <header className="ai-header">
        <h1>AI Programming</h1>
        <p>Master the fundamentals of artificial intelligence and machine learning</p>
      </header>

      <div className="ai-container">
        {/* 課程列表 */}
        <section className="courses-section">
          <h2>Available Courses</h2>
          <div className="courses-grid">
            {courseList.map((course) => (
              <div
                key={course.id}
                className={`course-card ${selectedCourse?.id === course.id ? 'selected' : ''}`}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="course-image">{course.image}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="duration">⏱️ {course.duration}</span>
                  <span className={`level ${course.level.toLowerCase()}`}>{course.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 課程詳細資訊 */}
        {selectedCourse && (
          <section className="course-detail-section">
            <h2>Course Details</h2>
            <div className="course-detail-card">
              <div className="detail-header">
                <div className="detail-image">{selectedCourse.image}</div>
                <div className="detail-title">
                  <h3>{selectedCourse.title}</h3>
                  <p>{selectedCourse.description}</p>
                </div>
              </div>

              <div className="detail-info">
                <div className="info-item">
                  <label>Duration:</label>
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="info-item">
                  <label>Level:</label>
                  <span className={selectedCourse.level.toLowerCase()}>
                    {selectedCourse.level}
                  </span>
                </div>
              </div>

              {/* 課程內容 */}
              <div className="content-section">
                <h3>Course Content</h3>
                <div className="lessons">
                  <div className="lesson">
                    <span className="lesson-number">1</span>
                    <div className="lesson-info">
                      <p className="lesson-title">Introduction & Overview</p>
                      <p className="lesson-duration">45 min</p>
                    </div>
                  </div>
                  <div className="lesson">
                    <span className="lesson-number">2</span>
                    <div className="lesson-info">
                      <p className="lesson-title">Core Concepts</p>
                      <p className="lesson-duration">60 min</p>
                    </div>
                  </div>
                  <div className="lesson">
                    <span className="lesson-number">3</span>
                    <div className="lesson-info">
                      <p className="lesson-title">Practical Examples</p>
                      <p className="lesson-duration">90 min</p>
                    </div>
                  </div>
                  <div className="lesson">
                    <span className="lesson-number">4</span>
                    <div className="lesson-info">
                      <p className="lesson-title">Project & Assessment</p>
                      <p className="lesson-duration">120 min</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 行動按鈕 */}
              <div className="action-buttons">
                <button className="btn btn-primary">Start Learning</button>
                <button className="btn btn-secondary">View Resources</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AIProgramming;
