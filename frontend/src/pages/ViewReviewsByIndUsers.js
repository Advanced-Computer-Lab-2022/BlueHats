//import { useEffect } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
import React, { useState, useEffect } from "react";
import axios from 'axios'

// components
import ReviewDetails from "../components/ReviewDetails"

// import TextareaValidator from "./AddReview"

const ViewReviewsByUsers = () => {

    const [courseReview, setCourseReview] = useState()
    const [loading, setLoading] = useState(true) 
    const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');

   // var loggedinUser = JSON.parse(localStorage.getItem('user'));
    // const savedID = loggedinUser.id

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

  const handleSubmit = async()=>{
  setLoading(true)
     var data= {userReview:courseReview}
      axios({
        method:'POST',
        url: `/api/indTrainee/addreview/?courseId=${courseId}&individualTraineeId=63a6356bd3f9a62c95ff1d4b`,
        //url: `/api/indTrainee/addreview/?courseId=${courseId}&individualTraineeId=${savedID}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
          setLoading(false)
  })
  }
  
  return (
      <div >
        <div>
        {reviews && reviews.map(review => (
          <ReviewDetails review={review} key={review._id} />
        ))}
      </div>

          
      <label>Comment:</label>

        <textarea rows="5" cols="90" name="comment" required
        onChange={(e) => setCourseReview(e.target.value)} 
          value={courseReview}>
          
       
        </textarea>
        
        <button className="post-review"onClick={handleSubmit}> POST</button> 

      </div>
    
  )

}

export default ViewReviewsByUsers