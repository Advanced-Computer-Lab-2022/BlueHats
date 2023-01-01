import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const IndTraineeRateCourse = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  const [loading, setLoading] = useState(true) 
  const [courseRate, setCourseRate] = useState()

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async(e)=>{
    e.preventDefault()

    setLoading(true)
     var data= {userRate:courseRate}
     const response = await axios({
        method:'PATCH',
        url: `/api/indTrainee/rateCourse/?courseId=${courseId}`,
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
    setCourseRate()
  }
  

}
   return (

    <form className ="ind-rate" onSubmit={handleSubmit}> 
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>
        <h2>Rate your course</h2>
              <div class="stars">
                  <form action="">
                  
                    <input class="star star-5" id="star-5" type="radio" name="star"
                        onChange={(e) => setCourseRate(e.target.value)} 
                        value={5} />
                    <label class="star star-5" for="star-5"></label>

                    <input class="star star-4" id="star-4" type="radio" name="star"
                        onChange={(e) => setCourseRate(e.target.value)} 
                        value={4}/>
                    <label class="star star-4" for="star-4"></label>

                    <input class="star star-3" id="star-3" type="radio" name="star"
                        onChange={(e) => setCourseRate(e.target.value)} 
                        value={3}/>
                    <label class="star star-3" for="star-3"></label>

                    <input class="star star-2" id="star-2" type="radio" name="star"
                        onChange={(e) => setCourseRate(e.target.value)} 
                        value={2}/>
                    <label class="star star-2" for="star-2"></label>

                    <input class="star star-1" id="star-1" type="radio" name="star"
                        onChange={(e) => setCourseRate(e.target.value)} 
                         value={1}/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>


    {/* <label>Comment:</label>

    <textarea rows="5" cols="90" name="comment" required
    onChange={(e) => setCourseReviews(e.target.value)} 
      value={courseReviews}>
</textarea> */}

    {/* <input 
      type="text" 
      onChange={(e) => setCourseReviews(e.target.value)} 
      value={courseReviews}
    /> */}

    

   <button onClick={() => window.location.href=`/mycourses/individualTrainee`}>Submit</button>  
   {/* {message && <div className='msg'}{message}</div>} */}
   {error && <div className="error">{error}</div>}
  
    
   </form>
   )

   }
export default IndTraineeRateCourse