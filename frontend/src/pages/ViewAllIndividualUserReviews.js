import { useEffect } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
// components
import IndividualTraineeReviewsDetails from "../components/IndividualTraineeReviewsDetails"


const ViewAllIndReviews = ({review}) => {
    const {reviews, dispatch} = useReviewsContext()

    useEffect(() => {
        const fetchReviews = async () => {
            var loggedinUser = JSON.parse(localStorage.getItem('user'));
            const savedID = loggedinUser.id
            const response = await fetch(`/api/reviews/viewiReviews/${savedID}`)
            
            // const response = await fetch('/api/reviews/viewiReviews/63a6356bd3f9a62c95ff1d4b')
            const json = await response.json();
            if(response.ok) {
                dispatch({type: 'SET_REVIEWS', payload: json});
                }
            }
        fetchReviews();
    }, [dispatch])
  

  return (
    <div >
              <h2>My Reviews</h2>

        <div>
        {reviews && reviews.map(review => (
          <IndividualTraineeReviewsDetails review={review} key={review._id} />
        ))}
      </div>


    </div>
  )


}

export default ViewAllIndReviews