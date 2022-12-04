import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';

import Preview from './pages/Preview';
import Admin from './pages/Admin';
import NewInstructor from './pages/NewInstructor';
import NewCoTrainee from './pages/NewCoTrainee';

import ViewInstructors from "./pages/ViewInstructors"
import ViewInstructorCourses from "./pages/ViewMyCourses"
import Contract from './components/Contract';


 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar></Navbar>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/instructor"
              element={<Instructor/>}
            />
                 <Route
              path="/contract"
              element={<Contract/>}
            />
             <Route
              path="/course/preview"
              element={<Preview/>}
            />
            <Route
              path="/admin/addAdmin"
              element={<Admin/>}
            />
            <Route
              path="/admin/instructor"
              element={<NewInstructor/>}
            />
            <Route
              path="/admin/corporateTrainee"
              element={<NewCoTrainee/>}
            />
             <Route
              path="/Instructors"
              element={<ViewInstructors/>}
            />
            <Route
              path="/Mycourses"
              element={<ViewInstructorCourses/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
