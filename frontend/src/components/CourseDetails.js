import React, { useState, useEffect } from "react";
import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";

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

    function CheckNumber() {
      if(result>1) {
        return 'hours';
      }
      if(result===1) {
        return 'hour';
      }
    }
    function priceAfterDiscount(price,promotion)
    {
      if(promotion != NaN)
      {
        const priceAfter = price * (1-(promotion/100))
        return priceAfter;
      }
     else 
     {
      return price;
     }
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
    

    const [currency, setCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');

    const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);


    // Initializing all the state variables
    const [info, setInfo] = useState([]);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("egp");
    const [output, setOutput] = useState(0);


    // Calling the api whenever the dependency changes
    useEffect(() => {
      Axios.get(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then((res) => {
      setInfo(res.data[from]);
      })
    convert();
    if(countryValue != undefined)
    {
      setCurrency(getParamByParam('countryName', countryValue, 'symbol'));
      setToCurrency(getParamByParam('countryName', countryValue, 'currency'));
    }
    set();
    }, [from, info]);

    function set() {
      if(toCurrency !== NaN)
        setTo((toCurrency.toLowerCase()));
    }
      
    function convert() {
      var rate = info[to];
      setOutput(Math.round(course.price * rate));
    }
  
    return (
      <div className="course-details">
        <Link>  <h4>{course.title}</h4> </Link> 
        <p><strong>Subject: </strong>{course.subject}</p>
        {course.promotion>0 && <p>Price: <span style={{textDecoration: 'line-through'}}>{currency} {output}</span><strong> {currency} {priceAfterDiscount(output,course.promotion)}</strong></p>}
        {course.promotion>0 && <p><strong>Promotion: </strong> {course.promotion} % &nbsp; Valid Until {course.promotionEnd}</p>  }
        <div float='left'>
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
        {course.promotion<=0 &&  <p><strong>Price: </strong> {currency} {output}</p>}
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined first" onClick={handleClick}>delete</span>
        <span className="material-symbols-outlined second" onClick={handleClickOpen}>edit</span>
      </div>
    )
  }
  
  export default CourseDetails;