import React, { useState, useEffect } from "react";
import axios from 'axios';

// components
import CourseFullView from "../components/CourseFV2"

function CourseView () {
  const [course,setCourse] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `/api/courses/${id}`
    }).then(
      (res) => {
        setLoading(false)
        const course = res.data
        setCourse(course)
      }
    )
  },[id])

  return (
      <div className="chosen-course">
        {!loading &&  <CourseFullView course={course} key={id} />}
      </div>
  )
}

export default CourseView