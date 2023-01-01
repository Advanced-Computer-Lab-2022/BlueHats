import AllCourses from '../components/AvailableCourses'
import { Button,Box } from '@mui/material';

import { useEffect, useState} from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// import FilterBar from "../components/FilterBar"
import axios from "axios"

const ViewAllCourses = () => {

  // const {courses, dispatch} = useCoursesContext()

  
  // useEffect(() => {
  //   const fetchCourses = async () => {

  //     var loggedinUser = JSON.parse(localStorage.getItem('user'));
  //     const savedID = loggedinUser.id
  //     const response = await fetch(`/api/corporateTrainee/availableCourses/${savedID}`)

  //     // const response = await fetch('/api/courses')
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({type: 'SET_COURSES', payload: json})
  //     }
  //   }

  //   fetchCourses()
  // }, [dispatch])
  const [courses, setCourses] = useState([]);
  var loggedinUser = JSON.parse(localStorage.getItem('user'));
  const savedID = loggedinUser.id
useEffect(() => {
  const data = {userID: savedID};
  axios({
    method: "PUT",
    url: `/api/corporateTrainee/availableCourses`,
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
    <form >
      <Box className='cotrainee-button1' sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/myrequests/status`}
          margin="normal"
          padding="normal">
            My Requests
          </Button>
        </Box>

        <Box className='cotrainee-button2' sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/myreviews/corporatetrainee`}
          margin="normal"
          padding="normal">
            My Reviews
          </Button>
        </Box>

      <Box className='cotrainee-button3' sx={{marginBottom:2}}>
          <Button variant= "contained"
          onClick={() => window.location.href=`/mycourses/corporatetrainee`}
          margin="normal"
          padding="normal">
           My courses
          </Button>
        </Box>

       <h2>Available Courses</h2>
        <div className="courses">
        {courses && courses.map(course => (
          <AllCourses course={course} key={course._id} />
        ))}
        </div>
     
    </form>
    
  )
}
export default ViewAllCourses

