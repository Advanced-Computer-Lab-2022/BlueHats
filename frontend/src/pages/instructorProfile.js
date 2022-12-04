import { useEffect } from "react"

// components
import InstructorDetails from "../components/AddInstructorDetails"

import { useInstructorsContext } from "../hooks/useInstructorsContext"

const Instructor = () => {
  const { instructors, dispatch } = useInstructorsContext()
  //const [admins, setAdmins] = useState(null)
  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await fetch('/api/instructor')
      const json = await response.json()

      if (response.ok) {
        //setAdmins(json)
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
          <InstructorDetails instructor={instructor} key={instructor._id} />
        ))}
      </div>
    </div>
  )
}
export default Instructor