import { IndTraineesContext } from "../context/IndTraineesContext"
import { useContext } from "react"

export const useIndTraineesContext = () => {
  const context = useContext(IndTraineesContext)

  if(!context) {
    throw Error('useIndTraineesContext must be used inside an IndTraineesContextProvider')
  }

  return context
}