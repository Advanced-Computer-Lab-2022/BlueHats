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

  
    return (
      <div className="course-details-ss">
        <h4>{course.title}</h4>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        <div  className="course-details-price">
        <p className="view-price" ><strong ></strong>{course.price}</p>
        </div>
        <p><strong>Rating: </strong>{course.courseRating} / 5 <strong className='sta'>⭐</strong> </p>
        <div>
        <p><strong>Reviews: </strong>{ JSON.stringify(course.reviews)}</p>
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
  
  
  export default ViewEnrolledCourses;