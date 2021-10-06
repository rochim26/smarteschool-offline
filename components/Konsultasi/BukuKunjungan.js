import Link from "next/link";
import { useRouter } from "next/router";
import { ssURL } from "../../client/clientAxios";
import AnimatePage from "../Shared/AnimatePage/AnimatePage"
import CardBukuKunjungan from "./CardBukuKunjungan";
import DaftarPengajuanKonsultasi from "./DaftarPengajuanKonsultasi";
import DetailPengajuanPertemuan from "./DetailPengajuanPertemuan";

const BukuKunjungan = () => {

  const router = useRouter();
  const { query: { detail } } = router;

  return (
    <div className="col-md-12 col-lg-9">
      { !detail
        ? (
          <>
            <CardBukuKunjungan />
            <DaftarPengajuanKonsultasi />
          </>
        ) : <DetailPengajuanPertemuan />
      }
    </div>
  )
}

export default BukuKunjungan;