import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';
import AddCourse from './pages/AddCourse';
import CourseView from './pages/CourseView';

import Preview from './pages/Preview';
import Admin from './pages/Admin';
import NewInstructor from './pages/NewInstructor';
import NewCoTrainee from './pages/NewCoTrainee';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ChangeEmail from './pages/changeEmail';
import IndTrainee from './pages/indTrainees';
import InstructorProfile from './pages/instructorProfile';
import CoTraineeProfile from './pages/coTraineeProfile';
import Biography from './pages/biography';

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
              path="/instructor/addCourse"
              element={<AddCourse/>}
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
              path="/course/view"
              element={<CourseView/>}
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
            <Route
              path="/signup"
              element={<Signup/>}
            />
             <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/forgotPassword"
              element={<ForgotPassword/>}
            />
            <Route
              path="/resetPassword"
              element={<ResetPassword/>}
            />
            <Route
              path="/instructor/changeEmail"
              element={<ChangeEmail/>}
            />
            <Route
              path="/indTrainee/changePassword"
              element={<ResetPassword/>}
            />
            <Route
              path="/instructor/changePassword"
              element={<ResetPassword/>}
            />
            <Route
              path="/corporateTrainee/changePassword"
              element={<ResetPassword/>}
            />
            <Route
              path="/indTrainee/profile"
              element={<IndTrainee/>}
            />
             <Route
              path="/instructor/profile"
              element={<InstructorProfile/>}
            />
            <Route
              path="/corporateTrainee/profile"
              element={<CoTraineeProfile/>}
            />
            <Route
              path="/instructor/editBiography"
              element={<Biography/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
