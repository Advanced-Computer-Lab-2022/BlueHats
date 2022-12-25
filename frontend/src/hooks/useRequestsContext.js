import { RequestsContext } from "../context/RequestsContext"
import { useContext } from "react"

export const useRequestsContext = () => {
  const context = useContext(RequestsContext)

  if(!context) {
    throw Error('useRequestsContext must be used inside an RequestsContextProvider')
  }

  return context
}