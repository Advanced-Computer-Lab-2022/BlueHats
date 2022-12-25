// import { useCoursesContext } from '../hooks/useCoursesContext'
import { Button,Box } from '@mui/material';


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const AvailableCourses = ({ course, corporateTrainee }) => { 
  
//   const { dispatch } = useCoursesContext();

//   function CheckNumber() {
//     if (course.totalhours>1) {
//       return 'hours';
//     }
//     if (course.totalhours===1) {
//       return 'hour';
//     }
//   }

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
  // var loggedinUser = JSON.parse(localStorage.getItem('user'))
  // const corporateTraineeId  = loggedinUser.id
    return (
      
      <div className="course-details">      
         <h4>{course.title}</h4> 
        <p><strong>Rating: </strong> {course.courseRating} <Stars/> </p>
         <p><strong>summary: </strong>{course.summary}</p>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>

        <div> <Box sx={{marginBottom:2}}>
          <Button className = "request" variant= "contained"
          onClick={() => window.location.href=`/requestCourse?courseId=${course._id}&corporateTraineeId=63a756e189cc94e7139e239c`}
          margin="normal"
          padding="normal">
            Request
          </Button>
        </Box>
        </div>
      </div>
    )
}
  
export default AvailableCourses;