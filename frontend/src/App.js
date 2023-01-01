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
import ViewInstructorCourses from "./pages/ViewInstructorCourses"
import ContractForm from './components/ContractForm';
import HomeFilter from './pages/HomeFilter';
import InstructorFilter from './pages/InstructorFilter';
import EnrolledCourses from './pages/ViewIndividualUserCourses';

import ReviewCourse from './components/CoursesTitleRatingReviews';
import HomePage from './pages/HomePage';
import InstructorPage from './pages/InstructorPage';

import Report from './pages/ViewProblem';
import AdminPage from './pages/AdminPage';
import RevCourse from './components/CorporateTraineeRateCourse'

import ViewAvailableCourses from './pages/ViewAllCourses';
import RequestCourse from './components/RequestCourse';
import ViewRequests from './pages/ViewRequests';

import MyCourses from './pages/ViewCorporateUserCourses'
import ViewReviewsByUsers from './pages/ViewReviewsByIndUsers'
import ViewReviewsByInstructors from './pages/ViewReviewsByInstructor'

import ViewReviewsByCorUsers from './pages/ViewReviewsByCorUsers'
import ViewAllCoReviews from './pages/ViewAllCoReviews';
import ViewAllIndReviews from './pages/ViewAllIndividualUserReviews';

import EditReview from './components/EditReview'

//Routes
import PrivateRoutes from './utils/PrivateRoutes';
import AdminRoutes from './utils/AdminRoutes';
import InstructorRoutes from './utils/InstructorRoutes';
import CorporateTraineeRoutes from './utils/CorporateTraineeRoutes';
import IndividualTraineeRoutes from './utils/IndividualTraineeRoutes';

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

             <Route
              path="/vaireviews"
              element={<ViewAllIndReviews/>}
            />
             <Route
              path="/vacreviews"
              element={<ViewAllCoReviews/>}
            />
            <Route
              path="/edit"
              element={<EditReview/>}
            />
            
            <Route
              path="/viewProblem/"
              element={<Report/>}
            />

          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
