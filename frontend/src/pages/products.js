import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { useCoursesContext } from "../hooks/useCoursesContext"
import CourseDetails from "../components/CourseDetails"
import IFilterBar from "../components/IFilterBar";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Products() {
  const [expanded, setExpanded] = React.useState(false);
  const { courses, dispatch } = useCoursesContext();
  const [accepted,setAccepted] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    }
      
    fetchCourses()
  }, [dispatch])

  const navigate = useNavigate();
  const navigateAddCourse = () => {
    navigate('/instructor/addCourse');
  }

  const handleExpandClick = () => 
  {
    setExpanded(!expanded);
  }

  return (
    <div className="instructor">
      <div className="courses">
      <Link to="/contract" state={accepted}>
          Contract
        </Link> 
        <h3>My Courses</h3>
        <IFilterBar />
        {courses && courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>

      <button onClick={navigateAddCourse}>Add Course</button>    
      <div className="instructor-wallet">
        <button>My Wallet</button>    
        {/* {acceptedX.length === 0 ? <div> You cannot create courses yet </div> : <CourseForm /> } */}
      </div>
      </div>
  );
};