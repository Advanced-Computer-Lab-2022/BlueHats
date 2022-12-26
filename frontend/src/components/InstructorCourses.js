// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { Button,Box } from '@mui/material';


const ViewMyCourses = ({course }) => {
  function Stars(){
    if (course.instructorRate >= 1 && course.instructorRate<=1.5){
         return "⭐";
         }
    if (course.instructorRate > 1.5 && course.instructorRate<=2.5)
       {
         return "⭐⭐"
     }
     if (course.instructorRate > 2.5 && course.instructorRate<=3.5)
       {
         return "⭐⭐⭐"
          
     }
     if (course.instructorRate > 3.5 && course.instructorRate<=4.5)
       {
         return "⭐⭐⭐⭐"
         
     }
     if (course.instructorRate > 4.5 && course.instructorRate<=5)
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
          <p><strong>Rate:</strong>{course.instructorRate} / 5 <strong> <Stars/> </strong> </p>
          <p><strong>Enrolled students : </strong>{course.enrolledStudents} <strong> </strong> </p>

          {/* <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
          </div> */}

          <div>
          <Box  className ='rate-button' sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/ireviews?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            View Reviews
          </Button>
        </Box>
        </div>
          <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>

        </div>
      )
      
}
export default ViewMyCourses