import React, { useState, useEffect } from "react";
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import YoutubeEmbed from "./YoutubeEmbed";
import { useAuthContext } from '../hooks/useAuthContext'
import Axios from "axios";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CoursePreview = ({course}) => {

    const { user } = useAuthContext();

    function CheckNumber() {
        if(result>1) {
          return 'hours';
        }
        if(result===1) {
          return 'hour';
        }
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

      const mylink = (course.previewLink);
      const myembed = mylink.split('=');
      const myembedID = myembed[1];

    return (
        <div className="course-preview">
          <div>
            <h1>{course.title.toUpperCase()}</h1>
            <p><strong></strong>{course.summary}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <p><strong>Price: </strong> {currency} {output}</p>
            { user &&  <button onClick={() => window.location.href=`/payment?id=${course._id}`}>Enroll Now</button>}
            { !user &&  <button onClick={() => window.location.href=`/login`}>Enroll Now</button>}
            <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
            <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <h4>Course Content</h4>
            <ol>{(course.subtitle).map((mycourse)=> <li mycourse={mycourse} key={course._id}>  {mycourse.name} is {mycourse.hours} hours </li>)}</ol>
          </div>
          <div className="course-preview-video"> <YoutubeEmbed embedId={myembedID} /></div>
        </div>
        
    )
}
export default CoursePreview