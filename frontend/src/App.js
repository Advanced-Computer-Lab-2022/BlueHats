import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';
import AddCourse from './pages/AddCourse';
import CourseView from './pages/CourseView';

import Search from './pages/Search';
import ExamTrainee from './pages/ExamTrainee';
import Grade from './pages/Grade';
import ExamInd from './pages/ExamInd';
import GradeInd from './pages/GradeInd';

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
import CourseForm from "./components/CourseForm"
import ViewInstructors from "./pages/ViewInstructors"
import ViewInstructorCourses from "./pages/ViewInstructorCourses"
import Contract from './components/Contract';
import EnrolledCourses from './pages/ViewIndividualUserCourses';
import ReviewCourse from './components/CoursesTitleRatingReviews';

import RevCourse from './components/CorporateTraineeRateCourse'

import ViewAvailableCourses from './pages/ViewAllCourses';
import RequestCourse from './components/RequestCourse';
import ViewRequests from './pages/ViewRequests';
import MyCourses from './pages/ViewCorporateUserCourses'
import ViewReviewsByUsers from './pages/ViewReviewsByIndUsers'
import ViewReviewsByInstructors from './pages/ViewReviewsByInstructor'

import ViewReviewsByCorUsers from './pages/ViewReviewsByCorUsers'
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
              path="/createCourse"
              element={<CourseForm/>}
            />
             <Route
              path="/Instructors"
              element={<ViewInstructors/>}
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





            <Route
              path="/Mycourses"
              element={<ViewInstructorCourses/>}
            />
            <Route
              path="/EnrolledCourses"
              element={<EnrolledCourses/>}
            />
          
            <Route
              path="/review"
              element={<ReviewCourse/>}
            />
             <Route
              path= "/availableCourses"
              element={<ViewAvailableCourses/>}
            />
            <Route
              path="/requestCourse"
              element={<RequestCourse/>}
            />
            <Route
              path="/requests"
              element={<ViewRequests/>}
            />
            <Route
              path="/subcourses"
              element={<MyCourses/>}
            />
             <Route
              path="/rev"
              element={<RevCourse/>}
            />
             <Route
              path="/ureviews"
              element={<ViewReviewsByUsers/>}
            />
             <Route
              path="/ireviews"
              element={<ViewReviewsByInstructors/>}
            />
            
            <Route
              path="/creviews"
              element={<ViewReviewsByCorUsers/>}
            />
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
