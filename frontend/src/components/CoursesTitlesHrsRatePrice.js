//import { useCoursesContext } from '../hooks/useCoursesContext'
//import { useEffect } from "react"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const Vcourses = ({ course }) => { 

 // const { dispatch } = useCoursesContext();

  // on clicking view price, i want to open an new page that shows the specified data showing its price
 /* const handleClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'GET'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: '', payload: json});
        
      }
    }*/


  
  

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }


  
    return (
      <div className="course-details-s">
        <h4>{course.title}</h4>
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        <p><strong>Rating: </strong>{course.courseRating}</p>
        <div  className="course-details-price">
        <p className="view-price" ><strong ></strong>{course.price}</p>
        </div>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
  
  export default Vcourses;