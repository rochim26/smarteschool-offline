import { Doughnut } from "react-chartjs-2";

const AnalisisJumlahPesertaDidik = ({
  jumlahLaki = 0,
  jumlahPerempuan = 0,
  isLegendBottom,
  withTitle = true,
  containerStyle = {},
  maintainAspectRatio = true,
}) => {
  const data = {
    labels: ["Laki-Laki", "Perempuan"],
    datasets: [
      {
        label: "# of Votes",
        data: [jumlahLaki, jumlahPerempuan],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      position: isLegendBottom ? "bottom" : "right",
      align: "center",
    },
    maintainAspectRatio: maintainAspectRatio,
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AnalisisJumlahPesertaDidik;
