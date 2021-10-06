import { useState } from "react";
import useUser from "../../hooks/useUser";
import { postProfilUser } from "../../client/AuthClient";
import { toast } from "react-toastify";

const CardRapor = ({ isReadOnly = false }) => {
  return (
    <>
      <div className="col-md-3">
        {/* <Link href={linkRedirect + `${d?.id}`}> */}
        <div
          className={`card-buku-induk card-rapor card card-ss rounded-ss position-relative`}
        >
          <div className="card-body card-body-ss p-3">
            <h4 className="fw-black color-dark fw-black mb-2">X SIJA 1</h4>
            <p className="fs-14-ss fw-bold">Semester 1</p>
            <img
              src={`/img/label-buku-induk.svg`}
              className="position-absolute label-buku-induk"
              style={{ top: "-4px", right: "16px" }}
            />
          </div>
        </div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default CardRapor;
