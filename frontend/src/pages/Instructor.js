import { useEffect, useState } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";

// components
import CourseDetails from "../components/CourseDetails";
import CourseForm from "../components/CourseForm";
import { Link } from "react-router-dom";
import IFilterBar from "../components/IFilterBar";
import { acceptedX } from '../components/ContractForm';

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
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <div className="instructor">
      <div className="courses">
      <Link to="/contract" state={accepted}>
          Contract
        </Link> 
        
        <h3>My Courses</h3>
        <IFilterBar />
        <h3>All Courses</h3>
        {courses &&
          courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      {acceptedX.length === 0 ? <div> You cannot create courses yet </div> : <CourseForm /> }
    </div>
  );
};

export default Instructor;
