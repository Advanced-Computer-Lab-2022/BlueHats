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

//   const handleGetCourse = async () => {
//     const response = await fetch('/api/courses/' + course._id, {
//       method: 'GET'
//     })
//     const json = await response.json();

//     if(response.ok) {
//       dispatch({type: 'GET_COURSE', payload: json});
//     }
//   }

  //const currency = getParamByParam('countryName', countryValue, 'symbol');
//   const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
  
    return (
      
      <div className="course-details">      
         <h4>{course.title}</h4> 
        <p><strong>Rating: </strong> {course.courseRating} <Stars/> </p>
         <p><strong>summary: </strong>{course.summary}</p>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>

        <div> <Box sx={{marginBottom:2}}>
          <Button className = "request" variant= "contained"
          onClick={() => window.location.href=`/requestCourse?courseId=${course._id}&corporateTraineeId=639db323c740c435b75bd450`}
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