import { createContext, useReducer } from 'react'

export const AdminsContext = createContext()

export const adminsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMINS':
      return {
        admins: action.payload 
      }
    case 'CREATE_ADMIN':
      return { 
        admins: [action.payload, ...state.admins] 
      }
    case 'DELETE_ADMIN': 
      return {
        admins: state.admins.filter((a) => a._id !== action.payload._id)
      } 
    case 'LOGIN':
      return {admins: action.payload} 

    case 'LOGOUT':
      return {admins: null } 
 
    default:
      return state
  }
}

export const AdminsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminsReducer, { 
    admins: null
  })

  return (
    <AdminsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AdminsContext.Provider>
  )
}