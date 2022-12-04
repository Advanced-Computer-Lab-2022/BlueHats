import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// components
import ViewMyCourses from "../components/InstructorCourses"
const ViewInstructorCourses = () => {
 const {courses,dispatch} = useCoursesContext()

    useEffect(() => {
        const fetchMyCourses = async () => {

        const response = await fetch('/api/instructors/myCourses?instructorId=638ce1c9e2b0e642f47d7081')
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