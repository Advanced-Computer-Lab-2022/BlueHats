import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"

// components
import CoursePreview from "../components/CoursePreview"

const Preview = () => {
  const { courses, dispatch } = useCoursesContext()

  useEffect((course) => {
    const fetchCourses = async () => {
        const response = await fetch('/api/courses/' + course._id, {
            method: 'GET'
          })
          const json = await response.json();
      
          if(response.ok) {
            dispatch({type: 'GET_COURSE', payload: json});
          }
    }
      
    fetchCourses()
  }, [dispatch])
  
  return (
      <div className="choosen-course">
        {courses && courses.map(course => (
          <CoursePreview course={course} key={course._id} />
        ))}
      </div>
  )
}

export default Preview