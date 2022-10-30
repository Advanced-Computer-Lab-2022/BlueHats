//import { useInstructorsContext } from '../hooks/useInstructorsContext'
//import { useCoursesContext } from '../hooks/useCoursesContext'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

//const ViewMyCourses = ({ Instructor, course }) => {

const ViewMyCourses = ({course }) => {
 

    return (
        <div className="my-courses-details">
          <h4>{course.title}</h4>
          <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        </div>
      )

}
export default ViewMyCourses