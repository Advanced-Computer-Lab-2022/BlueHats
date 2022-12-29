import {React, useState , useEffect} from "react"
import axios from 'axios';
import ViewCoursesBytitlesHrsRatePrice from '../components/CoursesTitlesHrsRatePrice'

import Loader from "../components/Loader"


function Search () { 
  
  const params = new URLSearchParams(window.location.search);
  const title = params.get('key');
    const [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>  {
      setLoading(true)
      
      if(title==''){
        return
      }
         axios({
          method: "GET",
          url : `/api/courses/search/${title}`
        }).then(
       (res) => { 
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
          const courses = res.data
          console.log(courses)
          setCourses(courses)  
       }
        );    

      
   },[title])
   
    return(
      <>
      {loading && <Loader/>}
      <div className="courses">
      {courses.length==0? <h1>This Course Doesn't Exist.</h1> : <h3>Search Results:</h3> } 
        {!loading && courses.length!=0 && (courses.map(course => {
          return <ViewCoursesBytitlesHrsRatePrice course={course} key={course._id} />
        }))}
        
      </div>  
      </>

    );


}

export default Search; 
