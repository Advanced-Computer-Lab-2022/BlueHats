import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';

import Search from './pages/Search';
import ExamTrainee from './pages/ExamTrainee';
import Grade from './pages/Grade';
import ExamInd from './pages/ExamInd';
import GradeInd from './pages/GradeInd';

import Preview from './pages/Preview';
import Admin from './pages/Admin';
import NewInstructor from './pages/NewInstructor';
import NewCoTrainee from './pages/NewCoTrainee';

import ViewInstructors from "./pages/ViewInstructors"
import ViewInstructorCourses from "./pages/ViewMyCourses"



 
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
              path="/search/"
              element={<Search/>}
            />
            <Route
              path="/examTrainee/"
              element={<ExamTrainee/>}
            />
            <Route
              path="/gradeExam/"
              element={<Grade/>}
            />
             <Route
              path="/examInd/"
              element={<ExamInd/>}
            />
            <Route
              path="/gradeInd/"
              element={<GradeInd/>}
            />
            <Route
              path="/instructor"
              element={<Instructor/>}
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
