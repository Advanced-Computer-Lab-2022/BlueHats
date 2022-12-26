import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Link } from "react-router-dom";
import IFilterBar from "../components/IFilterBar";
// import { acceptedX } from '../components/ContractForm';
import axios from 'axios';

// components
import CourseDetails from "../components/CourseDetails"

const Instructor = () => {

  const [accepted,setAccepted] = useState([])

  const [courses, setCourses] = useState([]);
  const [loading, setLoading ] = useState(true);

  var loggedinUser = JSON.parse(localStorage.getItem('user'));
  const instID = loggedinUser.id;

  useEffect(() => {
    const data = {id: instID};
    setLoading(true)
    axios({
      method: "PUT",
      url: `api/instructors/myCourses`,
      data: data,
      headers: {'Content-Type': 'application/json'}
    }).then(
      (res) => {
        setLoading(false)
        const courses = res.data
        setCourses(courses)
      }
    )
  },[instID])

  const navigate = useNavigate();
  const navigateAddCourse = () => {
    navigate('/instructor/addCourse');
  };

  return (
    <div className="instructor">
      <div className="courses">
      <Link to="/contract" state={accepted}>
          Contract
        </Link> 
        <h3>My Courses</h3>
        <IFilterBar />
        {!loading && courses && courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      <button onClick={navigateAddCourse}>  <AddCircleIcon sx={{ color: "#ffff" }} /><p>Add Course</p> </button>
    </div>
  );
};

export default Instructor;
