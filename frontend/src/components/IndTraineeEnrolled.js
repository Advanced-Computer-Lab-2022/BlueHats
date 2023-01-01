import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from "axios";


const ViewCoursesBytitlesHrsRatePrice = ({ course }) => { 

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
        if(progress<50)
        {
            const data={course: course._id, indTrainee: userID};
            axios({
                method: "POST",
                url : `/api/courses/requestRefund`,
                data:data,
                headers:{'Content-Type':'application/json'}
            })
        }
    };

    const handleCloseD = () => {
        setOpen1(false);
    };

    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const userID = loggedinUser.id;

    const [progress, setProgress] = useState(0); 


    useEffect(() =>  {
        const data1={courseID: course._id, userID: userID};
        axios({
          method: "PUT",
          url : `/api/indTrainee/getProgress`,
          data:data1,
          headers:{'Content-Type':'application/json'}
        })
        .then( (res) => { 
          const progress = res.data
          console.log(progress)
          setProgress(progress)  
        });
      },[course._id, userID])

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }

    const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
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


    return (
      <div className="course-details">
         <Link onClick={() => window.location.href=`/course/view?id=${course._id}`}>  <h4>{course.title}</h4> </Link> 
        <p><strong>Total Hours: </strong>{result} <CheckNumber/> </p>
        <p><strong>Rating: </strong><Stars/>{Number.parseFloat(course.courseRating).toFixed(2)} ({course.numberOfRates}) </p>
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
        <MenuItem   onClick={() => window.location.href=`/ratecourse/individualTrainee?courseId=${course._id}`}>
            Rate Course
          </MenuItem>
          <MenuItem  onClick={() => window.location.href=`/rateinstructor/individualTrainee?courseId=${course._id}`}>
            Rate Instructor
          </MenuItem>
          <MenuItem   onClick={() => window.location.href=`/viewaddreviews/individualtrainee?courseId=${course._id}&individualTraineeId=${userID}`}>
            Course Reviews
          </MenuItem>
          <MenuItem   onClick={() => window.location.href=`/myreviews/individualTrainee?&individualTraineeId=${userID}`}>
            My Reviews
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            Request Refund
          </MenuItem>
      </Menu>
    </div>
    <div float='left'>
        <Dialog open={open1} onClose={handleCloseD}>
          <DialogTitle>Refund Request</DialogTitle>
          <DialogContent>
           {progress>=50 ? <p> Refund is only availbe if your course progress is less than 50%. </p> : <><p> Refund request sent successfully! </p> <br/> <p>It will take 1-2 days to be proccessed.</p></> }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseD}>OK</Button>
          </DialogActions>
        </Dialog>
    </div>
      </div>
    )
}
  
export default ViewCoursesBytitlesHrsRatePrice;