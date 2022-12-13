import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

const ReviewCourse = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  const [loading, setLoading] = useState(true) 
  const [courseRate, setCourseRate] = useState()
  const [courseReviews, setCourseReviews] = useState([]) 
  var [instructorRate, setInstructorRate] = useState()
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

   data= {uRate:instructorRate}
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
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>
        <h3>Review your course</h3>
          <label>Enter a rate</label>
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


    <label>Comment:</label>
    <input 
      type="text" 
      onChange={(e) => setCourseReviews(e.target.value)} 
      value={courseReviews}
    />

     <h3>Review your instructor</h3>

<label>Enter a rate</label>
<div class="stars">
                  <form action="">
                    <input class="star star-5" id="starr-5" type="radio" name="star"
                        onChange={(e) => setInstructorRate(e.target.value)} 
                        value={5} />
                    <label class="star star-5" for="starr-5"></label>

                    <input class="star star-4" id="starr-4" type="radio" name="star"
                        onChange={(e) => setInstructorRate(e.target.value)} 
                        value={4}/>
                    <label class="star star-4" for="starr-4"></label>

                    <input class="star star-3" id="starr-3" type="radio" name="star"
                        onChange={(e) => setInstructorRate(e.target.value)} 
                        value={3}/>
                    <label class="star star-3" for="starr-3"></label>

                    <input class="star star-2" id="starr-2" type="radio" name="star"
                        onChange={(e) => setInstructorRate(e.target.value)} 
                        value={2}/>
                    <label class="star star-2" for="starr-2"></label>

                    <input class="star star-1" id="starr-1" type="radio" name="star"
                        onChange={(e) => setInstructorRate(e.target.value)} 
                         value={1}/>
                    <label class="star star-1" for="starr-1"></label>
                  </form>
                </div>

   <button>Submit</button>   
    
   </form>
   )

   }
export default ReviewCourse
