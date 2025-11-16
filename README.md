  📝 Todo List Application

A full-stack Todo application built using (React + TypeScript) on the frontend and (Node.js + TypeScript) on the backend.
The app includes user authentication with JWT, password reset, and complete CRUD operations for todos.


## ✅ Features

    User Management

        * User Signup
        * User Login (JWT based)
        * Forgot Password
        * Reset Password

    Todo Management

        * Create Todo
        * Update Todo
        * List All Todos
        * Delete Todo
        * Toggle Completed / Not Completed

    Other Features

        * Error handling in all routes
        * Error logging into MongoDB (`logs` collection)
        * Protected frontend routes
        * Responsive UI



## Getting Started

  ## Clone my Repository

```bash
git clone https://github.com/mohdfaizfaizii/todo-app.git
cd todo-app
```

    Quick Start

        1. Clone my repository
        2. Set up environment variables (see Backend Setup and Frontend Setup sections)
        3. Install dependencies for both backend and frontend
        4. Run the development servers.


### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file** in the `backend` directory with the following variables:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Important: Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string and `your_jwt_secret_key` with a strong random string.

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Building for Production

  ### Backend
```bash
cd backend
npm run build
npm start
```

  ### Frontend
```bash
cd frontend
npm run build
npm run preview
```

