import { baseURL, ssURL } from "../../client/clientAxios";
import { useRouter } from "next/router";
import Navbar from "../Shared/Navbar/Navbar";
import AnalisisNilaiPengetahuan from "./AnalisisNilaiPengetahuan";
import AnalisisNilaiSikap from "./AnalisisNilaiSikap";
import AnalisisPerformaTugas from "./AnalisisPerformaTugas/AnalisisPerformaTugas";
import Skeleton from "react-loading-skeleton";
import { downloadAnalisis } from "../../client/RombelClient";

const AnalisisNilaiPage = ({
  analisisNilai,
  judulTugas,
  loading,
  jadwalMengajar,
}) => {
  const {
    query: { subnav, id },
  } = useRouter();

  const navItems = [
    {
      url: `${ssURL}/rombel/${id}?nav=analisis-nilai&subnav=pengetahuan`,
      text: "Pengetahuan",
      active: subnav == "pengetahuan" || !subnav,
    },
    {
      url: `${ssURL}/rombel/${id}?nav=analisis-nilai&subnav=sikap`,
      text: "Sikap",
      active: subnav == "sikap",
    },
  ];

  const downloadAnalisisNilai = async () => {
    const { data } = await downloadAnalisis(id);

    if (data) {
      window.open(`${baseURL}/${data}`, "_blank");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <Navbar nav={navItems} />

        {loading ? (
          <Skeleton count={3} height={50} />
        ) : subnav === "pengetahuan" || !subnav ? (
          <AnalisisNilaiPengetahuan
            analisisNilai={analisisNilai}
            judulTugas={judulTugas}
            downloadAnalisisNilai={downloadAnalisisNilai}
            jadwalMengajar={jadwalMengajar}
          />
        ) : subnav === "sikap" ? (
          <AnalisisNilaiSikap
            analisisNilai={analisisNilai}
            judulTugas={judulTugas}
            downloadAnalisisNilai={downloadAnalisisNilai}
          />
        ) : null}

        {/* <AnalisisPerformaTugas judulTugas={judulTugas} /> */}
      </div>
    </div>
  );
};

export default AnalisisNilaiPage;
