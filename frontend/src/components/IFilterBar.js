import React from "react";

function IFilterBar() {
  const handleSubject = (subject) => {
    window.location.href = `/Ifilter?target=subject&key=${subject}`;
  };
  const handlePrice = (price) => {
    window.location.href = `/Ifilter?target=price&key=${price}`;
  };
  const handleSort = (sortTarget) => {
    window.location.href = `/Ifilter?target=${sortTarget}&key=`;
  };

  return (
    <div>
      <h3>Filter By:</h3>
      <div className="row filter-inst">
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
            <br></br>
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

export default IFilterBar;
