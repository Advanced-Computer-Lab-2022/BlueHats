import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Loader from '../components/Loader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const CourseMenu = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const userID = loggedinUser.id;
    const data={id:userID}
  
    const [loading,setLoading] = useState(true);
    const [courses,setCourses] = useState();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/corporateTrainee/getCourses/${userID}`
          }).then((res) => {
            setTimeout(()=>{
                setLoading(false)
              }, 1000)
            const temp = res.data
            console.log(temp);
            setCourses(temp);
          })
    },[])
   return(
    <>
    {loading && <Loader/>}
    <FormLabel id="demo-radio-buttons-group-label">Specify the course with which you faced the problem.</FormLabel>
      <div className="courses">
    {!loading && courses.length!=0 && (courses.map(crs => 
     <div crs={crs} key={crs.id}>
     <FormControl>
   
   <RadioGroup
     aria-labelledby="demo-radio-buttons-group-label"
     defaultValue=""
     name="radio-buttons-group"
   >
     <FormControlLabel value={crs.title} control={<Radio />} label={crs.title}/>
    
   </RadioGroup>
 </FormControl>
 </div>

))}

</div>
        </>
   );

}

export default CourseMenu; 