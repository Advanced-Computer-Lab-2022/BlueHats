import { useState } from "react";
import axios from "axios";
import "react-dropdown/style.css";
import ViewCoursesBytitlesHrsRatePrice from './CoursesTitlesHrsRatePrice';

const HomeFilters = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const handleSubject = async (subject) => {
    await axios
      .get(`http://localhost:4000/filterBy/subject?subject=${subject}`)
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
      });
  };
  const getSubjects = async () => {
    await axios.get(`http://localhost:4000/api/courses`).then((res) => {
      const courses = res.data;
      for (var i = 0; i < courses.length; i++) {
        setSubjects(courses[i].subject);
      }
      console.log(subjects);
    });
  };
  const handlePrice = async (price) => {
    await axios
      .get(`http://localhost:4000/filterBy/price?price=${price}`)
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
      });
  };

  return (
    <div className="row">
      <div className="col-md-3 border - right">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-top p-3">
          <div className="dropdown">
            <button className="dropbtn">Subject</button>
            <div id="myDropdown" className="dropdown-content">
              {/* <a
                onClick={() => {
                  handleSubject("AllSubjects");
                }}
              >
                All Subjects
              </a> */}
              <a
                className="hoveranchor"
                onClick={() => {
                  handleSubject("cs");
                }}
              >
                CS
              </a>
              <a
                onClick={() => {
                  handleSubject("math");
                }}
              >
                Maths
              </a>
              <a
                onClick={() => {
                  handleSubject("Management");
                }}
              >
                Management
              </a>
            </div>
          </div>
          <br></br>
          <div className="dropdown">
            <button className="dropbtn">Price</button>
            <div id="myDropdown" className="dropdown-content">
              <a
                onClick={() => {
                  handlePrice("50");
                }}
              >
                50$
              </a>
              <a
                onClick={() => {
                  handlePrice("200");
                }}
              >
                200$
              </a>
              <a
                onClick={() => {
                  handlePrice("500");
                }}
              >
                500$
              </a>
              <a
                onClick={() => {
                  handlePrice("0");
                }}
              >
                Free
              </a>
            </div>
          </div>
        </nav>
        <h3>Filter Results:</h3>
      </div>
      {courses.length != 0 &&
        courses.map((course) => {
          return (
            <div>
              <ViewCoursesBytitlesHrsRatePrice course={course} key={course.id} />
            </div>
          );
        })}
    </div>
  );
};

export default HomeFilters;
