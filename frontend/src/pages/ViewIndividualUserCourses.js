import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import IndTraineeCourses from "../components/IndTraineeCourses"
//import axios from "axios"



const ViewIndividualTraineeCourses = () => {
 const {courses,dispatch} = useCoursesContext()
 
    useEffect(() => {
        const fetchMyCourses = async () => {

           var loggedinUser = JSON.parse(localStorage.getItem('user'));
      const savedID = loggedinUser.id
      const response = await fetch(`/api/indTrainee/filter/${savedID}`)

            // const response = await fetch('/api/indTrainee/filter/6386253315707335be9141b4')
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
          <IndTraineeCourses course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewIndividualTraineeCourses