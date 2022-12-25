import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoursesContextProvider } from './context/CoursesContext';
import { AdminsContextProvider } from './context/AdminsContext';
import { InstructorsContextProvider } from './context/InstructorsContext';
import { CorporateTraineesContextProvider } from './context/CorporateTraineesContext';
import { IndTraineesContextProvider } from './context/IndTraineesContext';

import { InstContextProvider } from './context/InstContext';

import { ProSidebarProvider } from 'react-pro-sidebar';
import { RequestsContextProvider } from './context/RequestsContext';
import { ReviewsContextProvider } from './context/ReviewsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IndTraineesContextProvider>
    <ProSidebarProvider>
    <CorporateTraineesContextProvider>
    <InstructorsContextProvider>
    <CoursesContextProvider>
    <AdminsContextProvider>
    <InstContextProvider>
    <RequestsContextProvider>
    <ReviewsContextProvider>
        <App />
    </ReviewsContextProvider>
    </RequestsContextProvider>
    </InstContextProvider>
    </AdminsContextProvider>
    </CoursesContextProvider>
    </InstructorsContextProvider>
    </CorporateTraineesContextProvider>
    </ProSidebarProvider>
    </IndTraineesContextProvider>
  </React.StrictMode>
);