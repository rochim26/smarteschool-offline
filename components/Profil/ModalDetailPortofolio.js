import React, { useState } from "react";
import { momentPackage } from "../../utilities/HelperUtils";
import NewModal from "../Shared/NewModal/NewModal";
import TautanCard from "../Shared/TautanCard/TautanCard";
import Lightbox from 'react-image-lightbox';

const ModalDetailPortofolio = ({ singlePortfolio }) => {

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const images = singlePortfolio?.dokumentasi?.length > 0 ? [ ...singlePortfolio?.dokumentasi ] : [];

  return (
    <>
      <NewModal
        modalId="modalDetailPortofolio"
        isModalDetail={true}
        removeFooter={true}
        title={
          <>
            <h4 className="mb-1 fw-extrabold color-dark">
              {singlePortfolio?.nama}
            </h4>
            <span className="fs-6 color-primary fw-bold">
              {singlePortfolio?.bidang}
            </span>
          </>
        }
        content={
          <>
            <div className="row mb-4">
              <div className="col-md-12 mb-4 pointer" onClick={() => setIsLightBoxOpen(true)}>
                <img
                  src={singlePortfolio?.dokumentasi?.[0]}
                  alt="img-portofolio"
                  className="img-fluid img-fit-cover rounded-ss"
                  height="366px"
                />
              </div>
              <div className="col-md-12">
                <p className="color-dark fw-semibold mb-2">
                  {singlePortfolio?.deskripsi}
                </p>
                <p className="fs-14-ss color-secondary fw-semibold mb-0">
                  {`${momentPackage(singlePortfolio?.dimulai).format("MMM YYYY")} - ${momentPackage(singlePortfolio?.berakhir).format("MMM YYYY")}`}
                </p>
              </div>
              { singlePortfolio?.lampiranSertifikat?.map(sertifikat => (
                <TautanCard withDeleteButton={false} withSmartschoolLabel={false} value={sertifikat} />
              ))}
            </div>
          </>
        }
      />
      { isLightBoxOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => { setIsLightBoxOpen(false), setPhotoIndex(0) }}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default ModalDetailPortofolio;
