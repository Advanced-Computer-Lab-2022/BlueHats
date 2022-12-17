import React from "react";
import { useState } from "react";
import axios from "axios";

function HFilterBar() {

  const [subjects,setSubjects] = useState([]) 

  const handleSubject = (subject) => {
    window.location.href = `/Hfilter?target=subject&key=${subject}`;
  };
  const handlePrice = (price) => {
    window.location.href = `/Hfilter?target=price&key=${price}`;
  };

  const getSubjects = () => {
    axios({
      method: "GET",
      url: `http://localhost:4000/filterBy/subjects`,
    }).then((res) => {
      const subjects = res.data;
      setSubjects(subjects.subject);
      console.log(subjects)
    });
  }
  console.log(subjects)

  return (
    <div>
      <h3>Filter By:</h3>
      <div className="row">
        <div className="col-md-3 border - right">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-top p-3">
            <div className="dropdown">
              <button className="dropbtn">Subject</button>
              <div id="myDropdown" className="dropdown-content">
                
                
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
        </div>
      </div>
    </div>
  );
}

export default HFilterBar;
