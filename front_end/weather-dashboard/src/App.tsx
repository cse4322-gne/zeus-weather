import type React from "react";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";


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