const CardDataSiswa = ({ children, imageRight, header, noPadding=false, minHeightHeader=59 }) => {
  return (
    <div className="bg-white shadow-dark-ss rounded-ss overflow-hidden position-relative">

      { header ? (
        <div className="bg-soft-primary py-3 px-4 d-flex align-items-center overflow-hidden position-relative" style={{ minHeight: minHeightHeader }}>
          <div className="bg-primary me-3" style={{ width: 5, height: 27 }} />
          <h6 className="fw-bold color-dark mb-0">{header}</h6>
          <img src={imageRight} className="position-absolute" style={{ top: 0, right: 0 }} />
        </div>
      ) : (
        <img src={imageRight} className="position-absolute" style={{ top: 0, right: 0 }} />
      )}

      <div className={`${noPadding ? "" : "py-4 px-4"}`}>
        {children}
      </div>
    </div>
  )
}

export default CardDataSiswa;