import { useCoursesContext } from '../hooks/useCoursesContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext();

  const handleClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_COURSE', payload: json});
    }
  }

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }
  

    return (
      <div className="course-details">
        <h4>{course.title}</h4>
        <p><strong>Subtitle: </strong>{course.subtitle}</p>
        <p><strong>Price: </strong>{course.price}</p>
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default CourseDetails;