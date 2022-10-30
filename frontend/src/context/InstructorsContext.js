import { createContext, useReducer } from 'react'

export const InstructorsContext = createContext()

export const instructorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INSTRUCTORS':
      return { 
        instructors: action.payload 
      }
    case 'CREATE_INSTRUCTOR':
      return { 
        instructors: [action.payload, ...state.courses] 
      }
    case 'DELETE_INSTRUCTOR': 
      return {
        instructors: state.instructors.filter((c) => c._id !== action.payload._id)
      }  
    default:
      return state
  }
}
export const InstructorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(instructorsReducer, { 
    instructors: null
  })
  
  return (
    <InstructorsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </InstructorsContext.Provider>
  )
}