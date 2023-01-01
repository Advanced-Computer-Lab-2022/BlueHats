import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Link } from "react-router-dom";
import IFilterBar from "../components/IFilterBar";
// import { acceptedX } from '../components/ContractForm';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import axios from "axios";

// components
import CourseDetails from "../components/CourseDetails";
import Loader from "../components/Loader";

const Instructor = () => {
  const [accepted, setAccepted] = useState([]);
  const [valid, setValid] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  var loggedinUser = JSON.parse(localStorage.getItem("user"));
  const instID = loggedinUser.id;

  const acceptedFunc = async () => {
    const promise = await axios
      .get(`http://localhost:4000/api/instructor/getAccepted/${instID}`)
      .then((response) => {
        const state = response.data;
        setValid(state);
      });

    return valid;
  };
  useEffect(() => {
      const data = { id: instID };
      setLoading(true);
      axios({
        method: "PUT",
        url: `api/instructor/myCourses`,
        data: data,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
  
        const courses = res.data;
        setCourses(courses);
      });
    
    acceptedFunc();
  }, [instID]);

  const navigate = useNavigate();
  const navigateAddCourse = () => {
    navigate("/instructor/addCourse");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {loading && <Loader />}
      <div className="instructor">
        <div className="courses">
          <Link to="/contract" state={accepted}>
            Contract
          </Link>
          <h3>My Courses</h3>
          <IFilterBar />

          {!loading &&
            courses &&
            courses.map((course) => (
              <CourseDetails course={course} key={course._id} />
            ))}
        </div>
        <div className="add-course-button">
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {valid === true && (
              <AddCircleIcon
                fontSize="large"
                sx={{ color: "#a256e0", cursor: "pointer" }}
                onClick={navigateAddCourse}
              />
            )}
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Add Course</Typography>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Instructor;
