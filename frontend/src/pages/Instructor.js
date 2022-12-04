import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useCoursesContext } from "../hooks/useCoursesContext"
import { v4 as uuidv4 } from 'uuid';

import { Link } from "react-router-dom";
import InstructorFilters from "../components/InstructorFilters";

// components
import CourseDetails from "../components/CourseDetails"

const Instructor = () => {

  const { courses, dispatch } = useCoursesContext();

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
      <Link to="/contract">Contracts</Link>
        <h3>My Courses</h3>
        <h3>Filter By:</h3>
        <div className="filter-inst">
          <InstructorFilters key={uuidv4()} />
        </div>
        <h3>All Courses</h3>
        {courses && courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      <button onClick={navigateAddCourse}>Add Course</button>    
    </div>
  );
};

export default Instructor;
