import {React, useState , useEffect} from "react"
import axios from 'axios';
import ViewCoursesBytitlesHrsRatePrice from '../components/CoursesTitlesHrsRatePrice'


function Search () { 
  
  const params = new URLSearchParams(window.location.search);
  const title = params.get('key');
    const [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(true);
    const [flag,setFlag] = useState(false);

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
        setLoading(false)
          const courses = res.data
          console.log(courses)
          setCourses(courses)  
          if(courses!=[])
            {
              console.log(courses)
              setFlag(true)
            }
          else if (courses==[])
            setFlag(false)
       }
        );    

      
   },[title])
   
   //console.log(flag)
    return(
      <div className="courses">
      {flag==false? <h1>This Course Doesn't Exist.</h1> : <h3>Search Results:</h3> } 
        {!loading && flag==true && courses.length!=0 && (courses.map(course => {
          return <ViewCoursesBytitlesHrsRatePrice course={course} key={course._id} />
        }))}
        
      </div>  

    );


}

export default Search; 
