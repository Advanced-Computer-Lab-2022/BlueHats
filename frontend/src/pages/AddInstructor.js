import { useEffect } from "react"

// components
import InstructorForm from "../components/AddInstructorForm"
import { useInstructorsContext } from "../hooks/useInstructorsContext"

const NewInstructor = () => {
  const { instructor, dispatch } = useInstructorsContext()

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await fetch('/api/instructor')
      const json = await response.json()

      if (response.ok) 
      {
       dispatch({type: 'SET_INSTRUCTORS', payload: json})
      }
    }

    fetchInstructors()
}, [dispatch])

  return (
      <InstructorForm />
  )
}
export default NewInstructor