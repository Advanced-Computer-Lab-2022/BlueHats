import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';
import { InstructorsContextProvider } from './context/InstContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoursesContextProvider>
        <InstructorsContextProvider>
        <App /> 
        </InstructorsContextProvider>
    </CoursesContextProvider>
  </React.StrictMode>
);