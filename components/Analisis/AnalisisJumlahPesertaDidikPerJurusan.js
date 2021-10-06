import { Doughnut } from "react-chartjs-2";

const AnalisisJumlahPesertaDidikPerJurusan = ({
  jurusanData,
  isLegendBottom,
  withTitle=false,
  maintainAspectRatio=true
}) => {
  let labels = [];
  let score = [];

  if (jurusanData) {
    jurusanData?.map((jurusan) => {
      labels.push(jurusan[0]);
      score.push(jurusan[1]);
    });
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: score,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      position: isLegendBottom ? "bottom" : "right",
      align: "center",
    },
    maintainAspectRatio: maintainAspectRatio
  };

  return (
    <div className="d-flex align-items-start justify-content-start flex-column">
      { withTitle && <h4 className="fw-extrabold color-dark mb-4">
        Jumlah Peserta Didik per Angkatan
      </h4>}
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AnalisisJumlahPesertaDidikPerJurusan;
