import React from "react";
import { useState } from "react";

function HFilterBar() {
  const [subjects, setSubjects] = useState([]);

  const handleSubject = (subject) => {
    window.location.href = `/Hfilter?target=subject&key=${subject}`;
  };
  const handlePrice = (price) => {
    window.location.href = `/Hfilter?target=price&key=${price}`;
  };
  const handleRating = (rate) => {
    window.location.href = `/Hfilter?target=rate&key=${rate}`;
  };
  const handleSort = (sortTarget) => {
    window.location.href = `/Hfilter?target=${sortTarget}&key=`;
  };

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
                  className="hoveranchor"
                  onClick={() => {
                    handleSubject("math");
                  }}
                >
                  Maths
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleSubject("Management");
                  }}
                >
                  Management
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Ratings</button>
              <div id="myDropdown" className="dropdown-content">
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleRating("3");
                  }}
                >
                  3 & up
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleRating("3.5");
                  }}
                >
                  3.5 & up
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleRating("4");
                  }}
                >
                  4 & up
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleRating("4.5");
                  }}
                >
                  4.5 & up
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Price</button>
              <div id="myDropdown" className="dropdown-content">
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handlePrice("50");
                  }}
                >
                  50$
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handlePrice("200");
                  }}
                >
                  200$
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handlePrice("500");
                  }}
                >
                  500$
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handlePrice("0");
                  }}
                >
                  Free
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Sort By</button>
              <div id="myDropdown" className="dropdown-content">
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleSort("popularity");
                  }}
                >
                  Most Popular
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleSort("priceAsc");
                  }}
                >
                  Price Ascendingly
                </a>
                <a
                  className="hoveranchor"
                  onClick={() => {
                    handleSort("priceDesc");
                  }}
                >
                  Price Descendingly
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
