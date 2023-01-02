import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

const CorporateTraineeEditReview = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const reviewId = params.get('reviewId')
  const corporateTraineeId = params.get('corporateTraineeId');

  const [loading, setLoading] = useState(true) 
  const [editedReview, setEditedReview] = useState()

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async(e)=>{
    e.preventDefault()

    setLoading(true)
     var data= {userReview:editedReview}
     const response = await  axios({
        method:'PATCH',
        url: `/api/reviews/${reviewId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
          setLoading(false)
  })
  const json = await response.json()
  if (!response.ok) {
    setError(json.error)
    setEmptyFields(json.emptyFields)
  }
 else {
  setEmptyFields([])
    setError(null)
    setMessage(null)
    setEditedReview()
    
  }

  

}
var loggedinUser = JSON.parse(localStorage.getItem('user'));
const userID = loggedinUser.id
   return (

    <form className ="review-form" onSubmit={handleSubmit}> 
        <h2>Your comment</h2>
        <input 
      type="text" 
      onChange={(e) => setEditedReview(e.target.value)} 
      value={editedReview}
        />
   <button onClick={() => window.location.href=`/myreviews/corporatetrainee?corporateTraineeId=${userID}`}>Edit</button>   
    
   </form>
   )

   }
export default CorporateTraineeEditReview
