import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import ViewMyCourses from "../components/CorporateTraineeCourses"
//import axios from "axios"



const MyCourses = () => {
 const {courses,dispatch} = useCoursesContext()
 useEffect(() => {
  const fetchMyCourses = async () => {

  const response = await fetch('/api/corporateTrainee/filter/63a756e189cc94e7139e239c')
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
          <ViewMyCourses course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default MyCourses