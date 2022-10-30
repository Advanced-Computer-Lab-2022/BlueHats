import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'

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

  const handleTheClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'PUT'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'UPDATE_COURSE', payload: json});
    }
  }

    function CheckNumber() {
      if(course.totalhours>1) {
        return 'hours';
      }
      if(course.totalhours===1) {
        return 'hour';
      }
    }

    //const currency = getParamByParam('countryName', countryValue, 'symbol');
    // const result = course.subtitle.reduce((total, currentValue) => total = total + currentValue.MyHours,0);
    // console.log(result)
  
    return (
      <div className="course-details">
        <h4>{course.title}</h4>
        <p><strong>Subject: </strong>{course.subject}</p>
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong> {course.totalhours} <CheckNumber/> </p> 
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined first" onClick={handleClick}>delete</span>
        {/* <span className="material-symbols-outlined second" onClick={handleTheClick}>edit</span> */}
      </div>
    )
  }
  
  export default CourseDetails;