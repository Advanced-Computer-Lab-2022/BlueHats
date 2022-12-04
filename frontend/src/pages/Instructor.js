import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"

// components
import CourseDetails from "../components/CourseDetails"
import CourseForm from "../components/CourseForm"

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


  return (

    <div className="instructor">
      <div className="courses">
        <h3>My Courses</h3> 
        <h3>Filter By:</h3>
      
        {courses && courses.map(course => (
          <CourseDetails course={course} key={course._id} />
        ))}
      </div>
      <CourseForm />      
    </div>
  )
}

export default Instructor