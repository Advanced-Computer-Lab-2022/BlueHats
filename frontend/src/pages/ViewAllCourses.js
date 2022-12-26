import AvailableCourses from '../components/AvailableCourses'

import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// import FilterBar from "../components/FilterBar"

const ViewAvailableCourses = () => {

  const {courses, dispatch} = useCoursesContext()

  
  useEffect(() => {
    const fetchCourses = async () => {

      // var loggedinUser = JSON.parse(localStorage.getItem('user'));
      // const savedID = loggedinUser.id

        //     const response = await fetch('/api/corporateTrainee/availableCourses' + savedID, {
//             method: 'GET'
   //     }

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
      <a className= "my-courses" href="/subcourses">My Courses</a>
       <h2>Available Courses</h2>
        <div className="courses">
        {courses && courses.map(course => (
          <AvailableCourses course={course} key={course._id} />
        ))}
        </div>
     
    </form>
    
  )
}
export default ViewAvailableCourses

