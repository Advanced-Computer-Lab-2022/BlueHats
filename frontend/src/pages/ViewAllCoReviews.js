import { useEffect, useState } from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
// components
import CorporateTraineeReviewsDetails from "../components/CorportateTraineeReviewsDetails"
import axios from "axios"

const ViewAllCoReviews = ({review}) => {
  
  const params = new URLSearchParams(window.location.search);
  const corporateTraineeId = params.get('corporateTraineeId');

    const {reviews, dispatch} = useReviewsContext()
    
    useEffect(() => {
        const fetchReviews = async () => {
            var loggedinUser = JSON.parse(localStorage.getItem('user'));
            const savedID = loggedinUser.id
            const response = await fetch(`/api/reviews/viewcReviews/${corporateTraineeId}`)
            
            // const response = await fetch('/api/reviews/viewcReviews/63a756e189cc94e7139e239c')
            const json = await response.json();
            if(response.ok) {
                dispatch({type: 'SET_REVIEWS', payload: json});
                }
            }
        fetchReviews();
    }, [dispatch])
    

  //   var loggedinUser = JSON.parse(localStorage.getItem('user'));
  //   const savedID = loggedinUser.id
  //   const [reviews, setReviews] = useState([]);
  //   useEffect(() => {
  //     const data = {userID: savedID};
  //     axios({
  //       method: "PUT",
  //       url: `/api/reviews/viewcReviews`,
  //       data: data,
  //       headers: {'Content-Type': 'application/json'}
  //     }).then(
  //       (res) => {
  //         const reviews = res.data
  //         setReviews(reviews)
  //       }
  //     )
  //   },[savedID])
  // console.log(reviews)
  

  return (
    <div >
        <h2>My Reviews</h2>
        <div>
        {reviews && reviews.map(review => (
          <CorporateTraineeReviewsDetails review={review} key={review._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewAllCoReviews