//import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"

// components
import ViewCoursesBytitlesHrsRatePrice from "../components/CoursesTitlesHrsRatePrice"



import { useEffect } from "react"


const ViewCoursesTitlesHrsRatePrice = () => {
 const {courses, dispatch} = useCoursesContext()

 /* useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
      }
    }

    fetchCourses()
  }, [dispatch])*/

    // fetch all courses
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
    <div className="ViewCourses">
      <div className="courses">
        <h3>Courses</h3>
        {courses && courses.map(course => (
          <ViewCoursesBytitlesHrsRatePrice course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewCoursesTitlesHrsRatePrice