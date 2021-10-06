import { FaFile, FaLink, FaTrashAlt } from "react-icons/fa"

const TautanCard = ({ type = "file", onClickDelete, value, withDeleteButton = true, withSmartschoolLabel = true, iconLeft, label, noMargin=false, wrapperClass }) => {
  return (
    <div className={`${noMargin ? "" : "mt-3"} ${wrapperClass ? wrapperClass : ""}`}>
      <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3 bg-soft-primary">
        <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
          <div className="d-flex align-items-center flex-wrap">
            <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
              { iconLeft ? iconLeft : type === "file" ? <FaFile className="text-white fs-3" /> : <FaLink className="text-white fs-3" />}
            </div>
            <div className="p-2">
              { (withSmartschoolLabel || label) && <a href={label} target="__blank" className="fw-bold color-dark mb-0">{label || "Smartschool"}</a>}
              { value && (
                <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                  {value}
                </span>
              )}
            </div>
          </div>
          { withDeleteButton && (
            <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0" onClick={() => onClickDelete(value)}>
              <FaTrashAlt />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TautanCard