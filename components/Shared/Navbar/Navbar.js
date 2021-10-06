import Link from "next/link";
import React from "react";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = ({
  nav,
  action,
  onClick,
  isNavDropdown = false,
  handleChangeDropdown,
  defaultDropdownValue,
}) => {
  const navData = nav?.filter((navItem) => navItem);

  return (
    <div className="card card-ss mb-4">
      <ul className="nav d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
        <div className="d-flex flex-column flex-lg-row">
          {isNavDropdown && (
            <div className="nav-link nav-link-ss py-md-4 py-3 mx-4 fw-bold color-secondary">
              <Dropdown
                listValue={nav}
                defaultValue={defaultDropdownValue}
                onChange={handleChangeDropdown}
              />
            </div>
          )}
          {!isNavDropdown &&
            navData?.length > 0 && navData?.map((nav, idx) => {
              return (
                <Link key={idx} href={nav.url}
                {...(nav.as && { as: nav.as })}>
                  <a
                    className={`nav-link nav-link-ss py-md-4 py-3 mx-4 fw-bold color-secondary ${
                      nav.active ? "active" : ""
                    }`}
                    onClick={nav.onClick}
                    data-joyride={nav?.dataJoyride || ""}
                  >
                    {nav.text}
                  </a>
                </Link>
              );
            })}
        </div>
        <div className="my-3 my-lg-0 px-3 px-lg-0 me-lg-3 d-flex flex-column flex-lg-row ">
          {action?.map((action) => {
            return action.button;
          })}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
