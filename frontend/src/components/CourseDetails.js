import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
//import { countryValue } from '../components/Navbar'

// import { ViewCurrency } from '../components/Navbar'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

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

  const handleGetCourse = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'GET'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'GET_COURSE', payload: json});
    }
  }

  // const handleTheClick = async () => {
  //   const response = await fetch('/api/courses/' + course._id, {
  //     method: 'PUT'
  //   })
  //   const json = await response.json();

  //   if(response.ok) {
  //     dispatch({type: 'UPDATE_COURSE', payload: json});
  //   }
  // }

    function CheckNumber() {
      if(result>1) {
        return 'hours';
      }
      if(result===1) {
        return 'hour';
      }
    }

    //const currency = getParamByParam('countryName', countryValue, 'symbol');
    const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
  
    return (
      <div className="course-details">
        <Link to='/course/preview/' onClick={handleGetCourse}>  <h4>{course.title}</h4> </Link> 
        {/*to={`/course/preview/${course._id}`}*/}
        <p><strong>Subject: </strong>{course.subject}</p>
        {//<p><strong>Price: </strong> {currency} {course.price}</p>
}
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined first" onClick={handleClick}>delete</span>
        {/* <span className="material-symbols-outlined second" onClick={handleTheClick}>edit</span> */}
      </div>
    )
  }
  
  export default CourseDetails;