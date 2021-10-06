import useUser from "../../../../hooks/useUser";
import AccordionSanksi from "../../AccordionSanksi"

const Sanksi = ({ siswa, _getDetailSiswa }) => {

  const { user } = useUser();

  return (
    <div>
      { siswa?.sanksiSiswa?.length > 0 ? siswa?.sanksiSiswa?.map((sanksi, index) => (
        <AccordionSanksi
          key={`${sanksi?.id}-${index}`}
          sanksiPelanggaranId={sanksi?.id}
          namaSiswa={`Sanksi ${index + 1} - Pembinaan oleh wali kelas`}
          keterangan={sanksi?.keterangan}
          tanggal={sanksi?.createdAt}
          tindakLanjut={sanksi?.tindakLanjut}
          lampiran={sanksi?.lampiran}
          link={sanksi?.link}
          index={index}
          showStatusSanksi
          bukti={sanksi?.bukti}
          _getDetailSiswa={_getDetailSiswa}
        />
      )) : "Belum ada data"}
    </div>
  )
}

export default Sanksi;