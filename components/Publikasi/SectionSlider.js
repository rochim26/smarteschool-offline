import { useState, useEffect } from "react";
import { FaPen, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deleteSlider, getSlider } from "../../client/SliderClient";
import ModalTambahSlider from "./ModalTambahSlider";

const SectionSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const onClickEdit = (data) => {
    setEditId(data.id);
    setEditData({
      banner: data.banner,
      judul: data.judul,
      deskripsi: data.deskripsi,
    });
  };

  const setInitial = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDeleteSlider = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteSlider(id);
        if (data) {
          toast.success(data?.message);
          getSlidersData();
        } else {
          toast.error(error?.message);
        }
      }
    });
  };

  const getSlidersData = async () => {
    const { data } = await getSlider();
    if (data) {
      setSliders(data.slider);
    }
  };

  useEffect(() => {
    getSlidersData();
  }, []);

  return (
    <div data-joyride="section-slider">
      <div className="d-flex align-items-md-center justify-content-between mb-5 flex-md-row flex-column px-4">
        <h4 className="fw-extrabold color-dark title-border mb-md-0 mb-3">
          Section Slider
        </h4>
        <button
          type="button"
          className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#modalTambahSlider"
          onClick={setInitial}
          data-joyride="btn-tambah-slider"
        >
          <FaPlus className="me-2" />
          Tambah Slider
        </button>
      </div>
      <div className="table-responsive">
        <table className="table-ss" data-joyride="table-slider">
          <thead>
            <tr>
              <th>No</th> 
              <th>Foto Slider</th>
              <th>Judul</th>
              <th>Deskripsi </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sliders?.map((slider, idx) => (
              <tr>
                <td data-td="#">{idx + 1}</td>
                <td data-th="Foto Slider">
                  <img src={slider.banner} width="100px" />
                </td>
                <td data-th="Judul">{slider.judul}</td>
                <td data-th="Deskripsi">{slider.deskripsi}</td>
                <td data-th="Aksi" className="actions">
                  <div className="d-flex flex-lg-row flex-md-column flex-row">
                    <button
                      type="button"
                      className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-3 mb-lg-0 mb-md-3 mb-0"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#modalTambahSlider"
                      onClick={() => onClickEdit(slider)}
                      data-joyride="edit-slider"
                    >
                      <FaPen className="color-secondary" />
                    </button>
                    <button
                      className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => handleDeleteSlider(slider.id)}
                      data-joyride="delete-slider"
                    >
                      <FaTrashAlt className="color-secondary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalTambahSlider
        editId={editId}
        editData={editData}
        getSlidersData={getSlidersData}
      />
    </div>
  );
};

export default SectionSlider;
