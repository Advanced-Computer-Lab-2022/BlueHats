import {React, useState , useEffect} from "react"
import axios from 'axios';
import ViewCoursesBytitlesHrsRatePrice from '../components/CoursesTitlesHrsRatePrice'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NoBackpackIcon from '@mui/icons-material/NoBackpack';

import Typography from '@mui/material/Typography';

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
      {courses.length==0?  
          <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper'}}>
          <Card sx={{ maxWidth: 360, minHeight: 200, position: 'absolute', left: '40%', top: '40%', }}>
          <CardContent>
              <NoBackpackIcon fontSize="large"/>
          <Typography gutterBottom variant="h5" component="div" align='center'>
              Search Results
          </Typography>
          <Typography variant="body2" color="text.secondary" align='center'>
              This Course Doesn't Exist.
          </Typography>
          </CardContent>
          <CardActions>
              <Button size="medium" color='secondary' onClick={() => window.location.href = `/`}>Check Out Available Courses</Button>
          </CardActions>
          </Card>
          </Box>
            : <h3>Search Results:</h3> } 
        {!loading && courses.length!=0 && (courses.map(course => {
          return <ViewCoursesBytitlesHrsRatePrice course={course} key={course._id} />
        }))}
        
      </div>  
      </>

    );


}

export default Search; 
