import ViewCoursesBytitlesHrsRatePrice from "../components/CoursesTitlesHrsRatePrice";
import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import HFilterBar from "../components/HFilterBar";

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
