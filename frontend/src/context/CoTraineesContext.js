import { createContext, useReducer } from 'react'

export const CoTraineesContext = createContext()

export const CoTraineesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CORPORATETRAINEES':
      return { 
        corporateTrainees: action.payload 
      }
    case 'CREATE_CORPORATETRAINEE':
      return { 
        corporateTrainees: [action.payload, ...state.corporateTrainees] 
      }
    case 'DELETE_CORPORATETRAINEE': 
      return {
        corporateTrainees: state.corporateTrainees.filter((c) => c._id !== action.payload._id)
      }  
    default:
      return state
  }
}

export const CoTraineesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoTraineesReducer, { 
    corporateTrainees: null
  })

  return (
    <CoTraineesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CoTraineesContext.Provider>
  )
}