import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: "Rupiah",
        },
      },
      // {
      //   type: "linear",
      //   display: true,
      //   position: "right",
      //   id: "y-axis-2",
      //   gridLines: {
      //     drawOnArea: false,
      //   },
      // },
    ],
  },
};

const GrafikMutasi = ({ label, data }) => {
  const [grafikData, setGrafikData] = useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-axis-1",
      },
      {
        label: "# of No Votes",
        data: [1, 2, 1, 1, 2, 2],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-1",
      },
    ],
  });
  useEffect(() => {
    setGrafikData({
      labels: label,
      datasets: [
        {
          label: "Pemasukan",
          data: data?.pemasukan,
          fill: true,
          backgroundColor: "rgba(36, 128, 235, .1)",
          borderColor: "rgba(36, 128, 235, .75)",
          yAxisID: "y-axis-1",
        },
        {
          label: "Pengeluaran",
          data: data?.pengeluaran,
          fill: true,
          backgroundColor: "rgba(252, 84, 75, .1)",
          borderColor: "rgba(252, 84, 75, .75)",
          yAxisID: "y-axis-1",
        },
      ],
    });
  }, [data, label]);
  return (
    <>
      <Line data={grafikData} options={options} />
    </>
  );
};

export default GrafikMutasi;
