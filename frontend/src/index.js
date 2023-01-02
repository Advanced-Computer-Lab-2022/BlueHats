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


import { InstContextProvider } from './context/InstContext';
import { AuthContextProvider } from './context/AuthContext';


import { RequestsContextProvider } from './context/RequestsContext';
import { ReviewsContextProvider } from './context/ReviewsContext';
import {RequestsStatusContextProvider} from './context/RequestsStatusContext'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <IndTraineesContextProvider>
    <IndTraineesContextProvider>
    <AuthContextProvider>
    <ProSidebarProvider>
    <CorporateTraineesContextProvider>
    <InstructorsContextProvider>
    <CoursesContextProvider>
    <AdminsContextProvider>
    <InstContextProvider>
    <RequestsContextProvider>
    <ReviewsContextProvider>
    <RequestsStatusContextProvider>

        <App />
    </RequestsStatusContextProvider>
    </ReviewsContextProvider>
    </RequestsContextProvider>
    </InstContextProvider>
    </AdminsContextProvider>
    </CoursesContextProvider>
    </InstructorsContextProvider>
    </CorporateTraineesContextProvider>
    </ProSidebarProvider>
    </AuthContextProvider>
    </IndTraineesContextProvider>
    </IndTraineesContextProvider>
  </React.StrictMode>
);