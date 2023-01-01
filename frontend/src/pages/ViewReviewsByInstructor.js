//import { useEffect } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
import React, { useState, useEffect } from "react";

// components
import ReviewDetails from "../components/ReviewDetails"

const ViewReviewsByInstructors = () => {

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');


 const {reviews, dispatch} = useReviewsContext()



 useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/api/reviews/viewall/'+ courseId, {
        method: 'GET'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_REVIEWS', payload: json})
      }
    }

    fetchReviews()
  }, [dispatch])

  
  return (
      <div >
        <div>
        {reviews && reviews.map(review => (
          <ReviewDetails review={review} key={review._id} />
        ))}
      </div>
      </div>
    
  )

}
export default ViewReviewsByInstructors