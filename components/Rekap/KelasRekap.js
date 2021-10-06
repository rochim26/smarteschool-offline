import Link from "next/link";
import React, { useState } from "react";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScrollMenu from "react-horizontal-scrolling-menu";

const KelasRekap = ({ rombelKelas, rombel_id, setRombel_id, isSikapPage }) => {
  const MenuItem = ({ idx, url, id, active, tingkat, kelas, tuntas }) => {
    return (
      <div
        className={`step-ppdb position-relative`}
        key={id}
        onClick={() => setRombel_id(id)}
      >
        {/* {tuntas ? (
            <div
              className="step-check position-absolute rounded-circle bg-white align-items-center justify-content-center"
              style={{
                width: "45px",
                height: "45px",
                right: "0",
                top: "-10%",
              }}
            >
              <div
                className="rounded-circle bg-success shadow-success-ss d-flex align-items-center justify-content-center text-white"
                style={{ width: "35px", height: "35px" }}
              >
                <FaCheck />
              </div>
            </div>
          ) : null} */}
        <div
          className={`step-content d-flex align-items-center justify-content-center flex-column text-center rounded-ss p-3 pointer me-3 ${
            active && "active text-white"
          }`}
          style={{
            minWidth: "125px",
            height: "125px",
          }}
        >
          <h2 className="m-0 fw-bold mb-2 fw-black">{tingkat}</h2>
          <h5 className="m-0 fw-bold fw-extrabold">{kelas}</h5>
        </div>
      </div>
    );
  };

  const Menu = (list, selected) =>
    list?.map((el, idx) => {
      return (
        <MenuItem
          tingkat={el.tingkat}
          kelas={el.kelas}
          id={el.id}
          active={selected == el.id}
          idx={idx}
          tuntas={el.active}
        />
      );
    });

  const menu = Menu(rombelKelas, rombel_id);

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

  const [selected, setSelected] = useState();

  const onSelect = (key) => {
    setSelected(key);
  };

  return (
    <div>
      <div className="kelas-rekap card card-ss mb-4">
        <div className="card-body px-4 pt-3 pb-4">
          {isSikapPage ? (
            <div className="d-flex justify-content-start align-items-stretch flex-wrap">
              {/* {rombelKelas?.map((d, idx) => (
                <Link href={d.url} key={idx}>
                  <div
                    className={`step-ppdb position-relative ${
                      rombel_id == d.id ? "menu-active" : ""
                    }
                    `}
                  >
                    {d.active ? (
                      <div
                        className="step-check position-absolute rounded-circle bg-white align-items-center justify-content-center"
                        style={{
                          width: "45px",
                          height: "45px",
                          right: "0",
                          top: "-10%",
                        }}
                      >
                        <div
                          className="rounded-circle bg-success shadow-success-ss d-flex align-items-center justify-content-center text-white"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <FaCheck />
                        </div>
                      </div>
                    ) : null}
                    <div
                      className="step-content d-flex align-items-center justify-content-center flex-column text-center rounded-ss p-3 pointer me-3"
                      style={{
                        // maxWidth: "125px",
                        height: "125px",
                      }}
                    >
                      <h2 className="m-0 fw-bold mb-2 fw-black">{d.tingkat}</h2>
                      <h5 className="m-0 fw-bold fw-extrabold">{d.kelas}</h5>
                    </div>
                  </div>
                </Link>
              ))} */}
              <ScrollMenu
                hideArrows={true}
                hideSingleArrow={true}
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                clickWhenDrag={false}
                selected={selected}
                onSelect={onSelect}
                wheel={false}
                translate={2}
                scrollBy={1}
                alignCenter={false}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-start align-items-stretch flex-wrap">
              {/* {rombelKelas?.map((d, idx) => (
                <Link href={d.url} key={idx}>
                  <div
                    className={`step-ppdb position-relative ${
                      rombel_id == d.id ? "menu-active" : ""
                    }
                   `}
                  >
                    {d.active ? (
                      <div
                        className="step-check position-absolute rounded-circle bg-white align-items-center justify-content-center"
                        style={{
                          width: "45px",
                          height: "45px",
                          right: "0",
                          top: "-10%",
                        }}
                      >
                        <div
                          className="rounded-circle bg-success shadow-success-ss d-flex align-items-center justify-content-center text-white"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <FaCheck />
                        </div>
                      </div>
                    ) : null}
                    <div
                      className="step-content d-flex align-items-center justify-content-center flex-column text-center rounded-ss p-3 pointer me-3"
                      style={{
                        // maxWidth: "125px",
                        height: "125px",
                      }}
                    >
                      <h2 className="m-0 fw-bold mb-2 fw-black">{d.tingkat}</h2>
                      <h5 className="m-0 fw-bold fw-extrabold">{d.kelas}</h5>
                    </div>
                  </div>
                </Link>
              ))} */}
              <ScrollMenu
                hideArrows={true}
                hideSingleArrow={true}
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                clickWhenDrag={false}
                selected={selected}
                onSelect={onSelect}
                wheel={false}
                translate={2}
                scrollBy={1}
                alignCenter={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelasRekap;
