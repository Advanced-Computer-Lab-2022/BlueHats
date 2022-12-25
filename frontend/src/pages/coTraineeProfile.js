import { useEffect } from "react"

// components
import CorporateTraineeDetails from "../components/coTraineeProfileDetails"

import { useCorporateTraineesContext } from "../hooks/useCorporateTraineesContext"

const CorporateTrainee = () => {
  const { corporateTrainees, dispatch } = useCorporateTraineesContext()
  //const [admins, setAdmins] = useState(null)
  useEffect(() => {
    const fetchCorporateTrainees = async () => {
      const response = await fetch('/api/corporateTrainee')
      const json = await response.json()

      if (response.ok) {
        //setAdmins(json)
        dispatch({type: 'SET_CORPORATETRAINEES', payload: json})
      }
    }

    fetchCorporateTrainees()
 // }, [])
}, [dispatch])

  return (
    <div className="corporateTrainee">
      <div className="corporateTrainees">
        {corporateTrainees && corporateTrainees.map(corporateTrainee => (
          <CorporateTraineeDetails corporateTrainee={corporateTrainee} key={corporateTrainee._id} />
        ))}
      </div>
    </div>
  )
}
export default CorporateTrainee