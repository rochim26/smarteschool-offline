import Link from "next/link";
import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { FaPen } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import {
  checkIconLihatRapor,
  checkLabelStatusLihatRapor,
  checkStatusLihatRapor,
  jumlahNilaiDibawah,
} from "../../utilities/RaporUtils";

const SectionScrollMenu = ({
  rombel,
  id,
  rombelId,
  jadwalId,
  listKKM,
  totalMapel,
  setFormData,
  formData,
}) => {
  const indexAnggota = rombel?.anggotaRombel?.findIndex(
    (item) => item?.user?.id == id
  );
  const sortedAnggota = rombel?.anggotaRombel?.splice(indexAnggota, 1);
  rombel?.anggotaRombel?.splice(0, 0, ...sortedAnggota);
  const MenuItem = ({ id, data, active }) => {
    return (
      <div className="row pe-3">
        <div className="col-md-12" key={id}>
          <div
            className={`border border-1 border-light-secondary rounded-ss p-3 position-relative card-rapor-siswa pointer${
              active && " bg-soft-primary"
            }`}
          >
            <div
              className="position-absolute icon-edit-rapor-siswa"
              style={{
                top: "10px",
                right: "10px",
              }}
            >
              <div
                className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white"
                style={{
                  width: "30px",
                  height: "30px",
                  boxShadow: "0 5px 15px rgba(58,65,102,.2)",
                }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    userId: data?.user?.id,
                    avatar: data?.user?.avatar,
                  })
                }
                data-bs-toggle="modal"
                data-bs-target="#modalUbahFotoProfil"
              >
                <FaPen />
              </div>
            </div>
            <Link
              href={`${ssURL}/rapor/${data?.user?.id}?rombel=${rombelId}&jadwal_mengajar=${jadwalId}`}
            >
              <div className="d-flex">
                <img
                  src={data?.user?.avatar || "/img/cover-sma-smk.svg"}
                  className="me-3 rounded-ss img-fit-cover"
                  width="75px"
                  height="100px"
                  alt=""
                />
                <div>
                  <div>
                    <p className="fs-18-ss fw-extrabold mb-0 color-dark">
                      {data?.user?.nama}
                    </p>
                    {/* <p className="fs-14-ss fw-semi-bold ">
                            Tidak ada dibawah KKM
                          </p> */}
                    <p className="fs-14-ss fw-semi-bold">
                      <span className="fw-semibold"> Dibawah KKM :</span>
                      <span className="fw-bold">
                        {/* {checkDibawahKKM(
                                d?.user?.meta?.kkmKeterampilan,
                                d?.user?.meta?.kkmPengetahuan
                              )}{" "} */}
                        {jumlahNilaiDibawah(data, listKKM)}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    {checkIconLihatRapor(data, listKKM, totalMapel)}
                    <span
                      className={checkLabelStatusLihatRapor(
                        data,
                        listKKM,
                        totalMapel
                      )}
                    >
                      {checkStatusLihatRapor(data, listKKM, totalMapel)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Menu = (list, selected) =>
    list?.map((el, idx) => {
      return (
        <MenuItem
          data={el}
          nama={el?.user?.nama}
          // kelas={el.kelas}
          id={el.id}
          active={selected == el?.user.id}
          idx={idx}
          // tuntas={el.active}
        />
      );
    });

  const menu = Menu(rombel?.anggotaRombel, id);

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };

  const ArrowLeft = Arrow({
    text: (
      <div
        className="bg-white rounded-circle shadow-dark-ss d-flex justify-content-center align-items-center p-1"
        style={{ height: "60px", width: "60px" }}
      >
        <img src={"/img/arrow-rekap-left.svg"} className="ms-1" />
      </div>
    ),
    className: "arrow-prev",
  });
  const ArrowRight = Arrow({
    text: (
      <div
        className="bg-white rounded-circle shadow-dark-ss d-flex justify-content-center align-items-center p-1"
        style={{ height: "60px", width: "60px" }}
      >
        <img src={"/img/arrow-rekap-right.svg"} className="me-1" />
      </div>
    ),
    className: "arrow-next",
  });
  return (
    <div className="col-12">
      <div className="card card-ss bg-white p-4 kelas-rekap slider-rapor">
        <ScrollMenu
          hideArrows={true}
          hideSingleArrow={true}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          clickWhenDrag={false}
          // selected={selected}
          // onSelect={onSelect}
          wheel={false}
          translate={2}
          scrollBy={1}
          alignCenter={false}
        />
      </div>
    </div>
  );
};

export default SectionScrollMenu;
