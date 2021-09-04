import React from "react";

const Nav = () => {
  return (
    <div className="nav-container">
      <a href="/" className="nav-left">
        <i className="fab fa-youtube fa-3x"></i>
        <h1>Metube</h1>
      </a>
      <div className="nav-center">
        <div className="search">
          <form>
            <input className="nav-input" type="text" placeholder="Search.." />
            <button className="nav-search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="nav-right">Login</div>
    </div>
  );
};

export default Nav;
