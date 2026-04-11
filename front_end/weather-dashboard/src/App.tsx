import type React from "react";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <HomePage />
  ) : (
    <div>
      Add login here 
    </div>
  )
}

export default App; 