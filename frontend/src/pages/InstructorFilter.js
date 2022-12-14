import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import IFilterBar from "../components/IFilterBar";
import axios from "axios";
import CourseDetails from "../components/CourseDetails";
import { Link } from "react-router-dom";

function InstructorFilter() {
  const params = new URLSearchParams(window.location.search);
  const target1 = params.get("key");
  const target2 = params.get("target");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:4000/filterBy/${target2}/${target1}`,
    }).then((res) => {
      const courses = res.data;
      console.log(courses);
      setCourses(courses);
    });
  }, [target2, target1]);

  return (
    <div className="courses">
      <IFilterBar />
      <h3>
        {" "}
        Filter Results: {""} {""}
        <Link to="/instructor">
          <IconButton edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>{" "}
        </Link>
      </h3>

      {courses.length === 0 ? (
        <h1>No courses for this {target2}</h1>
      ) : (
        courses.map((course) => {
          return <CourseDetails course={course} key={course._id} />;
        })
      )}
    </div>
  );
}

export default InstructorFilter;
