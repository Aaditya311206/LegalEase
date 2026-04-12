import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // 🚨 Multilingual dictionary initialized here
import { GoogleOAuthProvider } from '@react-oauth/google';

// 🚨 We will get this ID from Google in the next step!
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_GOES_HERE.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)