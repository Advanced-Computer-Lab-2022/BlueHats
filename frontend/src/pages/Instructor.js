import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useCoursesContext } from "../hooks/useCoursesContext"

// components
import CourseDetails from "../components/CourseDetails"

const Instructor = () => {

  const { courses, dispatch } = useCoursesContext()

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
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
        <h3>My Courses</h3> 
        {courses && courses.map(course => (
          <CourseDetails course={course} key={course._id} />
        ))}
      </div>
      <button onClick={navigateAddCourse}>Add Course</button>    
    </div>
  )
}

export default Instructor