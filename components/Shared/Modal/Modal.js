import React from "react";
import { hideModal } from "../../../utilities/ModalUtils";
import Button from "../Button/Button";

const Modal = ({ button, id, children, buttonState, modalTitle }) => {
  return (
    <>
      {button}

      <div
        className="modal modal-ss fade"
        id={id}
        tabIndex="-1"
        aria-labelledby={id}
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content modal-content-ss">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle || id}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => hideModal(id)}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-3"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <Button
                type="submit"
                className="btn btn-primary"
                variant="primary"
                buttonText="Simpan"
                state={buttonState}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
