

const LabelStatus = ({ children, status }) => {

  const statusClass = () => {
    if (status === "warning") {
      return "bg-soft-warning color-warning"
    } else if (status === "info") {
      return "bg-light-primary color-primary"
    } else if (status === "soft-danger") {
      return "bg-soft-danger color-danger"
    } else if (status === "danger") {
      return "bg-danger text-white"
    } else {
      return "bg-soft-success color-success"
    }
  }

  return (
    <div className={`label-ss fs-12-ss text-center rounded-pill ${statusClass()}`} style={{ width: "min-content", whiteSpace: "nowrap" }}>
      {children}
    </div>
  )
}

export default LabelStatus;