import { RequestsStatusContext } from "../context/RequestsStatusContext"
import { useContext } from "react"

export const useRequestsStatusContext = () => {
  const context = useContext(RequestsStatusContext)

  if(!context) {
    throw Error('useRequestsStatusContext must be used inside an RequestsStatusContextProvider')
  }

  return context
}