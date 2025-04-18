import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './sass/styles.scss'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { AudioProvider } from './context/AudioContext';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
