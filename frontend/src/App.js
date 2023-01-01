import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Instructor from './pages/Instructor';
import CourseView from './pages/CourseView';
import Payment from './pages/Payment';

import Search from './pages/Search';
import Grade from './pages/Grade';
import ExamInd from './pages/ExamInd';
import GradeInd from './pages/GradeInd';
import IndTraineeCourses from './pages/IndTraineeCourses';
import RefundRequests from './pages/RefundRequests';

import Preview from './pages/Preview';
import Admin from './pages/Admin';
import AdminHome from './pages/AdminHome';
import NewInstructor from './pages/NewInstructor';
import NewCoTrainee from './pages/NewCoTrainee';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ChangePassword from './pages/changePassword';
import ChangeEmail from './pages/changeEmail';
import IndTrainee from './pages/indTrainees';
import InstructorProfile from './pages/instructorProfile';
import CoTraineeProfile from './pages/coTraineeProfile';
import Biography from './pages/biography';
import CourseForm from "./components/CourseForm"
import ViewInstructors from "./pages/ViewInstructors"
import ContractForm from './components/ContractForm';
import HomeFilter from './pages/HomeFilter';
import InstructorFilter from './pages/InstructorFilter';

import HomePage from './pages/HomePage';
import InstructorPage from './pages/InstructorPage';

import Report from './pages/ViewProblem';
import AdminPage from './pages/AdminPage';

//Routes
import PrivateRoutes from './utils/PrivateRoutes';
import AdminRoutes from './utils/AdminRoutes';
import InstructorRoutes from './utils/InstructorRoutes';
import CorporateTraineeRoutes from './utils/CorporateTraineeRoutes';
import IndividualTraineeRoutes from './utils/IndividualTraineeRoutes';



/* Mohamed urls */
import IndTraineeRateInstructor from './components/IndTraineeRateInstructor';
import IndTraineeRateCourse from './components/IndTraineeRateCourse';
import ViewIndividualTraineeCourses from './pages/ViewIndividualUserCourses';
import ViewAllIndReviews from './pages/ViewAllIndividualUserReviews';
import IndividualTraineeEditReview from './components/IndividualTraineeEditReview'
import ViewReviewsByIndUsers from './pages/ViewReviewsByIndUsers'


import CorporateTraineeRateInstructor from './components/CorporateTraineeRateInstructor'
import CorporateTraineeRateCourse from './components/CorporateTraineeRateCourse'
import ViewCorporateTraineeCourses from './pages/ViewCorporateUserCourses'
import ViewAllCourses from './pages/ViewAllCourses';
import RequestCourse from './components/RequestCourse';
import ViewReviewsByCorUsers from './pages/ViewReviewsByCorUsers'
import ViewAllCoReviews from './pages/ViewAllCoReviews';
import CorporateTraineeEditReview from './components/CorporateTraineeEditReview'
import ViewMyRequestsStatus from './pages/ViewMyRequestsStatus'

import ViewInstructorCourses from "./pages/ViewInstructorCourses"
import ViewReviewsByInstructors from './pages/ViewReviewsByInstructor'


import ViewRequests from './pages/ViewRequests';

var loggedinUser = JSON.parse(localStorage.getItem('user'));


