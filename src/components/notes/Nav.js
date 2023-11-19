import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
  
    window.location.reload();
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Noted! <AssignmentTurnedInIcon /></Link>
        </h1>
      </div>
      <ul>
        <li>
          {/* Add onClick handler to handle HomeIcon click */}
          <Link to="/" onClick={handleHomeClick}>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="/create">
            <AddIcon />
          </Link>
        </li>
        <li onClick={logoutSubmit}>
          <Link to="/">
            <ExitToAppIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
