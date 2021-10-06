import { FaPen, FaTrashAlt } from "react-icons/fa";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import ProfileCard from "../Shared/ProfileCard/ProfileCard"
import Navbar from "../Shared/Navbar/Navbar";
import { ssURL } from "../../client/clientAxios";
import { useRouter } from "next/router";
import DetailPengajuanPertemuan from "./DetailPengajuanPertemuan";
import DaftarKonsultasi from "./DaftarKonsultasi";
import useUser from "../../hooks/useUser";

const KonsultasiSaya = () => {

  const { user } = useUser();

  const router = useRouter();
  const { query: { filter, detail } } = router || "";

  const navItems = [
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=pengajuan`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=pengajuan`,
      text: "Pengajuan",
      active: (!filter || filter === "pengajuan"),
      isVisible: user?.role === "siswa"
    },
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=diproses`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=diproses`,
      text: "Diproses",
      active: filter === "diproses",
      isVisible: user?.role === "siswa"
    },
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=ditolak`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=ditolak`,
      text: "Ditolak",
      active: filter === "ditolak",
      isVisible: user?.role === "siswa"
    },
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=hari-ini`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=hari-ini`,
      text: "Hari Ini",
      active: (!filter || filter === "hari-ini"),
      isVisible: user?.role === "guru"
    },
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=akan-datang`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=akan-datang`,
      text: "Akan Datang",
      active: filter === "akan-datang",
      isVisible: user?.role === "guru"
    },
    {
      url: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=selesai`,
      as: `${ssURL}/konsultasi?menu=konsultasi-saya&filter=selesai`,
      text: "Selesai",
      active: filter === "selesai",
      isVisible: (user?.role === "guru" || user?.role === "siswa")
    },
  ].filter(item => item.isVisible);

  return (
    <div className="col-md-12 col-lg-9">
      <AnimatePage>
          
        { !detail && <Navbar nav={navItems} />}

        { !detail
          ? <DaftarKonsultasi />
          : <DetailPengajuanPertemuan />
        }
      </AnimatePage>
    </div>
  )
}

export default KonsultasiSaya;