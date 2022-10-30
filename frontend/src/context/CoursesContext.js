import { createContext, useReducer } from 'react'

export const CoursesContext = createContext()

export const coursesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COURSES':
      return { 
        courses: action.payload 
      }
    case 'CREATE_COURSE':
      return { 
        courses: [action.payload, ...state.courses] 
      }
    case 'DELETE_COURSE': 
      return {
        courses: state.courses.filter((c) => c._id !== action.payload._id)
      }  
      case 'FILTER_SUBJECT' : 
      return{
        courses: state.courses.value((c)=> c.Subjct === action.payload.Subjct)
      }
    case 'FILTER_PRICE' : 
    return{
      courses: state.courses.value((c)=> c.Price === action.payload.Price)
    } 
    default:
      return state
  }
}

export const CoursesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coursesReducer, { 
    courses: null
  })
  
  return (
    <CoursesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CoursesContext.Provider>
  )
}