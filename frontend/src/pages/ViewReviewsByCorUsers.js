//import { useEffect } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
import React, { useState, useEffect } from "react";
import axios from 'axios'

// components
import ReviewDetails from "../components/ReviewDetails"

// import TextareaValidator from "./AddReview"

const ViewReviewsByCorUsers = () => {

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  const corporateTraineeId = params.get('corporateTraineeId');

  
    const [courseReview, setCourseReview] = useState();
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [message, setMessage] = useState(null);



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


  const handleSubmit = async(e)=>{

    e.preventDefault()

  setLoading(true)
     var data= {userReview:courseReview}
    const response1 = await axios({
        method:'POST',
        // url: `/api/corporateTrainee/addreview/?courseId=${courseId}&corporateTraineeId=63a756e189cc94e7139e239c`,
        url: `/api/indTrainee/addreview/?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
        setLoading(false)
        window.location.href=`/viewaddreviews/corporatetrainee?courseId=${courseId}`

  })

  const json1 = await response1.json()
  if (!response1.ok) {
    setError(json1.error)
    setEmptyFields(json1.emptyFields)
  }
 else {
  setEmptyFields([])
    setError(null)
    setMessage(null)
    setCourseReview()
  }
}

  
 //onClick={    window.location.href=`/viewaddreviews/corporatetrainee?courseId=${courseId}`}

  return (
      <div>
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
        
        <button className="post-review" onClick={handleSubmit}> POST</button> 
      </div>
    
  )

}

export default ViewReviewsByCorUsers