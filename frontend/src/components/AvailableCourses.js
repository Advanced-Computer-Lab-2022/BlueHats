// import { useCoursesContext } from '../hooks/useCoursesContext'
import { Button,Box } from '@mui/material';


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const AllCourses = ({ course, corporateTrainee }) => { 
  
//   const { dispatch } = useCoursesContext();

//   function CheckNumber() {
//     if (course.totalhours>1) {
//       return 'hours';
//     }
//     if (course.totalhours===1) {
//       return 'hour';
//     }
//   }
  function requestStatus(){
  if (course.requestStatus == 1){
    return "Accepted";
  }
  if (course.requestStatus == 2){
    return "Rejected";
  }
  if (course.requestStatus == 0){
    return "Not requested";
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
    // to get id of current user
  var loggedinUser = JSON.parse(localStorage.getItem('user'))
  const userID  = loggedinUser.id
    return (
      
      <div className="co-courses">      
         <h4>{course.title}</h4> 
         <p><strong>Rating: </strong><Stars/>{Number.parseFloat(course.courseRating).toFixed(2)} ({course.numberOfRates}) </p>
         <p><strong>summary: </strong>{course.summary}</p>

         <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>

        <Box sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/requestcourse?courseId=${course._id}&corporateTraineeId=${userID}`}
          margin="normal"
          padding="normal">
            Request
          </Button>
        </Box>
        
        </div>
      
    )
}
  
export default AllCourses;