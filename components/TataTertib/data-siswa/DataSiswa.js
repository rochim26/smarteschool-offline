import { useRouter } from "next/router";
import { ssURL } from "../../../client/clientAxios";
import AnimatePage from "../../Shared/AnimatePage/AnimatePage"
import Navbar from "../../Shared/Navbar/Navbar";
import DaftarKelas from "./DaftarKelas";
import CariPelanggar from "./CariPelanggar";
import DetailKelas from "./DetailKelas";
import DetailSiswa from "./DetailSiswa";
import { useEffect, useState } from "react";
import { getRombel } from "../../../client/TataTertibClient";
import { useDebounce } from "use-debounce";

const DataSiswa = () => {

  const router = useRouter();
  const { query: { nav, detail, page } } = router;

  const [rombelData, setRombelData] = useState(null);

  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 600);

  const navItems = [
    {
      url: `${ssURL}/tata-tertib?menu=data-siswa&nav=data`,
      text: "Data",
      active: nav == "data" || nav == undefined,
    },
    {
      url: `${ssURL}/tata-tertib?menu=data-siswa&nav=cari-pelanggar`,
      text: "Cari Pelanggar",
      active: nav == "cari-pelanggar",
    },
  ];

  const action = [
    {
      button: <input
        type="text"
        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
        id="exampleFormControlInput1"
        placeholder="Cari Nama Pelanggar"
        style={{ width: 400 }}
        // value={search}
      />,
      isVisible: false //(nav == "data" || nav === undefined)
    }
  ].filter(ac => ac.isVisible);

  const _getRombel = async () => {
    const { data } = await getRombel({ search, page });
    if (data) {
      setRombelData(data);
    }
  }

  useEffect(() => {
    _getRombel();
  }, [debounceSearch, page]);

  useEffect(() => {
    if (nav === "cari-pelanggar") {
      setSearch("");
    }
  }, [nav])

  return (
    <>
      <div className="col-md-12 col-lg-9">
        { !detail && (
          <Navbar
            nav={navItems}
            action={action}
          />
        )}

        { (nav === "data" || nav === undefined) && !detail && <DaftarKelas rombelData={rombelData} /> }
        { nav === "cari-pelanggar" && !detail && <CariPelanggar rombelData={rombelData} setSearch={setSearch} debounceSearch={debounceSearch} />}
      </div>

      {/* DETAIL */}
      { nav === "data" && detail === "kelas" && <DetailKelas />}
      { (nav === "data" || nav === "cari-pelanggar") && detail === "siswa" && <DetailSiswa />}
    </>
  )
}

export default DataSiswa