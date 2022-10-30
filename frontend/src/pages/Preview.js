// import { useContext, useEffect, useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
// import { useParams } from 'react-router-dom'

// components
import CoursePreview from "../components/CoursePreview"

const Preview = () => {
  // const params = useParams();
  const { courses } = useCoursesContext()

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //       const response = await fetch('/api/courses/' + params, {
  //           method: 'GET'
  //         })
  //         const json = await response.json();
      
  //         if(response.ok) {
  //           dispatch({type: 'GET_COURSE', payload: json});
  //         }
  //   }
      
  //   fetchCourses()
  // }, [params, dispatch])

  return (
      <div className="chosen-course">
        {courses && courses.map(course => (
          <CoursePreview course={course} key={course._id} />
        ))}
      </div>
  )
}

export default Preview