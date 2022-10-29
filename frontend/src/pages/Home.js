import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"

// components
import CourseDetails from "../components/CourseDetails"

const Home = () => {
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
    <form>
      <div className="home">
        <div className="courses">
          <h1>Courses</h1>
          {courses && courses.map(course => (
            <CourseDetails course={course} key={course._id} />
          ))}
        </div>
      </div>
    </form>
    
  )
}
export default Home

