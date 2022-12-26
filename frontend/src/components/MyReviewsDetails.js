import { useReviewsContext } from '../hooks/useReviewsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Button,Box } from '@mui/material';

const MyReviewsDetails = ({ review }) => {
  const { dispatch } = useReviewsContext();


  const handleClick = async () => {
    const response = await fetch('/api/reviews/' + review._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_REVIEW', payload: json});
    }
  }

  // const handleClick = async () => {
  //   const response = await fetch('/api/reviews/' + review._id, {
  //     method: 'PATCH'
  //   })
  //   const json = await response.json();

  //   if(response.ok) {
  //     dispatch({type: 'CREATE_REVIEW', payload: json});
  //   }
  // }



    return (
      <div className="request-details">
        <h4>{review.courseName}</h4>
        <p><strong>•</strong>{review.userReview}</p>
        <p>Added {formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})}</p>
        <div className = "edit-details">
               <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        <div>
        <Box  className ='rate-button' sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/edit?reviewId=${review._id}`}
          margin="normal"
          padding="normal">
            Edit
          </Button>
        </Box>
        </div>
      </div>
    )
  }
  
  export default MyReviewsDetails;