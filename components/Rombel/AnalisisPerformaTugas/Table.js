const Table = ({ judulTugas }) => {
  return (
    <div className="mt-4">
      <div className="table-responsive">
        <table className="table-ss">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Tugas</th>
              <th>Tanggal Pembuatan</th>
              <th>Nilai Rata Rata</th>
              <th>Dibawah KKM</th>
            </tr>
          </thead>
          <tbody>
            {judulTugas?.map((tugas, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{tugas?.tugas?.judul}</td>
                  <td>{tugas?.tanggalDibuat}</td>
                  <td>
                    {tugas?.ditugaskan?.[0]?.jumlahNilai ||
                      0 / tugas?.ditugaskan?.[0]?.jumlahSiswa}
                  </td>
                  <td>0 Siswa</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
