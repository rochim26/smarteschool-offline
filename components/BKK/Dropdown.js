import React from "react";

const Dropdown = ({ judul, children }) => {
  return (
    <li className="nav-item dropdown active">
      <a
        className="nav-link font-weight-bold"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {judul}
      </a>
      <div className="dropdown-menu py-0" aria-labelledby="navbarDropdown">
        {children}
      </div>
    </li>
  );
};

export default Dropdown;
