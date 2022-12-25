import { CoTraineesContext } from "../context/CoTraineesContext"
import { useContext } from "react"

export const useCoTraineesContext = () => {
  const context = useContext(CoTraineesContext)

  if(!context) {
    throw Error('useCoTraineesContext must be used inside an CoTraineesContextProvider')
  }

  return context
}