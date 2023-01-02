import { useEffect , useState} from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
//import { useInstructorsContext } from "../hooks/useInstructorsContext"

// components
import IndTraineeCourses from "../components/IndTraineeCourses"
import axios from "axios"



const ViewIndividualTraineeCourses = () => {
 var loggedinUser = JSON.parse(localStorage.getItem('user'));
      const savedID = loggedinUser.id
     const [courses, setCourses] = useState([]);


      useEffect(() => {
        const data = {id: "savedID"};
        axios({
          method: "PUT",
          url: `/api/indTrainee/filter`,
          data: data,
          headers: {'Content-Type': 'application/json'}
        }).then(
          (res) => {
            const courses = res.data
            setCourses(courses)
          }
        )
      },[savedID])
   
  return (
    <div className="ViewMyCourses">
      <div className="Mycourses">
        <h3>Mycourses</h3>
        {courses && courses.map((course) => (
          <IndTraineeCourses course={course} key={course._id} />
        ))}
      </div>
    </div>
  )


}

export default ViewIndividualTraineeCourses