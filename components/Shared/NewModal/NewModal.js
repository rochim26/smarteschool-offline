import React from "react";
import { FaLink, FaPaperclip, FaPaperPlane, FaTrashAlt } from "react-icons/fa";
import { hideModal } from "../../../utilities/ModalUtils";

const NewModal = ({
  button,
  title,
  content,
  submitButton,
  modalId = "exampleModal",
  modalSize = "lg",
  removeFooter = false,
  isModalDetail = false,
  modalDetailKategori = false,
  isSurel = false,
  _postSurel,
  onCloseModal
}) => {

  const onClickClose = () => {
    hideModal(modalId);
    onCloseModal && onCloseModal();
  }

  return (
    <>
      {/* Button */}
      {button && button}
      {/* NewModal */}
      <div
        className={`modal modal-ss ${isModalDetail && "modal-detail"} ${
          modalDetailKategori && "modal-detail-kategori"
        } fade`}
        id={`${modalId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div
          className={`modal-dialog modal-${modalSize} modal-dialog-centered ${
            !isModalDetail && "modal-dialog-scrollable"
          }`}
        >
          {isSurel ? (
            <div className="modal-content">
              <div className="modal-header">
                <div
                  className="modal-title fw-extrabold"
                  id="exampleModalLabel"
                >
                  {title}
                </div>
                <button
                  onClick={onClickClose}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{content}</div>
              {!removeFooter && (
                <div className="modal-footer d-flex justify-content-between">
                  <div className="d-flex">
                    <div
                      style={{
                        width: "39px",
                        height: "39px",
                      }}
                      className="rounded-circle bg-white me-4 d-flex justify-content-center align-items-center"
                    >
                      <FaPaperclip className="fs-5" color="#2680EB" />
                    </div>
                    <div
                      style={{
                        width: "39px",
                        height: "39px",
                      }}
                      className="rounded-circle bg-white me-4 d-flex justify-content-center align-items-center"
                    >
                      <FaLink className="fs-5" color="#2680EB" />
                    </div>
                    <div
                      style={{
                        width: "39px",
                        height: "39px",
                      }}
                      className="rounded-circle bg-white me-4 d-flex justify-content-center align-items-center"
                    >
                      <FaTrashAlt className="fs-5" color="#2680EB" />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary me-3 mt-1"
                      data-bs-dismiss="modal"
                    >
                      Draft
                    </button>
                    <button
                      className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold "
                      onClick={() => _postSurel()}
                    >
                      Kirim
                      <FaPaperPlane className="ms-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="modal-content">
              <div className="modal-header">
                <div
                  className="modal-title fw-extrabold"
                  id="exampleModalLabel"
                >
                  {title}
                </div>
                <button
                  onClick={onClickClose}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{content}</div>
              {!removeFooter && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary me-3 mt-1"
                    data-bs-dismiss="modal"
                    onClick={onClickClose}
                  >
                    Batal
                  </button>
                  {submitButton}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewModal;
