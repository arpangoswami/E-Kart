import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/update-password" className="nav-link">
            Change Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
