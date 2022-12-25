import { AdminsContext } from "../context/AdminsContext"
import { useContext } from "react"

export const useAdminsContext = () => {
  const context = useContext(AdminsContext)

  if(!context) {
    throw Error('useAdminsContext must be used inside an AdminsContextProvider')
  }

  return context
}