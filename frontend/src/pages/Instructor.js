import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import { v4 as uuidv4 } from 'uuid';

// components
import CourseDetails from "../components/CourseDetails";
import CourseForm from "../components/CourseForm";
import { Link } from "react-router-dom";
import InstructorFilters from "../components/InstructorFilters";

const Instructor = () => {
  // const[text,setText] = useState('');

  const { courses, dispatch } = useCoursesContext();

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
        <Link to="/contract">Contracts</Link>
        <h3>My Courses</h3>
        <h3>Filter By:</h3>
        <InstructorFilters key={uuidv4()} />
        <h3>All Courses</h3>
        {courses &&
          courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      <CourseForm />
    </div>
  );
};

export default Instructor;
