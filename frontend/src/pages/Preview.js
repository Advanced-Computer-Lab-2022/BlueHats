import { useContext, useEffect, useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useParams } from 'react-router-dom'

// components
import CoursePreview from "../components/CoursePreview"

const Preview = () => {
  const { courses } = useCoursesContext();

  return (
      <div className="chosen-course">
        {courses && courses.map(course => (
          <CoursePreview course={course} key={course._id} />
        ))}
      </div>
  )
}

export default Preview