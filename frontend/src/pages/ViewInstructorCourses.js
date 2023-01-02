import { useEffect, useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// components
import InstructorCourses from "../components/InstructorCourses"
import axios from "axios"
const ViewInstructorCourses = () => {
//  const {courses,dispatch} = useCoursesContext()

//     useEffect(() => {
//         const fetchMyCourses = async () => {
        
//          var loggedinUser = JSON.parse(localStorage.getItem('user'));
//          const savedID = loggedinUser.id
//          const response = await fetch(`/api/instructor/myCourses/${savedID}`)

//         // const response = await fetch('/api/instructor/myCourses/63a63952d3f9a62c95ff1de1')
//         const json = await response.json();
//         if(response.ok) {
//             dispatch({type: 'SET_COURSES', payload: json});
//             }
//         }
    
//         fetchMyCourses();
//     }, [dispatch])
  
const [courses, setCourses] = useState([]);
var loggedinUser = JSON.parse(localStorage.getItem('user'));
const savedID = loggedinUser.id
useEffect(() => {
const data = {userID: savedID};
axios({
  method: "PUT",
  url: `/api/instructor/myCourses`,
  data: data,
  headers: {'Content-Type': 'application/json'}
}).then(
  (res) => {
    const courses = res.data
    setCourses(courses)
  }
)
},[savedID])
console.log(courses)

  return (
    <div >
      <div >
        <h3>Mycourses</h3>
        { courses && courses.map((course) => (
          <InstructorCourses course={course} key={course._id } 
          />
        ))}
      </div>
    </div>
  )


}

export default ViewInstructorCourses