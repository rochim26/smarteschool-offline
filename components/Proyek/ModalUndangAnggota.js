import React from "react";
import { FaTimes } from "react-icons/fa";
import ReactiveButton from "reactive-button";
import Avatar from "../Shared/Avatar/Avatar";
import NewModal from "../Shared/NewModal/NewModal";

const ModalUndangAnggota = ({ formData, setFormData }) => {
  const handleClickUndo = (data) => {
    const filtered = formData.userId.filter((d) => d.id != data.id);

    setFormData({
      ...formData,
      userId: [...filtered],
    });
  };

  return (
    <div>
      <NewModal
        modalId="modalPartnerDiundang"
        removeFooter
        title={
          <>
            <h4 className="mb-0 fw-extrabold">
              {formData.userId?.length} Diundang
            </h4>
          </>
        }
        content={
          <>
            <ul className="list-group list-group-flush">
              {formData.userId?.map((d, idx) => {
                return (
                  <li className="list-group-item py-3" key={idx}>
                    <div className="d-flex justify-content-between flex-sm-row flex-column align-items-center">
                      <div className="d-flex align-items-sm-center">
                        <Avatar name="Jack Sparrow" size={50} />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold color-dark fw-extrabold">
                            {d?.nama}
                          </h6>
                          <span className="fs-12-ss fw-bold">
                            {d?.sekolah?.nama}
                          </span>
                        </div>
                      </div>
                      <FaTimes
                        className="pointer"
                        onClick={() => handleClickUndo(d)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"buttonState"}
            color={"primary"}
            idleText={"Tandai Sudah Dibaca"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            //   onClick={() =>
            //     handlePutMateriKesimpulan(
            //       kesimpulanData?.kesimpulan?.[0].id
            //     )
            //   }
          />
        }
      />
    </div>
  );
};

export default ModalUndangAnggota;
