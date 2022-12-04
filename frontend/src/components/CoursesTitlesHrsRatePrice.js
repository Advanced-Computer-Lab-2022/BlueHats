import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
//import { countryValue } from '../components/Navbar'
import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ViewCoursesBytitlesHrsRatePrice = ({ course }) => { 
  const { dispatch } = useCoursesContext();

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
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

  //const currency = getParamByParam('countryName', countryValue, 'symbol');
  const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
  
    return (
      <div className="course-details">
         <Link to='/course/preview/' onClick={handleGetCourse}>  <h4>{course.title}</h4> </Link> 
        <p><strong>Total Hours: </strong>{result} <CheckNumber/> </p>
        <p><strong>Rating: </strong>{course.courseRating}</p>
        <div  className="course-details-price">
        {//<p><strong>Price: </strong> {currency} {course.price}</p>
}
        </div>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
export default ViewCoursesBytitlesHrsRatePrice;