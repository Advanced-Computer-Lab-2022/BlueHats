import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"


// components
import ViewMyCourses from "../components/Mycourses"



const ViewInstructorCourses = () => {
 const {courses,dispatch} = useCoursesContext()
 //const {instructors,dispatch} = useInstructorsContext()

    // Get an instructor courses

    //http://localhost:4000/api/instructors/myCourses?instructorId=635d4fb217e8af8f38df9019
    useEffect(() => {
        const fetchMyCourses = async () => {
            const response = await fetch('/api/instructors/myCourses?instructorId=635d4fb217e8af8f38df9019')
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

export default ViewInstructorCourses