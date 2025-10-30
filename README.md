# User Management Application

A modern, responsive user management application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✅ View list of users with profile pictures
- ✅ Search users by name, email, or company
- ✅ Add new users
- ✅ Edit existing users
- ✅ Delete users with confirmation
- ✅ View detailed user information in modal
- ✅ Fully responsive design
- ✅ Loading states and error handling
- ✅ TypeScript for type safety
- ✅ Context API for state management
- ✅ Unit tests with React Testing Library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository or create new React app:
```bash
npx create-react-app user-management-app --template typescript
cd user-management-app
```

2. Install dependencies:
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Copy all the files from the structure above into your project

4. Install dev dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm start
```
Opens at `http://localhost:3000`

### Production Build
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Format Code
```bash
npm run format
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure