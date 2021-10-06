import { useEffect, useState } from "react";
import AnimatePage from "../../Shared/AnimatePage/AnimatePage";
import CardPelanggar from "./CardPelanggar";
import { useDebounce } from "use-debounce";
import { Pagination } from "antd";
import router, { useRouter } from "next/router";
import { ssURL } from "../../../client/clientAxios";

const CariPelanggar = ({ rombelData, setSearch, debounceSearch }) => {

  const [listSiswa, setListSiswa] = useState([]);

  const { query: { page } } = useRouter();

  useEffect(() => {
    if (rombelData) {
      setListSiswa(rombelData?.siswa?.data);
    }
  }, [rombelData]);

  return (
    <AnimatePage>
      <div className="bg-soft-primary px-3 py-4 rounded-ss position-relative mt-5" style={{ minHeight: 176 }}>
        {/* background */}
        <img src="/img/bg-cari-data-pelanggar.png" className="position-absolute" style={{ right: 20, top: -20 }} />
        
        <h2 className="color-dark fw-bold mb-1">Cari Data Pelanggar</h2>
        <p className="color-secondary">Temukan data siswa mengenai pelanggaran, penghargaan <br /> dan sanksi.</p>
        
        {/* SEARCH BOX */}
        <div className="card card-ss position-absolute" style={{ width: "96%", left: "50%", transform: "translateX(-50%)" }}>
          <input className="form-control form-search-perpustakaan fs-5 fw-bold ms-4 pe-4 pt-4" placeholder="Cari NIS atau nama siswa..." onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* CARD Pelanggar */}
      <div className="row" style={{ marginTop: 60 }}>
        { listSiswa?.length > 0 ? listSiswa?.map((siswa, index) => (
          <div className="col-4 mb-3" key={`${siswa?.nama}-${siswa?.id}-${index}`}>
            <CardPelanggar siswa={siswa} />
          </div>
        )) : "Belum ada data"}
      </div>
      <div className="my-4 text-center">
        <Pagination
          total={rombelData?.siswa?.total}
          showSizeChanger={false}
          current={page || 1}
          pageSize={20}
          onChange={(e) =>
            router.push(
              `${ssURL}/tata-tertib?menu=data-siswa&nav=cari-pelanggar&page=${e}`
            )
          }
        />
      </div>
    </AnimatePage>
  )
}

export default CariPelanggar;