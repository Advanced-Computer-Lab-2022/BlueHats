import { useEffect } from "react"

// components
import CoTraineeDetails from "../components/CoTraineeDetails"
import { useCoTraineesContext } from "../hooks/useCoTraineesContext"

const ViewCoTrainees = () => {
  //const [corporateTrainee, setCorporateTrainees] = useState(null)
  const { corporateTrainees , dispatch } = useCoTraineesContext()

  useEffect(() => {
    const fetchCorporateTrainees = async () => {
      const response = await fetch('/api/Cusers')
      const json = await response.json()

      if (response.ok) {
        //setCorporateTrainees(json)
        dispatch({type: 'SET_CORPORATETRAINEES', payload: json})
      }
    }

    fetchCorporateTrainees()
}, [dispatch])

  return (
    <div>
        {corporateTrainees && corporateTrainees.map(corporateTrainee => (
          <CoTraineeDetails corporateTrainee={corporateTrainee} key={corporateTrainee._id} />
        ))}
      
    </div>
  )
}
export default ViewCoTrainees 