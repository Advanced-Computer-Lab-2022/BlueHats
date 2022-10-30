import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';
import { AdminsContextProvider } from './context/AdminsContext';
import { InstructorsContextProvider } from './context/InstructorsContext';
import { CorporateTraineesContextProvider } from './context/CorporateTraineesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CorporateTraineesContextProvider>
    <InstructorsContextProvider>
    <CoursesContextProvider>
    <AdminsContextProvider>
      <App />
      </AdminsContextProvider>
    </CoursesContextProvider>
    </InstructorsContextProvider>
    </CorporateTraineesContextProvider>
  </React.StrictMode>
);