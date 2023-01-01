import { useEffect, useState} from "react"
import { useReviewsContext } from "../hooks/useReviewsContext"
// components
import IndividualTraineeReviewsDetails from "../components/IndividualTraineeReviewsDetails"
import axios from "axios";


const ViewAllIndReviews = ({review}) => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const savedID = loggedinUser.id
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      const data = {userID: savedID};
      axios({
        method: "PUT",
        url: `/api/reviews/viewiReviews`,
        data: data,
        headers: {'Content-Type': 'application/json'}
      }).then(
        (res) => {
          const reviews = res.data
          setReviews(reviews)
        }
      )
    },[savedID])
  console.log(reviews)

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