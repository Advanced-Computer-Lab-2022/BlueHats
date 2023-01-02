// date fns
import { Button,Box } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import { Link } from 'react-router-dom';
import axios from "axios";



// import BasicRating from './BasicRating';

const CorporateTraineeCourses = ({ course }) => { 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
      setOpen1(true);
  };

  const handleCloseD = () => {
      setOpen1(false);
  };

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }
  function Stars(){
    if (course.courseRating >= 1 && course.courseRating<=1.5){
         return "⭐";
         }
    if (course.courseRating > 1.5 && course.courseRating<=2.5)
       {
         return "⭐⭐"
     }
     if (course.courseRating > 2.5 && course.courseRating<=3.5)
       {
         return "⭐⭐⭐"
          
     }
     if (course.courseRating > 3.5 && course.courseRating<=4.5)
       {
         return "⭐⭐⭐⭐"
         
     }
     if (course.courseRating > 4.5 && course.courseRating<=5)
       {
         return "⭐⭐⭐⭐⭐";
         
     }
   }
   var loggedinUser = JSON.parse(localStorage.getItem('user'));
   const userID = loggedinUser.id;

   const [progress, setProgress] = useState(0); 


   useEffect(() =>  {
       const data1={courseID: course._id, userID: userID};
       axios({
         method: "PUT",
         url : `/api/corporateTrainee/getProgress`,
         data:data1,
         headers:{'Content-Type':'application/json'}
       })
       .then( (res) => { 
         const progress = res.data
         console.log(progress)
         setProgress(progress)  
       });
     },[course._id, userID])

   function Reviews(){
    var res = ""
    var c = 1
    for (let i =0 ; i<course.reviews.length;i++){
      res += '-Review ' + c + ": " + course.reviews[i].reviews  + " \n "
      c++;
    }
        return res;
   }
  
         
    return (
      <div className="co-courses">
        {/* <Link onClick={() => window.location.href=`/course/view?id=${course._id}`}>  <h4>{course.title}</h4> </Link>  */}
        <h4>{course.title}</h4> 
        <p><strong>Total Hours: </strong>{course.totalhours} <CheckNumber/> </p>
        {/* <p className="view-price" ><strong ></strong>{course.price}</p> */}

        <p><strong>Rating: </strong><Stars/>{Number.parseFloat(course.courseRating).toFixed(2)} ({course.numberOfRates}) </p>
        {/* <div>
          <p><strong>Reviews: </strong> <Reviews/></p>
        </div> */}

<p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
       
      {/* <Box sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/ratecourse/corporateTrainee?courseId=${course._id}`}
          margin="normal"
          padding="normal">
            Rate course
          </Button>
        </Box>

        <Box  sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/rateinstructor/corporateTrainee?courseId=${course._id}`}
          margin="normal"
          padding="normal">
           Rate instructor
          </Button>
        </Box>


        <Box  sx={{marginBottom:2}}>
          <Button  variant= "contained"
          onClick={() => window.location.href=`/viewaddreviews/corporatetrainee?courseId=${course._id}&corporateTraineeId=${userID}`}
          margin="normal"
          padding="normal">
            View Reviews
          </Button>
        </Box> */}
        <div className="enrolled-outer-progress">
            <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                backgroundColor: "#3ec754",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
                })}
            />
        </div>
         <div className="enrolled-menu">
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem   onClick={() => window.location.href=`/ratecourse/corporateTrainee?courseId=${course._id}`}>
            Rate Course
          </MenuItem>
          <MenuItem    onClick={() => window.location.href=`/rateinstructor/corporateTrainee?courseId=${course._id}`}>
            Rate Instructor
          </MenuItem>
          <MenuItem   onClick={() => window.location.href=`/viewaddreviews/corporatetrainee?courseId=${course._id}&corporateTraineeId=${userID}`}>
            Course Reviews
          </MenuItem>
      </Menu>
      </div>
      </div>
    )
}
export default CorporateTraineeCourses;

