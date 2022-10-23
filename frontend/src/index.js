import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoursesContextProvider>
      <App />
    </CoursesContextProvider>
  </React.StrictMode>
);