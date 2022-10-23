import { CoursesContext } from "../context/CoursesContext"
import { useContext } from "react"

export const useCoursesContext = () => {
  const context = useContext(CoursesContext)

  if(!context) {
    throw Error('useCoursesContext must be used inside an CoursesContextProvider')
  }

  return context
}