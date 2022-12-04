import { useEffect } from "react"

// components
import IndTraineeDetails from "../components/IndTraineeDetails"
//import AdminForm from "../components/AdminForm"

import { useIndTraineesContext } from "../hooks/useIndTraineesContext"

const IndTrainee = () => {
  const { indTrainees, dispatch } = useIndTraineesContext()
  //const [admins, setAdmins] = useState(null)
  useEffect(() => {
    const fetchIndTrainees = async () => {
      const response = await fetch('/api/indTrainee')
      const json = await response.json()

      if (response.ok) {
        //setAdmins(json)
        dispatch({type: 'SET_INDTRAINEES', payload: json})
      }
    }

    fetchIndTrainees()
 // }, [])
}, [dispatch])

  return (
    <div className="indTrainee">
      <div className="indTrainees">
        {indTrainees && indTrainees.map(indTrainee => (
          <IndTraineeDetails indTrainee={indTrainee} key={indTrainee._id} />
        ))}
      </div>
    </div>
  )
}
export default IndTrainee