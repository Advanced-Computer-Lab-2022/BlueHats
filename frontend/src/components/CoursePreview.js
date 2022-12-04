import { getParamByParam } from 'iso-country-currency'
import { countryValue } from './Navbar'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CoursePreview = ({course}) => {

    function CheckNumber() {
        if(result>1) {
          return 'hours';
        }
        if(result===1) {
          return 'hour';
        }
      }

    const currency = getParamByParam('countryName', countryValue, 'symbol');
    const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);


    return (
        <div className="course-preview">
            <h1>{course.title}</h1>
            <p><strong></strong>{course.summary}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            {//<p><strong>Price: </strong> {currency} {course.price}</p>
}           <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
            <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <h4>Course Content</h4>
            <ol>{(course.subtitle).map((mycourse)=> <li mycourse={mycourse} key={course._id}>  {mycourse.name} is {mycourse.hours} hours </li>)}</ol>
        </div>
        
    )
}
export default CoursePreview