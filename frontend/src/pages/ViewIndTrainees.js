import { useEffect } from "react"

// components
import IndTraineeDetails from "../components/IndTraineeDetails"

import AdminMenu from '../components/AdminMenu';
import { useIndTraineesContext } from "../hooks/useIndTraineesContext"

const ViewIndTrainees = () => {
  const { indTrainees, dispatch } = useIndTraineesContext()

  useEffect(() => {
    const fetchIndTrainees = async () => {
      const response = await fetch('/api/indTrainee')
      const json = await response.json()

      if (response.ok) 
      {
        dispatch({type: 'SET_INDTRAINEES', payload: json})
      }
    }

    fetchIndTrainees()
 // }, [])
}, [dispatch])

  return (
    <>
    <AdminMenu/>
    <div className="indTrainees">
        {indTrainees && indTrainees.map(indTrainee => (
          <IndTraineeDetails indTrainee={indTrainee} key={indTrainee._id} />
        ))}
    </div>
    </>
  )
}
export default ViewIndTrainees