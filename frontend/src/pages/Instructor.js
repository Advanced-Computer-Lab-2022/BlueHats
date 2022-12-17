import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useCoursesContext } from "../hooks/useCoursesContext"

import { Link } from "react-router-dom";
import IFilterBar from "../components/IFilterBar";
import { acceptedX } from '../components/ContractForm';

// components
import CourseDetails from "../components/CourseDetails"

const Instructor = () => {

  const { courses, dispatch } = useCoursesContext();
  const [accepted,setAccepted] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    }
      
    fetchCourses()
  }, [dispatch])

  const navigate = useNavigate();
  const navigateAddCourse = () => {
    navigate('/instructor/addCourse');
  };

  return (
    <div className="instructor">
      <div className="courses">
      <Link to="/contract" state={accepted}>
          Contract
        </Link> 
        <h3>My Courses</h3>
        <IFilterBar />
        <h3>All Courses</h3>
        {courses && courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      <button onClick={navigateAddCourse}>Add Course</button>    
      <div className="instructor-wallet">
        <button>My Wallet</button>    
      </div>
    </div>
  );
};

export default Instructor;
