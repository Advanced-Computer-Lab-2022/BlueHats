import React, { useState, useEffect } from "react";
import axios from 'axios';

// components
import CoursePreview from "../components/CoursePreview"

const Preview = () => {
  const [course,setCourse] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  console.log(id);

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
        console.log(course)
        setCourse(course)
      }
    )
  },[id])

  return (
      <div className="chosen-course">
       { !loading && <CoursePreview course={course} key={id} />}
      </div>
  )
}

export default Preview