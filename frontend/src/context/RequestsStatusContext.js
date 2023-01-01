import { createContext, useReducer } from 'react'

export const RequestsStatusContext = createContext()

export const requestsStatusReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { 
        requestsstatus: action.payload 
      }
    case 'HANDLE_REQUEST': 
      return {
        requestsstatus: state.requestsstatus.filter((i)=> i._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const RequestsStatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsStatusReducer, { 
    requestsstatus: null
  })

  return (
    <RequestsStatusContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RequestsStatusContext.Provider>
  )
}