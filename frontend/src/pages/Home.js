import ViewCoursesBytitlesHrsRatePrice from '../components/CoursesTitlesHrsRatePrice'

import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"



const Home = () => {

  const {courses, dispatch} = useCoursesContext()

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
    <div className="course-details-s">
      {courses && courses.map(course => (
          <ViewCoursesBytitlesHrsRatePrice course={course} key={course._id} />
        ))}
    </div>
  )
}

export default Home