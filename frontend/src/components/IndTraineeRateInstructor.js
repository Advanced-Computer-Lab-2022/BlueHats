import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

const IndTraineeRateInstructor = ({course}) => {

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')

  const [loading, setLoading] = useState(true) 
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  var [instructorRate, setInstructorRate] = useState()
  const handleSubmit = async(e)=>{
    e.preventDefault()


   var data= {uRate:instructorRate}
    setLoading(true)
    const response =  await axios({
    method:'PATCH',
    url: `/api/indTrainee/rateInstructor/?courseId=${courseId}`,
    data:data,
    headers:{'Content-Type':'application/json'}
  }).then(
    () => {
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
    setInstructorRate()
  }
}
  


return (
    <form className ="ind-rate" onSubmit={handleSubmit}> 
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>
<h2>Review your instructor</h2>

<div class="stars">
                  <form   action="">
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

<button onClick={() => window.location.href=`/mycourses/individualTrainee`}>Submit</button>  
{/* {message && <div className='msg'}{message}</div>} */}
{error && <div className="error">{error}</div>}

</form>
)

}
export default IndTraineeRateInstructor