function App() {


  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className='pages'>
          <Routes>
           { !loggedinUser && <Route element={<PrivateRoutes />}>
                <Route path="/createCourse" element={<CourseForm/>}/>
                <Route path="/instructor" element={<Instructor/>}/>
                <Route path="/course/view" element={<CourseView/>} />
                <Route path="/contract" element={<ContractForm/>}/>
                <Route path="/payment" element={<Payment keys={{ stripe: "YOUR STRIPE PUBLIC KEY HERE" }}/>}/>
                <Route path="/MyEnrolledCourses" element={<IndTraineeCourses/>}/>
                <Route path="/admin/refund-requests" element={<RefundRequests/>}/>
                <Route path="/admin/addAdmin" element={<Admin/>} />
                <Route path="/admin/instructor" element={<NewInstructor/>}/>
                <Route path="/admin/corporateTrainee" element={<NewCoTrainee/>}/>
                <Route path="/instructor/changeEmail" element={<ChangeEmail/>} />
                <Route path="/indTrainee/changePassword" element={<ResetPassword/>} />
                <Route path="/instructor/changePassword" element={<ResetPassword/>} />
                <Route path="/corporateTrainee/changePassword" element={<ResetPassword/>}/>
                <Route path="/indTrainee/profile" element={<IndTrainee/>}/>
                <Route path="/instructor/profile" element={<InstructorProfile/>}/>
                <Route path="/instructor/editBiography" element={<Biography/>} />
                <Route path="/adminPage" element={<AdminPage/>} />
                <Route path="/instructorPage" element={<InstructorPage/>}/>
                <Route path="/adminhome/" element={<AdminHome/>} />
            </Route>}

           { loggedinUser && <Route element={<AdminRoutes />}>
              <Route path="/admin/addAdmin" element={<Admin/>} />
              <Route path="/admin/instructor" element={<NewInstructor/>}/>
              <Route path="/admin/corporateTrainee" element={<NewCoTrainee/>}/>
              <Route path="/admin/refund-requests" element={<RefundRequests/>}/>
              <Route path="/adminPage" element={<AdminPage/>} />
              <Route path="/adminhome/" element={<AdminHome/>} />
            </Route>}

           { loggedinUser && <Route element={<InstructorRoutes />}>
              <Route path="/instructor" element={<Instructor/>}/>
              <Route path="/contract" element={<ContractForm/>}/>
              <Route path="/createCourse" element={<CourseForm/>}/>
              <Route path="/instructor/changeEmail" element={<ChangeEmail/>} />
              <Route path="/instructor/changePassword" element={<ResetPassword/>} />
              <Route path="/instructor/profile" element={<InstructorProfile/>}/>
              <Route path="/instructor/editBiography" element={<Biography/>} />
              <Route path="/instructorPage" element={<InstructorPage/>}/>
            </Route>}

            { loggedinUser && <Route element={<CorporateTraineeRoutes />}>
             {/* add a corporate path for course view */}
              <Route path="/corporateTrainee/changePassword" element={<ResetPassword/>}/>
              <Route path="/corporateTrainee/profile" element={<CoTraineeProfile/>} />
            </Route>}

            { loggedinUser && <Route element={<IndividualTraineeRoutes />}>
              <Route path="/payment" element={<Payment keys={{ stripe: "YOUR STRIPE PUBLIC KEY HERE" }}/>}/>
              <Route path="/indTrainee/changePassword" element={<ResetPassword/>} />
              <Route path="/indTrainee/profile" element={<IndTrainee/>}/>
              <Route path="/MyEnrolledCourses" element={<IndTraineeCourses/>}/>
              <Route path="/course/view" element={<CourseView/>} />
            </Route>}

            <Route
              path="/"
              element={<Home/>}
            />
             <Route
              path="/Home"
              element={<HomePage/>}
            />
            <Route
              path="/search/"
              element={<Search/>}
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
              path="/HFilter"
              element={<HomeFilter/>}
            />
               <Route
              path="/IFilter"
              element={<InstructorFilter/>}
            />
             <Route
              path="/course/preview"
              element={<Preview/>}
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
              path="/changePassword"
              element={<ChangePassword/>}
            />

            <Route
              path="/viewProblem/"
              element={<Report/>}
            />



            {/** m urls */}

            
            {/* individual trainee urls */}
            <Route
              path="/ratecourse/individualTrainee"
              element={<IndTraineeRateCourse/>}
            />

             <Route
              path="/rateinstructor/individualTrainee"
              element={<IndTraineeRateInstructor/>}
            />

            <Route
              path="/mycourses/individualTrainee"
              element={<ViewIndividualTraineeCourses/>}
            />
             <Route
              path="/myreviews/individualTrainee"
              element={<ViewAllIndReviews/>}
            />
            <Route
              path="/edit/inidividualtrainee"
              element={<IndividualTraineeEditReview/>}
            />
            <Route
              path="/viewaddreviews/individualtrainee"
              element={<ViewReviewsByIndUsers/>}
            />



             {/* corporate trainee urls */}
            <Route
              path="/mycourses/corporateTrainee"
              element={<ViewCorporateTraineeCourses/>}
            />
             <Route
              path="/ratecourse/corporateTrainee"
              element={<CorporateTraineeRateCourse/>}
            />
             <Route
              path="/rateinstructor/corporateTrainee"
              element={<CorporateTraineeRateInstructor/>}
            />

            <Route
              path="/requestcourse"
              element={<RequestCourse/>}
            />
            <Route
              path="/courses"
              element={<ViewAllCourses/>}
            />
            <Route
              path="/viewaddreviews/corporatetrainee"
              element={<ViewReviewsByCorUsers/>}
            />
            <Route
              path="/myreviews/corporatetrainee"
              element={<ViewAllCoReviews/>}
            />
            <Route
              path="/edit/corporatetrainee"
              element={<CorporateTraineeEditReview/>}
            />
            <Route
              path="/myrequests/status"
              element={<ViewMyRequestsStatus/>}
            />
            
            

            {/* instructor urls */}
            <Route
              path="/mycourses/instructor"
              element={<ViewInstructorCourses/>}
            />
            <Route
              path="/reviews"
              element={<ViewReviewsByInstructors/>}
            />
             
            {/* admin urls */}
            <Route
              path="/requests/admin"
              element={<ViewRequests/>}
            />

          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
