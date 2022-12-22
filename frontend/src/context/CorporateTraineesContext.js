import { createContext, useReducer } from 'react'

export const CorporateTraineesContext = createContext()

export const corporateTraineesReducer = (state, action) => {
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
    case 'LOGIN':
      return {corporateTrainees: action.payload} 

    case 'LOGOUT':
      return {corporateTrainees: null } 
  
    default:
      return state
  }
}

export const CorporateTraineesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(corporateTraineesReducer, { 
    corporateTrainees: null
  })

  return (
    <CorporateTraineesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CorporateTraineesContext.Provider>
  )
}