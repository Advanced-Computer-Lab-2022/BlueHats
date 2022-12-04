// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ViewMyCourses = ({course }) => {

    return (
        <div className="course-details-ss">
          <h4>{course.title}</h4>
          <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        </div>
      )
      
}
export default ViewMyCourses