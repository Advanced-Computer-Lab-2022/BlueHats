import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';
import { AdminsContextProvider } from './context/AdminsContext';
import { InstructorsContextProvider } from './context/InstructorsContext';
import { CorporateTraineesContextProvider } from './context/CorporateTraineesContext';

import { InstContextProvider } from './context/InstContext';

import { ProSidebarProvider } from 'react-pro-sidebar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
    <CorporateTraineesContextProvider>
    <InstructorsContextProvider>
    <CoursesContextProvider>
    <AdminsContextProvider>
      <InstContextProvider>
        <App />
      </InstContextProvider>
      </AdminsContextProvider>
    </CoursesContextProvider>
    </InstructorsContextProvider>
    </CorporateTraineesContextProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);