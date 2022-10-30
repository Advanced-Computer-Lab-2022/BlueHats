import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';
import ViewCoursesTitlesHrsRatePrice from './pages/ViewCoursesBytitlesHrsRatePrice'
import CourseForm from "./components/CourseForm"
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
              path="/instructor"
              element={<Instructor/>}
            />
             <Route
              path="/Courses"
              element={<ViewCoursesTitlesHrsRatePrice/>}
            />
            <Route
              path="/createCourse"
              element={<CourseForm/>}
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
