import { useReviewsContext } from '../hooks/useReviewsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RequestDetails = ({ review }) => {
  const { dispatch } = useReviewsContext();


  const handleClick = async () => {
    const response = await fetch('/api/reviews/' + review._id, {
      method: 'GET'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'SET_REVIEWS', payload: json});
    }
  }



    return (
      <div className="request-details">
        <h4>{review.userName}</h4>
        <p><strong>•</strong>{review.userReview}</p>
        <p>Added {formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})}</p>
      </div>
    )
  }
  
  export default RequestDetails;