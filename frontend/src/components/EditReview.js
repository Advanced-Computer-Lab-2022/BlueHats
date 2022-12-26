import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

const EditReview = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const reviewId = params.get('reviewId')
  const [loading, setLoading] = useState(true) 
  const [editedReview, setEditedReview] = useState()

  const handleSubmit = async()=>{

    setLoading(true)
     var data= {userReview:editedReview}
      axios({
        method:'PATCH',
        url: `/api/reviews/${reviewId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
          setLoading(false)
  })

  

}
   return (

    <form className ="review-form" onSubmit={handleSubmit}> 
        <h2>Your comment</h2>
        <input 
      type="text" 
      onChange={(e) => setEditedReview(e.target.value)} 
      value={editedReview}
        />
   <button> Submit</button>   
    
   </form>
   )

   }
export default EditReview
