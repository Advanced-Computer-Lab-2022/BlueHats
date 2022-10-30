import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


// components
import CourseDetails from "../components/CourseDetails"

const Instructor = ({instructor}) => {

  const { courses, dispatch,Instructors } = useCoursesContext()

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


  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/instructors')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
      }
    }

    fetchCourses()
  }, [dispatch])


   /* useEffect(() => {
      const fetchCourses = async () => {
  
        const response = await fetch('/api/instructors/myCourses' + instructor._id, {
          method: 'GET'
        })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'FILTER_COURSES', payload: json})
        }
      }
  
      fetchCourses()
    }, [dispatch])*/

  return (
    <div className="instructor">
      <div className="courses">
        <h3>My Courses</h3>
        {courses && courses.map(course => (
          <CourseDetails course={course} key={course._id} />
        ))}
        <h3>All Instructors</h3>
        {Instructors && Instructors.map(course => (
          <CourseDetails course={course} key={course._id} />
        ))}
      </div>
      <ul id='button'>
            <li class="create-course"><a href="/createCourse">Create course</a></li>
        </ul>
          </div>
  )
}

export default Instructor