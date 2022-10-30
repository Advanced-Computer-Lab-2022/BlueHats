import { useEffect } from "react"

// components
import AddInstructorDetails from "../components/AddInstructorDetails"
import AddInstructorForm from "../components/AddInstructorForm"
import { useInstructorsContext } from "../hooks/useInstructorsContext"

const NewInstructor = () => {
  //const [instructor, setInstructors] = useState(null)
  const { instructors, dispatch } = useInstructorsContext()

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await fetch('/api/instructor')
      const json = await response.json()

      if (response.ok) {
       // setInstructors(json)
       dispatch({type: 'SET_INSTRUCTORS', payload: json})
      }
    }

    fetchInstructors()
 // }, [])
}, [dispatch])

  return (
    <div className="instructor">
      <div className="instructors">
        {instructors && instructors.map(instructor => (
          <AddInstructorDetails instructor={instructor} key={instructor._id} />
        ))}
      </div>
      <AddInstructorForm />
    </div>
  )
}
export default NewInstructor