import { InstructorsContext } from "../context/InstructorsContext"
import { useContext } from "react"

export const useInstructorsContext = () => {
  const context = useContext(InstructorsContext)

  if(!context) {
    throw Error('useInstructorsContext must be used inside an InstructorsContextProvider')
  }

  return context
}