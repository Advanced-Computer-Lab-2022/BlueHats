//import { useEffect } from "react"
import { useInstructorsContext } from "../hooks/useInstContext"

// components
import InstructorDetails from "../components/InstructorDetails"


import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"

const ViewInstructors = () => {
 const {instructors, dispatch} = useInstructorsContext()
 const {courses} = useCoursesContext()

    // fetch all courses
    useEffect(() => {
      const fetchInstructors = async () => {
        const response = await fetch('/api/instructors')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_INSTRUCTORS', payload: json})
        }
      }
  
      fetchInstructors()
    }, [dispatch])

  
  return (
      <div >
        <div>
        {instructors && instructors.map(Instructor => (
          <InstructorDetails Instructor={Instructor} key={Instructor._id} />
        ))}
      </div>
      </div>
      
  )

}

export default ViewInstructors