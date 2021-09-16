import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            Admin Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/update-password" className="nav-link">
            Change Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/create-product" className="nav-link">
            Create product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-product" className="nav-link">
            Manage product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-category" className="nav-link">
            Manage category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-subcategory" className="nav-link">
            Manage sub-category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link">
            Coupons
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
