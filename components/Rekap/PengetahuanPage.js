import React from "react";
import { ssURL } from "../../client/clientAxios";
import Navbar from "../Shared/Navbar/Navbar";
import DaftarRekapTugas from "./DaftarRekapTugas";

const PengetahuanPage = ({ id, subnav }) => {
  const navItems = [
    {
      url: `${ssURL}/rekap/[id]/?subnav=tugas`,
      as: `${ssURL}/rekap/${id}/?subnav=tugas`,
      text: "Rekap Tugas",
      active: subnav == "tugas" || subnav == undefined,
    },
    {
      url: `${ssURL}/rekap/[id]/?subnav=ujian-harian`,
      as: `${ssURL}/rekap/${id}/?subnav=ujian-harian`,
      text: "Rekap Ujian Harian",
      active: subnav == "ujian-harian",
    },
  ];

  return (
    <div>
      <Navbar nav={navItems} />
      <DaftarRekapTugas />
    </div>
  );
};

export default PengetahuanPage;
