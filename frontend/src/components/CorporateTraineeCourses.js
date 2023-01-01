// date fns
import { Button,Box } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


// import BasicRating from './BasicRating';

const CorporateTraineeCourses = ({ course }) => { 

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
  
       var loggedinUser = JSON.parse(localStorage.getItem('user'));
         const savedID = loggedinUser.id
    return (
      <div className="co-courses">
        <h4>{course.title}</h4>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        {/* <p className="view-price" ><strong ></strong>{course.price}</p> */}

        <p><strong>Rating: </strong><Stars/>{Number.parseFloat(course.courseRating).toFixed(2)} ({course.numberOfRates}) </p>
        {/* <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
        </div> */}

<p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
       
      <Box sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/ratecourse/corporateTrainee?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            Rate course
          </Button>
        </Box>

        <Box  sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/rateinstructor/corporateTrainee?courseId=${course._id}`}
          margin="normal"
          padding="normal">
           Rate instructor
          </Button>
        </Box>


        <Box  sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/viewaddreviews/corporatetrainee?courseId=${course._id}&corporateTraineeId=${savedID}`}
          margin="normal"
          padding="normal">
            View Reviews
          </Button>
        </Box>
        
      </div>
    )
}
export default CorporateTraineeCourses;

