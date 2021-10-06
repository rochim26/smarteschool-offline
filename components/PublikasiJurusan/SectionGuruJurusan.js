import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteGuruJurusan,
  getGuruJurusan,
} from "../../client/GuruJurusanClient";
import ModalTambahGuruJurusan from "./ModalTambahGuruJurusan";

const SectionGuruJurusan = ({
  mJurusanId,
  listGuru,
  listGuruJurusan,
  getDetailJurusan,
}) => {
  const [editData, setEditData] = useState(null);

  const handleDeleteGuruJurusanData = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteGuruJurusan(id);
        if (data) {
          toast.success(data?.message);
          getDetailJurusan({
            jurusanId: mJurusanId,
          });
        }
      }
    });
  };

  const onClickEdit = (data) => {
    setEditData({
      id: data.id,
      foto: data.foto,
      jabatan: data.jabatan,
      mJurusanId: data.mJurusanId,
      mUserId: data.mUserId,
    });
  };

  return (
    <>
      <div
        className="card-body px-0 pt-4 pb-0 mb-5"
        data-joyride="guru-jurusan"
      >
        <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column mb-5 mx-4">
          <h4 className="fw-extrabold color-dark title-border mb-0">
            Guru Jurusan
          </h4>
          <button
            type="button"
            className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#modalGuruJurusan"
            onClick={() => setEditData(null)}
            data-joyride="btn-tambah-guru-jurusan"
          >
            <FaPlus className="me-2" />
            Tambah Guru
          </button>
        </div>
        <div className="table-responsive mb-5">
          <table className="table-ss" data-joyride="table-guru-jurusan">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listGuruJurusan?.map((guruJurusan, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={guruJurusan.foto}
                      alt="test"
                      className="img-fit rounded-circle pointer"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{guruJurusan?.user?.nama}</td>
                  <td>{guruJurusan?.jabatan}</td>
                  <td>
                    <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#modalGuruJurusan"
                        className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-lg-2 mb-2 pointer"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => onClickEdit(guruJurusan)}
                        data-joyride="edit-guru-jurusan"
                      >
                        <FaPen className="color-secondary" />
                      </div>
                      <div
                        className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between"
                        onClick={() =>
                          handleDeleteGuruJurusanData(guruJurusan?.id)
                        }
                      >
                        <div
                          className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                          data-joyride="delete-guru-jurusan"
                        >
                          <FaTrashAlt className="color-secondary" />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>

      <ModalTambahGuruJurusan
        mJurusanId={mJurusanId}
        listGuru={listGuru}
        getDetailJurusan={getDetailJurusan}
        editData={editData}
      />
    </>
  );
};

export default SectionGuruJurusan;
