# Portfolio Web Application

A modern web application built with **React** (frontend) and **Express.js** (backend) featuring drawing tools, learning modules, and robotics integration.

## 🎯 Features

- **Authentication**: User login/registration with bcrypt password hashing and JWT tokens
- **Drawing Module**: Canvas-based drawing tool with save, view, and download capabilities
- **Courses & Learning**: STEM, AI Programming, and Robotics modules
- **User Management**: User profiles and account management
- **Responsive Design**: Optimized for desktop and mobile devices

## 📂 Project Structure

```
portfolio_web/
├── my-app/               # React frontend (Create React App)
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components (Login, Drawing3D, etc.)
│   │   ├── styles/       # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/               # Express backend
│   ├── controllers/      # API logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth middleware
│   ├── server.js
│   └── package.json
├── data/                 # JSON database files
│   ├── users.json
│   ├── courses.json
│   ├── robots.json
│   └── drawings.json
├── .env                  # Environment variables
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio_web.git
   cd portfolio_web
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../my-app
   npm install
   ```

4. **Environment Configuration**
   - Create/edit `.env` file in the root directory:
     ```
     JWT_SECRET=your_jwt_secret_key_here
     ```
   - Backend reads this for JWT signing

5. **Start Backend Server** (Terminal 1)
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:5000
   ```

6. **Start Frontend Dev Server** (Terminal 2)
   ```bash
   cd my-app
   npm start
   # Frontend runs on http://localhost:3000
   ```

## 🔑 Test Credentials

Use these accounts to test the application:

| User ID | Password | Name |
|---------|----------|------|
| admin | admin123 | Administrator |
| student1 | student123 | Student One |

Or register a new account via the signup flow.

## 🎨 Features Overview

### Drawing Module
- **Create Drawing**: Canvas-based drawing with adjustable brush size and color
- **Save Drawing**: Persist drawings to backend (stored as base64 in JSON)
- **View & Download**: Browse saved drawings and download as PNG
- **Delete**: Remove drawings (owner-only, JWT protected)

### Authentication
- **Login/Register**: Secure authentication with JWT and bcrypt
- **Token Storage**: JWT stored in browser localStorage
- **Protected Routes**: Sensitive operations require valid token

### API Endpoints

#### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Drawings
- `GET /api/drawing` - Get all drawings
- `POST /api/drawing` - Save new drawing
- `GET /api/drawing/:id` - Get drawing details
- `DELETE /api/drawing/:id` - Delete drawing (protected)

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details

#### Robotics
- `GET /api/robotics` - Get robotics content
- `GET /api/robotics/:id` - Get robotics details

## 🌐 GitHub Pages Deployment

This project is deployed on **GitHub Pages** for frontend only (static React build).

### Deployment Steps

1. **Update Frontend Homepage** (in `my-app/package.json`):
   ```json
   "homepage": "https://yourusername.github.io/portfolio_web"
   ```

2. **Build Frontend**:
   ```bash
   cd my-app
   npm run build
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm install --save-dev gh-pages
   # Add to package.json scripts:
   # "deploy": "gh-pages -d build"
   npm run deploy
   ```

4. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch and `/root` folder

**Note**: The backend API cannot be hosted on GitHub Pages (static hosting only). Consider deploying the backend separately to:
- Heroku
- Vercel
- Railway
- AWS/Google Cloud
- Or run locally for development

### Frontend-Only Deployment

For GitHub Pages static hosting, the frontend will work independently with mock data or by connecting to a remotely hosted backend API.

## 📝 Development Notes

- **Base64 Images**: Drawings are stored as base64 dataURLs in JSON files. For production, consider migrating to file storage or cloud services.
- **JWT Secret**: Change `JWT_SECRET` in `.env` for production use.
- **CORS**: Backend has CORS enabled for localhost; update for production URLs.
- **Session Persistence**: JWT is stored in localStorage; implement auto-logout on expiry if needed.

## 🔒 Security Considerations

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens for stateless authentication
- ✅ Protected endpoints for sensitive operations (delete)
- ⚠️ CORS configured for localhost; update for production
- ⚠️ `.env` file should NOT be committed (see `.gitignore`)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Built With

- **React** 19.x - UI library
- **React Router DOM** - Routing
- **Express.js** - Backend framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **Node.js** - Runtime

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Your Name / Team Name

---

**Live Demo**: [GitHub Pages Link] (coming soon)  
**Repository**: [GitHub Link]

For issues and feature requests, please open an issue on GitHub.
