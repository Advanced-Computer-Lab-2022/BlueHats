import { useEffect } from "react"

// components
import CoTraineeForm from "../components/CorporateTraineeForm"
import { useCorporateTraineesContext } from "../hooks/useCorporateTraineesContext"

const NewCoTrainee = () => {
  const { coTrainee, dispatch } = useCorporateTraineesContext()

  useEffect(() => {
    const fetchCoTrainees = async () => {
      const response = await fetch('/api/corporateTrainee')
      const json = await response.json()

      if (response.ok) 
      {
       dispatch({type: 'SET_CORPORATETRAINEES', payload: json})
      }
    }

    fetchCoTrainees()
}, [dispatch])

  return (
      <CoTraineeForm />
  )
}
export default NewCoTrainee