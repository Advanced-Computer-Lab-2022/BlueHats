import React, { useState, useEffect } from "react";
import { useCoursesContext } from '../hooks/useCoursesContext'
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import Axios from "axios";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext();

  const handleClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_COURSE', payload: json});
    }
  }

  // const handleGetCourse = async () => {
  //   const response = await fetch('/api/courses/' + course._id, {
  //     method: 'GET'
  //   })
  //   const json = await response.json();

  //   if(response.ok) {
  //     dispatch({type: 'GET_COURSE', payload: json});
  //   }
  // }

  const handleTheClick = async () => {
    const response = await fetch('/api/courses/' + course._id, {
      method: 'PUT'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'UPDATE_COURSE', payload: json});
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
    
    function priceAfter(price,promotion){
      const priceAfter = price * (1-(promotion/100))
      return priceAfter;
    }

    const [currency, setCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');

    //const currency = getParamByParam('countryName', countryValue, 'symbol');
    //const toCurrency = getParamByParam('countryName', countryValue, 'currency');
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
    setCurrency(getParamByParam('countryName', countryValue, 'symbol'));
    setToCurrency(getParamByParam('countryName', countryValue, 'currency'));
    set();
    }, [from, info]);

    // useEffect(() => {
    //   convert();
    //   setCurrency(getParamByParam('countryName', countryValue, 'symbol'));
    //   setToCurrency(getParamByParam('countryName', countryValue, 'currency'));
    //   set();
    // }, [info])

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
        <Link onClick={() => window.location.href=`/course/view?id=${course._id}`}>  <h4>{course.title}</h4> </Link> 
        <p><strong>Subject: </strong>{course.subject}</p>
        <p><strong>Price: </strong> {currency} {output}</p>
        <p><strong>Promotion: </strong> {course.promotion} % Valid Until {course.promotionDuration}</p>
        <p><strong>Price After Discount:[if applicable] </strong> {currency} {priceAfter(course.price,course.promotion)}</p>
        <p><strong>Summary: </strong>{course.summary}</p>
        <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined first" onClick={handleClick}>delete</span>
        <span className="material-symbols-outlined second" onClick={handleTheClick}>edit</span>
      </div>
    )
  }
  
  export default CourseDetails;