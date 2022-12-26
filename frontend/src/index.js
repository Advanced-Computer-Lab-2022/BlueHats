import React , { Fragment }from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';

import { CoursesContextProvider } from './context/CoursesContext';
import { AdminsContextProvider } from './context/AdminsContext';
import { InstructorsContextProvider } from './context/InstructorsContext';
import { CorporateTraineesContextProvider } from './context/CorporateTraineesContext';
import { IndTraineesContextProvider } from './context/IndTraineesContext';
import { render } from "react-dom";


import { InstContextProvider } from './context/InstContext';
import { AuthContextProvider } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
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
    </AuthContextProvider>
  </React.StrictMode>
);