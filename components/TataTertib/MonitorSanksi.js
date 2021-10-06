import { useEffect, useState } from "react";
import { getSanksiPelanggaran } from "../../client/TataTertibClient";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import LabelStatus from "../Shared/LabelStatus/LabelStatus";
import TautanCard from "../Shared/TautanCard/TautanCard";
import AccordionSanksi from "./AccordionSanksi";
import Sanksi from "./Sanksi";

const MonitorSanksi = () => {

  const [sanksiPelanggaran, setSanksiPelanggaran] = useState(null);

  const { siswa: listSiswa, sanksi: listSanksi } = sanksiPelanggaran || {};

  const _getSanksiPelanggaran = async () => {
    const { data } = await getSanksiPelanggaran()
    if (data) {
      setSanksiPelanggaran(data);
    }
  }

  useEffect(() => {
    _getSanksiPelanggaran();
  }, []);

  return (
    <AnimatePage>
      <div className="col-md-12 mb-4 mt-4">
        { listSiswa?.length > 0 ? listSiswa?.map((siswa, index) => {
          const sanksiNumber = listSanksi?.findIndex(sanksi => sanksi?.id === siswa?.sanksi?.id);
          return (
            <AccordionSanksi
              key={`${siswa?.id}-${index}`}
              namaSiswa={siswa?.user?.nama}
              namaSanksi={`Sanksi ${sanksiNumber + 1} - ${siswa?.sanksi.nama}`}
              keterangan={siswa?.keterangan}
              tanggal={siswa?.createdAt}
              tindakLanjut={siswa?.sanksi?.tindakLanjut}
              lampiran={siswa?.lampiran}
              bukti={siswa?.bukti}
              sanksiPelanggaranId={siswa?.sanksi?.id}
              withButtonKonfirmasi={false}
            />
          )
        }) : "Belum ada data"}
      </div>
    </AnimatePage>
  )
}

export default MonitorSanksi;