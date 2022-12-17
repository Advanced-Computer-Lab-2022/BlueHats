import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// import { ViewCurrency } from '../components/Navbar'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext();
  const [open, setOpen] = useState(false);
  const [promotionEditedStart, setPromotionStartEdited] = useState('')
  const [promotionEditedEnd, setPromotionEditedEnd] = useState('')
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    course.promotionEnd = promotionEditedEnd;
  };

  const handleCloseWithoutEditing = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_COURSE', payload: json});
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

  // const handleTheClick = async () => {
  //   const response = await fetch('/api/courses/' + course._id, {
  //     method: 'PUT'
  //   })
  //   const json = await response.json();

  //   if(response.ok) {
  //     dispatch({type: 'UPDATE_COURSE', payload: json});
  //   }
  // }

    function CheckNumber() {
      if(result>1) {
        return 'hours';
      }
      if(result===1) {
        return 'hour';
      }
    }
    function priceAfterDiscount(price,promotion){
      const priceAfter = price * (1-(promotion/100))
      return priceAfter;
    }

    function disableDates (){
        const today = new Date();
        const dd = today.getDate() ;
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        return yyyy+"-"+mm+"-"+dd; 
    }
    const handleDateChangeRaw = (e) => {
      e.preventDefault();
    }
    

    const currency = getParamByParam('countryName', countryValue, 'symbol');
    const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
  
    return (
      <div className="course-details">
        <Link to='/course/preview/' onClick={handleGetCourse}>  <h4>{course.title}</h4> </Link> 
        {/*to={`/course/preview/${course._id}`}*/}
        <p><strong>Subject: </strong>{course.subject}</p>
        <p><strong>Price: </strong> {currency} {priceAfterDiscount(course.price,course.promotion)}</p>
        <p><strong>Promotion: </strong> {course.promotion} % Valid Until {course.promotionEnd}</p> 
        <div float='left'>
          <Button variant="outlined" onClick={handleClickOpen}>
          Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit/Add a Promotion</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Discount Percentage"
                type="number"
                onChange={(e) => course.promotion = e.target.value} 
                variant="outlined"
              />
              <p>Promotion Start Date:</p>
              <input
                autoFocus
                margin="dense"
                id="startDate"
                value= {promotionEditedStart}
                type="date" 
                min = {disableDates()}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setPromotionStartEdited(e.target.value)} 
                variant="outlined"
              />
              <p>Promotion End Date:</p>
              <input
                autoFocus
                margin="dense"
                id="endDate"
                type="date"
                value= {promotionEditedEnd}
                min = {disableDates()}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setPromotionEditedEnd(e.target.value)} 
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseWithoutEditing}>Cancel</Button>
              <Button onClick={handleClose}>Done</Button>
            </DialogActions>
          </Dialog>
    </div>
        <p><strong>Price Before Discount: </strong> {currency} {course.price}</p>
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined first" onClick={handleClick}>delete</span>
        {/* <span className="material-symbols-outlined second" onClick={handleTheClick}>edit</span> */}
      </div>
    )
  }
  
  export default CourseDetails;
