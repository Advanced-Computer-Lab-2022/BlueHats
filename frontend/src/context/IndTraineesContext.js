import { createContext, useReducer } from 'react'

export const IndTraineesContext = createContext()

export const indTraineesReducer = (state, action) => {
  switch (action.type)
   {
    case 'LOGIN':
      return {indTrainees: action.payload} 

    case 'LOGOUT':
      return {indTrainees: null } 

    case 'SET_INDTRAINEES':
      return { indTrainees: action.payload }

    case 'CREATE_INDTRAINEE':
      return { indTrainees: [action.payload, ...state.indTrainees]}

    case 'DELETE_INDTRAINEE': 
      return { indTrainees: state.indTrainees.filter((i) => i._id !== action.payload._id)}  

    case 'SET_INDTRAINEE':
      return { indTrainees:state.indTrainees.filter((i) => i._id == action.payload._id)}

    default: 
      return state

  }
}

export const IndTraineesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(indTraineesReducer, { 
    indTrainees: null
  })

console.log('AuthContext state : ',state)

  return (
    <IndTraineesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </IndTraineesContext.Provider>
  )
}