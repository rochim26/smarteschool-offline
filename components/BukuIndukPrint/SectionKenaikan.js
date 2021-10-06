import { FaPen } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import ModalEditBio from "../Profil/ModalEditBio";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";
import { momentPackage } from "../../utilities/HelperUtils";

const SectionKenaikan = ({ isReadOnly = false, keterangan, kenaikan }) => {
  const values = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
  ]);

  function romanToInt(string, hasil) {
    let result = 0,
      current,
      previous = 0;
    for (const char of string.split("").reverse()) {
      current = values.get(char);
      if (current >= previous) {
        result += current;
      } else {
        result -= current;
      }
      previous = current;
    }
    if (hasil == true) {
      return result + 1;
    } else if (hasil == false) {
      return result;
    }
  }

  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">H. Kenaikan</h6>
      <table className="w-100 table">
        <tbody>
          <tr>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{
                width: "33%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              {keterangan?.kelulusan == "lulus" ? (
                <>
                  <span>Naik</span> /
                  <span className="text-decoration-line-through">
                    Tidak Naik
                  </span>
                </>
              ) : (
                <>
                  <span className="text-decoration-line-through">Naik</span> /
                  <span> Tidak Naik</span>
                </>
              )}
            </td>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{
                width: "33%",
              }}
            >
              {keterangan?.kelulusan == "lulus" ? (
                <>
                  Ke Kelas : {!kenaikan ? `-` : `${romanToInt(kenaikan, true)}`}
                </>
              ) : (
                <>
                  {" "}
                  Ke Kelas :{" "}
                  {!kenaikan ? `-` : `${romanToInt(kenaikan, false)}`}
                </>
              )}
            </td>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{
                width: "33%",
              }}
            >
              Tanggal : {momentPackage().format("dddd, DD MMMM YYYY")}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SectionKenaikan;
