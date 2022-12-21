import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import ViewEnrolledCourses from "../components/EnrolledCourses"
//import axios from "axios"



const MyCourses = () => {
 const {courses,dispatch} = useCoursesContext()
 useEffect(() => {
  const fetchMyCourses = async () => {

  const response = await fetch('/api/cUsers/filter/639db323c740c435b75bd450')
  const json = await response.json();
  if(response.ok) {
      dispatch({type: 'SET_COURSES', payload: json});
      }
  }

  fetchMyCourses();
}, [dispatch])
      
   
  return (
    <div className="ViewMyCourses">
      <div className="Mycourses">
        <h3>Mycourses</h3>
        {courses && courses.map((course) => (
          <ViewEnrolledCourses course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default MyCourses