// date fns
import { Rating, Button,Box } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useState, /*setCounter*/  } from 'react'
import axios from 'axios'

const ViewMyCourses = ({ course }) => { 

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }
  function Stars(){
    if (course.courseRating >= 1 && course.courseRating<=1.5){
         return "⭐";
         }
    if (course.courseRating > 1.5 && course.courseRating<=2.5)
       {
         return "⭐⭐"
     }
     if (course.courseRating > 2.5 && course.courseRating<=3.5)
       {
         return "⭐⭐⭐"
          
     }
     if (course.courseRating > 3.5 && course.courseRating<=4.5)
       {
         return "⭐⭐⭐⭐"
         
     }
     if (course.courseRating > 4.5 && course.courseRating<=5)
       {
         return "⭐⭐⭐⭐⭐";
         
     }
   }

   function Reviews(){
    var res = ""
    var c = 1
    for (let i =0 ; i<course.reviews.length;i++){
      res += '-Review ' + c + ": " + course.reviews[i].reviews  + " \n "
      c++;
    }
        return res;
   }

   
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
      url: `/api/corporateTrainee/rateCourse/?courseId=${course._id}`,
      data:data,
      headers:{'Content-Type':'application/json'}
    }).then(()=>{
        setLoading(false)
})

}
//   var data= {reviews:courseReviews}
//    setLoading(true)
//     axios({
//       method:'PATCH',
//       url: `/api/corporateTrainee/addRev/?courseId=${course._id}`,
//       data:data,
//       headers:{'Content-Type':'application/json'}
//     }).then(()=>{
//       setLoading(false)
// })

//  data= {uRate:instructorRate}
//   setLoading(true)
// axios({
//   method:'PATCH',
//   url: `/api/corporateTrainee/rateInstructor/?courseId=${course._id}`,
//   data:data,
//   headers:{'Content-Type':'application/json'}
// }).then(
//   () => {
//     setLoading(false)
//   })

  
    return (
      <div className="course-details-ss">
        <h4>{course.title}</h4>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        {/* <p className="view-price" ><strong ></strong>{course.price}</p> */}
        <p><strong>Rating: </strong>{Number.parseFloat(course.courseRating).toFixed(2)} / 5 <strong> <Stars></Stars></strong> </p>
        

        <div>
        <Rating
            value={courseRate}
            onChange={(e) => setCourseRate(e.target.value) && handleSubmit} 
        />
        </div>

        {/* <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
        </div> */}

        <Box className='rate-button'sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/rev?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            Rate Course
          </Button>
        </Box>

        <Box  className ='rate-button' sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/creviews?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            View Reviews
          </Button>
        </Box>

        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
  
  export default ViewMyCourses;




  /* // date fns
import { Button,Box } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ViewEnrolledCourses = ({ course }) => { 

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }
  function Stars(){
    if (course.courseRating >= 1 && course.courseRating<=1.5){
         return "⭐";
         }
    if (course.courseRating > 1.5 && course.courseRating<=2.5)
       {
         return "⭐⭐"
     }
     if (course.courseRating > 2.5 && course.courseRating<=3.5)
       {
         return "⭐⭐⭐"
          
     }
     if (course.courseRating > 3.5 && course.courseRating<=4.5)
       {
         return "⭐⭐⭐⭐"
         
     }
     if (course.courseRating > 4.5 && course.courseRating<=5)
       {
         return "⭐⭐⭐⭐⭐";
         
     }
   }

   function Reviews(){
    var res = ""
    var c = 1
    for (let i =0 ; i<course.reviews.length;i++){
      res += '-Review ' + c + ": " + course.reviews[i].reviews  + " \n "
      c++;
    }
        return res;
   }
  
    return (
      <div className="course-details-ss">
        <h4>{course.title}</h4>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        <div  className="course-details-price">
        <p className="view-price" ><strong ></strong>{course.price}</p>
        </div>
        <p><strong>Rating: </strong>{course.courseRating} / 5 <strong> <Stars/></strong> </p>
        <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
        </div>
        
        <Box sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/review?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            Rate Course
          </Button>
        </Box>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
  
  export default ViewEnrolledCourses;*/