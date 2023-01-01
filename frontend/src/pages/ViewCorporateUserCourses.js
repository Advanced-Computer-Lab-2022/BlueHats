import { useEffect, useState} from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import CorporateTraineeCourses from "../components/CorporateTraineeCourses"
import axios from "axios"



const ViewCorporateTraineeCourses = () => {
//  const {courses,dispatch} = useCoursesContext()
//  useEffect(() => {
//   const fetchMyCourses = async () => {
//      var loggedinUser = JSON.parse(localStorage.getItem('user'));
//       const savedID = loggedinUser.id
      
//       const response = await fetch(`/api/corporateTrainee/filter/${savedID}`)

//   // const response = await fetch('/api/corporateTrainee/filter/63a756e189cc94e7139e239c')
//   const json = await response.json();
//   if(response.ok) {
//       dispatch({type: 'SET_COURSES', payload: json});
//       }
//   }

//   fetchMyCourses();
// }, [dispatch])
      const [courses, setCourses] = useState([]);
      var loggedinUser = JSON.parse(localStorage.getItem('user'));
      const savedID = loggedinUser.id
    useEffect(() => {
      const data = {userID: savedID};
      axios({
        method: "PUT",
        url: `/api/corporateTrainee/filter`,
        data: data,
        headers: {'Content-Type': 'application/json'}
      }).then(
        (res) => {
          const courses = res.data
          setCourses(courses)
        }
      )
    },[savedID])
  console.log(courses)
      
   
  return (
    <div className="ViewMyCourses">
      <div className="Mycourses">
        <h3>Mycourses</h3>
        {courses && courses.map((course) => (
          <CorporateTraineeCourses course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewCorporateTraineeCourses