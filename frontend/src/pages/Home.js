import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ViewCoursesBytitlesHrsRatePrice from "../components/CoursesTitlesHrsRatePrice";
import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import HFilterBar from "../components/HFilterBar";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={require('../images/img1.jpg')} onDragStart={handleDragStart} role="presentation" />,
  <img src={require('../images/img2.jpg')}  onDragStart={handleDragStart} role="presentation" />,
  <img src={require('../images/img1.jpg')}  onDragStart={handleDragStart} role="presentation" />,
];

const Home = () => {
  const { courses, dispatch } = useCoursesContext();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COURSES", payload: json });
      }
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <form>
      <div className="home">
        <div className="courses">
        {/* <AliceCarousel 
        items={items}
        autoPlayInterval={5000}
        autoPlayDirection="ltr"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableAutoPlayOnAction={true}
        /> */}
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
  );
};
export default Home;
