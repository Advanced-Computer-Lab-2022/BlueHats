import React, { useState, useEffect } from "react";
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import { Link } from 'react-router-dom'
import Axios from "axios";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ViewCoursesBytitlesHrsRatePrice = ({ course }) => { 

  function CheckNumber() {
    if (course.totalhours>1) {
      return 'hours';
    }
    if (course.totalhours===1) {
      return 'hour';
    }
  }

    const [currency, setCurrency] = useState('EGP');
    const [toCurrency, setToCurrency] = useState('EGP');

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
         <Link onClick={() => window.location.href=`/course/preview?id=${course._id}`}>  <h4>{course.title}</h4> </Link> 
        <p><strong>Total Hours: </strong>{result} <CheckNumber/> </p>
        <p><strong>Rating: </strong>{course.courseRating}</p>
        {/* <p><strong>Enrolled: </strong>{course.enrolled}</p> */}
        <div  className="course-details-price">
        <p><strong>Price: </strong> {currency} {output}</p>
        </div>
        <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
      </div>
    )
}
  
export default ViewCoursesBytitlesHrsRatePrice;