import NewModal from "../NewModal/NewModal"


const ModalDetailIkatanAlumni = ({ alumni }) => {
  return (
    <NewModal
      modalId="modalDetailIkatanAlumni"
      modalSize="xl"
      removeFooter={true}
      title={
        <>
          <h4 className="mb-1 fw-extrabold">Detail Alumni</h4>
        </>
      }
      content={
        <div className="row justify-content-center pb-5 wrapper-content alumni-detail">
          <div className="col-md-10">
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col" colSpan="2">
                    <h4 className="font-weight-bold">{alumni?.nama}</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">No Telpon / Whatsapp</th>
                  <td>{alumni?.whatsapp}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{alumni?.email}</td>
                </tr>
                <tr>
                  <th scope="row">Jenis Kelamin</th>
                  <td>{alumni?.genderText}</td>
                </tr>
                <tr>
                  <th scope="row">Angkatan</th>
                  <td>{alumni?.infoAlumni?.tahunMasuk}</td>
                </tr>
                <tr>
                  <th scope="row">Jurusan</th>
                  <td>{alumni?.infoAlumni?.jurusan}</td>
                </tr>
                <tr>
                  <th scope="row">Sekolah Lanjutan</th>
                  <td>
                    <ul className="pl-0">
                      {
                        alumni?.infoAlumni?.sekolahLanjutan?.split(",")?.map(sekolah => (
                          <li>{sekolah}</li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Sertifikasi Keahlian</th>
                  <td>
                    <ul className="pl-0">
                      {
                        alumni?.infoAlumni?.sertifikasiKeahlian?.split(",")?.map(sertifikat => (
                          <li>{sertifikat}</li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Industri</th>
                  <td>{alumni?.infoAlumni?.sektorIndustri}</td>
                </tr>
                <tr>
                  <th scope="row">Pengalaman</th>
                  <td>
                    <ul className="pl-0">
                      {
                        alumni?.infoAlumni?.pengalaman?.split(",")?.map(pengalamanData => (
                          <li>{pengalamanData}</li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Purnakarya</th>
                  <td>
                    {
                      alumni?.infoAlumni?.purnakarya === 1 ? "Ya" : "Tidak"
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    />
  )
}

export default ModalDetailIkatanAlumni