import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import HFilterBar from "../components/HFilterBar";
import axios from "axios";
import ViewCoursesBytitlesHrsRatePrice from "../components/CoursesTitlesHrsRatePrice";
import { Link } from "react-router-dom";

function HomeFilter() {
  const params = new URLSearchParams(window.location.search);
  const target1 = params.get("key");
  const target2 = params.get("target");
  // if (target2 === null) {
  //   target2 = "";
  // }
  const [courses, setCourses] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(false);
    axios({
      method: "GET",
      url: `http://localhost:4000/filterBy/${target2}/${target1}`,
    }).then((res) => {
      const courses = res.data;
      setCourses(courses);
      if (courses !== []) {
        setFlag(true);
      }
    });
  }, [target2, target1]);

  return (
    <div className="home">
      <div className="course">
        <HFilterBar />
        <h3>
          {" "}
          Filter Results: {""} {""}
          <Link to="/">
            <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>{" "}
          </Link>
        </h3>
        {flag === true && courses.length === 0 ? (
          <h1>No courses for this {target2}</h1>
        ) : (
          courses.map((course) => {
            return (
              <ViewCoursesBytitlesHrsRatePrice
                course={course}
                key={course._id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeFilter;
