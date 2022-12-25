import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// components
import ViewMyCourses from "../components/InstructorCourses"
const ViewInstructorCourses = () => {
 const {courses,dispatch} = useCoursesContext()

    useEffect(() => {
        const fetchMyCourses = async () => {
        
        // this needs to be dynamic
        // var loggedinUser = JSON.parse(localStorage.getItem('user'));
        // const savedID = loggedinUser.id

           //     const response = await fetch('/api/instructor/myCourses/' + savedID, {
//             method: 'GET'
   //     }

        const response = await fetch('/api/instructor/myCourses/63a63952d3f9a62c95ff1de1')
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
        { courses && courses.map((course) => (
          <ViewMyCourses course={course} key={course._id } 
        
          />
        ))}
      </div>
    </div>
  )


}

export default ViewInstructorCourses