import { DatePicker } from "antd";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import ProfileCard from "../Shared/ProfileCard/ProfileCard"
import CardBuatJadwalKonsultasi from "./detail-pengajuan-pertemuan/CardBuatJadwalKonsultasi";
import CardInformasiPengajuan from "./detail-pengajuan-pertemuan/CardInformasiPengajuan";
import CardStatusPengajuan from "./detail-pengajuan-pertemuan/CardStatusPengajuan";
import CardJadwalKonsultasi from "./detail-pengajuan-pertemuan/CardJadwalKonsultasi";
import CardBuatPenolakanKonsultasi from "./detail-pengajuan-pertemuan/CardBuatPenolakanKonsultasi";
import { useRouter } from "next/router";

const DetailPengajuanPertemuan = () => {

  const router = useRouter();
  
  const { query: { menu } } = router;

  const { user } = useUser();

  const backUrl = menu.includes("konsultasi-saya") ? `${ssURL}/konsultasi?menu=konsultasi-saya` : `${ssURL}/konsultasi?menu=buku-kunjungan`

  return <AnimatePage>
    <ProfileCard
      backUrl={backUrl}
      status={{ text: "Pengajuan Diterima", info: "success" }} // info = warning | info | danger || success
    />
    
    <CardInformasiPengajuan />
    { user?.role === "guru" && <CardStatusPengajuan />}
    { user?.role === "guru" && <CardBuatJadwalKonsultasi />}

    <CardJadwalKonsultasi />

    { user?.role === "guru" && <CardBuatPenolakanKonsultasi />}
  </AnimatePage>
}

export default DetailPengajuanPertemuan;