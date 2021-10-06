import { useState } from "react";
import { FaDotCircle, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";

const CardBab = ({ children, containerClass, menuItem }) => {

  const [onHover, setOnHover] = useState(false);

  return (
    <div className={`bg-white rounded-ss px-3 py-4 shadow-dark-ss position-relative ${containerClass ? containerClass : ""}`} style={{ minHeight: 130 }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>

      {/* IMG ON BOTTOM RIGHT */}
      <img
        src="/img/bg-card-peraturan.png"
        className="position-absolute"
        style={{ bottom: 0, right: 0, pointerEvents: "none"}}
      />

      {children}
    </div>
  )
}

export default CardBab;