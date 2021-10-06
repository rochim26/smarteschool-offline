import { Bar } from 'react-chartjs-2'

const Grafik = () => {

  const tugas = {
    labels: ['Tugas 1', 'Tugas 2', 'Tugas 3', 'Tugas 4', 'Tugas 5', 'Tugas 6'],
    datasets: [
      {
        label: "Nilai Rata Rata Tugas",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const kkm = {
    labels: ['Tugas 1', 'Tugas 2', 'Tugas 3', 'Tugas 4', 'Tugas 5', 'Tugas 6'],
    datasets: [
      {
        label: "Jumlah Siswa Dibawah KKM",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div className="mt-4">
      <div className="px-3 pb-3">
        <div className="d-flex align-items-center">
          <p className="color-dark fw-bold mb-0 me-4">Urutkan Berdasarkan</p>
          
          <select className="form-select w-50">
            <option>Tanggal Pembuatan Tugas (Terbaru ke Terlama)</option>
            <option>Nilai Tugas (Tertinggi ke Terendah)</option>
            <option>Jumlah Siswa dibawah KKM (Tertinggi ke Terendah)</option>
            <option>Jumlah Siswa dibawah KKM (Tertinggi ke Terendah)</option>
          </select>
        </div>
        <div className="mt-5">
          <h5 className="color-dark fs-18-ss fw-bold">Nilai Rata Rata Tugas</h5>
          <Bar data={tugas} options={options} />
        </div>
        <div className="mt-5">
          <h5 className="color-dark fs-18-ss fw-bold">Jumlah Siswa Dibawah KKM</h5>
          <Bar data={kkm} options={options} />
        </div>
      </div>
    </div>
  )
}

export default Grafik