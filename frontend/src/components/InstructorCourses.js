// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ViewMyCourses = ({course }) => {

    return (
        <div className="course-details-ss">
          <h4>{course.title}</h4>
          <p><strong>Rate:</strong>{course.instructorRate} / 5 <strong className='sta'>★</strong> </p>
          <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        </div>
      )
      
}
export default ViewMyCourses