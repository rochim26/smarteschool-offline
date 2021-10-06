import React from "react";

const Tabs = ({ navItems, className }) => {
  return (
    <>
      <ul
        className={`nav nav-tabs nav-tabs-ss ${className ? className : ""}`}
        id="myTab"
        role="tablist"
      >
        {navItems.map(({ id, active, nav, dataJoyride }) => (
          <li
            className="nav-item fw-bold"
            role="presentation"
            key={id}
            data-joyride={dataJoyride}
          >
            <a
              className={active ? "nav-link active" : "nav-link"}
              id={`${id}-tab`}
              data-bs-toggle="tab"
              href={`#${id}`}
              role="tab"
              aria-controls={id}
              aria-selected="true"
              onClick={() =>
                navItems.map((d) => {
                  if (id == d.id) {
                    d.active = true;
                  } else {
                    d.active = false;
                  }
                })
              }
              data-joyride={navItems?.dataJoyride || ""}
            >
              {nav}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="myTabContent">
        {navItems.map(({ id, active, nav, content }) => (
          <div
            key={id}
            className={active ? "tab-pane fade show active" : "tab-pane fade"}
            id={id}
            role="tabpanel"
            aria-labelledby={`${id}-tab`}
          >
            {content}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
