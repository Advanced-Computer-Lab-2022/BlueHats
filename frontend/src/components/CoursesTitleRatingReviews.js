import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

const ReviewCourse = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  const [loading, setLoading] = useState(true) 
  const [courseRate, setCourseRate] = useState()
  const [courseReviews, setCourseReviews] = useState([]) 
  const [instructorRate, setInstructorRate] = useState()
  const handleSubmit = async()=>{

    setLoading(true)
     var data= {userRate:courseRate}
      axios({
        method:'PATCH',
        url: `/api/nUsers/rateCourse/?courseId=${courseId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
          setLoading(false)
  })

     data= {reviews:courseReviews}
      axios({
        method:'PATCH',
        url: `/api/nUsers/addRev/?courseId=${courseId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
        setLoading(false)
})

   data= {userRate:instructorRate}
    setLoading(true)
  axios({
    method:'PATCH',
    url: `/api/nUsers/rateInstructor/?courseId=${courseId}`,
    data:data,
    headers:{'Content-Type':'application/json'}

  }).then(
    () => {
      setLoading(false)
    })
  

}
   return (

    <form className="create" onSubmit={handleSubmit}> 
    <h3>Review your course</h3>

    <label>Enter a rate</label>
    <input 
      type="number" 
      onChange={(e) => setCourseRate(e.target.value)} 
      value={courseRate}
    />

    <label>Comment:</label>
    <input 
      type="text" 
      onChange={(e) => setCourseReviews(e.target.value)} 
      value={courseReviews}
    />
     <h3>Review your instructor</h3>

<label>Enter a rate</label>
<input 
  type="number" 
  onChange={(e) => setInstructorRate(e.target.value)} 
  value={instructorRate}
/>
    
   <button>Submit</button>   
    
   </form>
   )

   }
export default ReviewCourse
