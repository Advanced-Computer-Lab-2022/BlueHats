import { useEffect } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
// components
import MyReviewsDetails from "../components/MyReviewsDetails"


const ViewAllCoReviews = ({review}) => {
    const {reviews, dispatch} = useReviewsContext()

    useEffect(() => {
        const fetchReviews = async () => {
            // var loggedinUser = JSON.parse(localStorage.getItem('user'));
        // const savedID = loggedinUser.id

           //     const response = await fetch('/api/reviews/viewiReviews/' + savedID, {
//             method: 'GET'
   //     }
            const response = await fetch('/api/reviews/viewcReviews/63a756e189cc94e7139e239c')
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
          <MyReviewsDetails review={review} key={review._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewAllCoReviews