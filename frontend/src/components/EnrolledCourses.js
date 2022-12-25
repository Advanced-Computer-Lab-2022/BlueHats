// date fns
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
        
        {/* <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
        </div> */}

        
        
        <Box  className ='rate-button' sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/review?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            Rate Course
          </Button>
        </Box>



        <Box  className ='rate-button' sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/ureviews?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            View Reviews
          </Button>
        </Box>

        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
  
  export default ViewEnrolledCourses;