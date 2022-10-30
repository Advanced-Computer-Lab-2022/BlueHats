import { useEffect } from "react"

// components
import CorporateTraineeDetails from "../components/CorporateTraineeDetails"
import CorporateTraineeForm from "../components/CorporateTraineeForm"
import { useCorporateTraineesContext } from "../hooks/useCorporateTraineesContext"

const NewCoTrainee = () => {
  //const [corporateTrainee, setCorporateTrainees] = useState(null)
  const { corporateTrainees , dispatch } = useCorporateTraineesContext()

  useEffect(() => {
    const fetchCorporateTrainees = async () => {
      const response = await fetch('/api/CorporateTrainee')
      const json = await response.json()

      if (response.ok) {
        //setCorporateTrainees(json)
        dispatch({type: 'SET_CORPORATETRAINEES', payload: json})
      }
    }

    fetchCorporateTrainees()
  //}, [])
}, [dispatch])

  return (
    <div className="corporateTrainee">
      <div className="corporateTrainees">
        {corporateTrainees && corporateTrainees.map(corporateTrainee => (
          <CorporateTraineeDetails corporateTrainee={corporateTrainee} key={corporateTrainee._id} />
        ))}
      </div>
      <CorporateTraineeForm />
    </div>
  )
}
export default NewCoTrainee