import React from "react";

const Badge = ({ badgeColorClass, children, circle, className, style }) => {
  return (
    <div className={`shared-badge ${className || ""}`} style={style}>
      <span className={`
        badge
        ${badgeColorClass || "bg-primary"}
        ${circle ? "rounded-circle" : ""}
      `}>
        {children}
      </span>
    </div>
  );
};

export default Badge;
