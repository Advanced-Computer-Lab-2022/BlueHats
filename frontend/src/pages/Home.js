import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ViewCoursesBytitlesHrsRatePrice from "../components/CoursesTitlesHrsRatePrice";
import { useEffect, useState } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import HFilterBar from "../components/HFilterBar";
import Loader from "../components/Loader"

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={require('../images/img1.jpg')} onDragStart={handleDragStart} role="presentation" alt="homeIMG" />,
  <img src={require('../images/img2.jpg')}  onDragStart={handleDragStart} role="presentation" alt="homeIMG" />,
  <img src={require('../images/img1.jpg')}  onDragStart={handleDragStart} role="presentation" alt="homeIMG"/>,
];

const Home = () => {
  const { courses, dispatch } = useCoursesContext();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
        dispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <>
    {loading && <Loader/>}
    <form>
      <div className="home">
        <div className="courses">
          <div  className='alice'>
          <AliceCarousel 
            sx={{width: 1000,marginLeft:15}}
            items={items}
            autoPlayInterval={5000}
            autoPlayDirection="ltr"
            autoPlay={true}
            fadeOutAnimation={true}
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
            disableButtonsControls={true}
          />
        </div>
          <HFilterBar />
          <h3>All Courses</h3>
          {courses &&
            courses.map((course) => (
              <ViewCoursesBytitlesHrsRatePrice
                course={course}
                key={course._id}
              />
            ))}
        </div>
      </div>
    </form>
    </>
  );
};
export default Home;
