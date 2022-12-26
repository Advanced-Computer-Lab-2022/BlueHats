import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import ViewEnrolledCourses from "../components/EnrolledCourses"
//import axios from "axios"



const EnrolledCourses = () => {
 const {courses,dispatch} = useCoursesContext()
 
    useEffect(() => {
        const fetchMyCourses = async () => {

          // var loggedinUser = JSON.parse(localStorage.getItem('user'));
          // const savedID = loggedinUser.id
          
          //     const response = await fetch('/api/indTrainee/filter/' + savedID, {
//             method: 'GET'
   //     }
            const response = await fetch('/api/indTrainee/filter/6386253315707335be9141b4')
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

export default EnrolledCourses