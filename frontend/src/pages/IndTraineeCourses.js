import React from 'react';
import IndTraineeEnrolled from "../components/IndTraineeEnrolled";
import Card from '../components/NoCoursesCard';
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const userID = loggedinUser.id;

    const [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(true);
 

  useEffect(() => {
    setLoading(true);
    const data={userID: userID};
      axios({
        method: "PUT",
        url : `/api/indTrainee/getMyCourses`,
        data:data,
        headers:{'Content-Type':'application/json'}
      })
      .then( (res) => { 
        setLoading(false);
        const courses = res.data;
        console.log(courses);
        setCourses(courses); 
      });
  }, [userID]);

  return (
    <form>
      <div className="home">
        <div className="courses">
        {courses.length>0 &&    <h3>My Courses</h3>}
          {!loading && courses &&
            courses.map((course) => (
              <IndTraineeEnrolled
                course={course}
                key={course._id}
              />
            ))}
            {courses.length==0 && <Card/>}
        </div>
      </div>
    </form>
  );
};
export default Home;
