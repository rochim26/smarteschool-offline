import { InputNumber } from "antd";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  checkLabelStatusTuntas,
  checkStatusTuntas,
} from "../..//utilities/RekapUtils";
import { editRekapNilai, getRekapRombelNilai } from "../../client/RekapClient";

const DaftarNilaiRekap = ({ daftarNilaiRekap, nilaiKKM }) => {
  const [formNilai, setFormNilai] = useState(0);
  const [nilai, setNilai] = useState([]);
  const [showInput, setShowInput] = useState(null);

  const _getRekapRombelNilai = async (id) => {
    const { data } = await getRekapRombelNilai(id);
    if (data) {
      setNilai([...data?.nilai]);
    }
  };

  const _editRekapNilai = async (nilai, d) => {
    if (nilai > 100) {
      toast.error("Nilai Melebihi 100");
      return;
    }
    const payload = {
      nilai,
    };
    const { data, error } = await editRekapNilai(
      d.mRekapRombelId,
      d.mUserId,
      payload
    );
    if (data) {
      toast.success("Nilai Berhasil diubah");
      setShowInput(null);
      _getRekapRombelNilai(d.mRekapRombelId);
    } else {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="col-md-12">
        {" "}
        <div className="card card-ss">
          <div className="card-header p-4 card-header-ss">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
                Daftar Nilai Tugas Siswa
              </h4>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table-ss">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th className="text-md-center text-start">Status</th>
                    <th className="text-md-center text-start">KKM</th>
                    <th className="text-md-center text-start">Nilai</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {daftarNilaiRekap?.rekapnilai?.map((d, idx) => {
                    d.nilai =
                      nilai.length == 0
                        ? d?.nilai
                        : nilai.find((n) => n.id == d.id).nilai;
                    return (
                      <tr>
                        <td data-th="No">{idx + 1}</td>
                        <td data-th="Nama">
                          <span className="fw-semibold">{d?.user?.nama}</span>
                        </td>
                        <td
                          data-th="Status"
                          className="text-md-center text-start"
                        >
                          <span
                            className={checkLabelStatusTuntas(
                              nilaiKKM,
                              d?.nilai
                            )}
                          >
                            {checkStatusTuntas(nilaiKKM, d?.nilai)}
                          </span>
                        </td>
                        <td data-th="KKM" className="text-md-center text-start">
                          {" "}
                          <span className="color-dark fw-semibold text-md-center">
                            {nilaiKKM}
                          </span>
                        </td>
                        <td
                          data-th="Nilai"
                          className="text-md-center text-start"
                        >
                          <InputNumber
                            className="form-control text-center mx-md-auto"
                            min={0}
                            max={100}
                            defaultValue={d?.nilai}
                            onChange={(value) => setFormNilai(value)}
                            disabled={showInput != d.id}
                            style={{ width: "72px" }}
                            onKeyPress={(e) => {
                              e.key === "Enter"
                                ? _editRekapNilai(e.target.value, d)
                                : "";
                            }}
                          />
                          {/* <input
                            type="number"
                            className="form-control text-center mx-md-auto"
                            min={0}
                            max={100}
                            defaultValue={d?.nilai}
                            onChange={(value) => setFormNilai(value)}
                            disabled={showInput != d.id}
                            style={{ width: "72px" }}
                            onKeyPress={(e) => {
                              e.key === "Enter"
                                ? _editRekapNilai(e.target.value, d)
                                : "";
                            }}
                            onChange={(e) => setFormNilai(e.target.value)}
                            disabled={showInput != d.id}
                            style={{ width: "72px" }}
                          /> */}
                        </td>
                        <td>
                          {showInput == d.id ? (
                            <a onClick={() => _editRekapNilai(formNilai, d)}>
                              <div
                                className="rounded-circle bg-primary p-2 d-flex justify-content-center align-items-center shadow-primary-ss"
                                style={{
                                  height: "30px",
                                  width: "30px",
                                }}
                              >
                                <FaCheck color="white" />
                              </div>
                            </a>
                          ) : (
                            <a
                              onClick={() => {
                                setShowInput(d.id), setFormNilai(d.nilai);
                              }}
                            >
                              <img
                                src={`/img/icon-edit-template-deskripsi.svg`}
                                alt="icon-option"
                              />
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftarNilaiRekap;
