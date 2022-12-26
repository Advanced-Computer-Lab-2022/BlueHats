import { createContext, useReducer } from 'react'

export const ReviewsContext = createContext()

export const reviewsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        reviews: action.payload 
      }
    case 'CREATE_REVIEW':
      return { 
        reviews: [action.payload, ...state.reviews] 
      }
    case 'DELETE_REVIEW': 
      return {
        reviews: state.reviews.filter((a) => a._id !== action.payload._id)
      }  
    default:
      return state
  }
}

export const ReviewsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewsReducer, { 
    reviews: null
  })

  return (
    <ReviewsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ReviewsContext.Provider>
  )
}