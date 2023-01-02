import { useEffect } from "react"

// components
import InstructorDetails from "../components/AddInstructorDetails"
//import AdminForm from "../components/AdminForm"

import { useInstructorsContext } from "../hooks/useInstructorsContext"

const ViewInstructors = () => {
  const { instructors, dispatch } = useInstructorsContext()
  //const [admins, setAdmins] = useState(null)
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
 // }, [])
}, [dispatch])

  return (
    <div className="instructor">
        {instructors && instructors.map(instructor => (
          <InstructorDetails instructor={instructor} key={instructor._id} />
        ))}
    </div>
  )
}
export default ViewInstructors