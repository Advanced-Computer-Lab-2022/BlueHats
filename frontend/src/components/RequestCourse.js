import axios from 'axios'
import { useState, /*setCounter*/ } from 'react'

import { Alert, AlertTitle } from '@mui/material'

const RequestCourse = () => {
    // redirected from AvailableCourses.js
  

  const params = new URLSearchParams(window.location.search)
  const courseId = params.get('courseId')
  const corporateTraineeId = params.get('corporateTraineeId')
  const [loading, setLoading] = useState(true) 
  var [goalForApply, setGoalForApply] = useState()
  var [hloe, setHloe] = useState() 
  var [es, setEs] = useState()
  var [atp, setAtp] = useState()
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])



  const handleSubmit = async()=>{

    setLoading(true)
     var data= {reason:goalForApply,
                highestLevelOfEducation:hloe,
                employmentStatus:es,
                agreedToPolicy:atp
                }
      axios({
        method:'POST',
        url: `/api/corporateTrainee/requestCourse?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}`,
        data:data,
        headers:{'Content-Type':'application/json'}
      }).then(()=>{
          setLoading(false)
  })
  
}

   return (

    <form className="request-form" onSubmit={handleSubmit}> 
    <h2>Tell us about yourself</h2>


    <h4>What's your highest level of education?</h4>
    
    <label class="form-controll">
  <input type="radio" name="radioo" onChange={(e) => setHloe(e.target.value)}  value={"High School"}/>
  High School
</label>

<label class="form-controll">
  <input type="radio" name="radioo" onChange={(e) => setHloe(e.target.value)}  value={"Some colloge"}/>
  Some colloge
</label>

<label class="form-controll">
  <input type="radio" name="radioo" onChange={(e) => setHloe(e.target.value)}   value={"College degree"} />
  College degree
</label>

<label class="form-controll">
  <input type="radio" name="radioo" onChange={(e) => setHloe(e.target.value)}   value={"Master's/Advanced degree"}/>
  Master's/Advanced degree
</label>
<label class="form-controll">
  <input type="radio" name="radioo" onChange={(e) => setHloe(e.target.value)}   value={"Other"}/>
  Other
</label>



<h4>What's your employment status?</h4>
    <label class="form-control">
  <input type="radio" name="radio" onChange={(e) => setEs(e.target.value)} value={"Full time"}/>
  Full time
</label>

<label class="form-control">
  <input type="radio" name="radio" onChange={(e) => setEs(e.target.value)} value={"Part time"}/>
  Part time
</label>

<label class="form-control">
  <input type="radio" name="radio"onChange={(e) => setEs(e.target.value)} value={"Unemployed"} />
  Unemployed
</label>

<label class="form-control">
  <input type="radio" name="radio" onChange={(e) => setEs(e.target.value)} value={"Student"}/>
  Student
</label>
<label class="form-control">
  <input type="radio" name="radio" onChange={(e) => setEs(e.target.value)} value={"Other"}/>
  Other
</label>


<div>
    <h4>Why are you applying for financial aid?</h4>
    {/* <input type = "text" 
    onChange={(e) => setGoalForApply(e.target.value)} 
    value={goalForApply}
    required /> */}

<textarea rows="5" cols="90" name="comment" required
    onChange={(e) => setGoalForApply(e.target.value)} 
      value={goalForApply}>
</textarea>
</div>

    <h4>Terms and conditions</h4>
    <div className="policy">
    <label for = "policy">``````I'm sharing accurate information on my application.</label>
    <input   type="checkbox" id="policy" name="policy" 
    value={atp = "Agreed to the policy"}
    onChange={(e) => setAtp(e.target.value)}
    className={emptyFields.includes('atp') ? 'error' : ''}
      />
    </div>


{/*///////////////////////////////////////////////*/}
   <button onClick={<Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  This is a success alert — <strong>check it out!</strong>
</Alert>}> Submit</button>


{error && <div className="error">{error}<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  This is an error alert — <strong>check it out!</strong>
</Alert></div>}
    
   </form>
   )

   }
export default RequestCourse
