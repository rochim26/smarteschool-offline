import { FaCloudDownloadAlt } from "react-icons/fa";
import Tabs from "../../Shared/Tabs/Tabs";
import Table from "./Table";
import Grafik from "./Grafik";

const AnalisisPerformaTugas = ({ judulTugas }) => {
  const navItems = [
    {
      id: "table",
      nav: "Table",
      active: true,
      content: <Table judulTugas={judulTugas} />,
    },
    {
      id: "grafik",
      nav: "Grafik",
      content: <Grafik />,
    },
  ];

  return (
    <div className="mt-5">
      <div className="card card-ss">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column pt-4 px-4 mb-4">
            <h4 className="mb-sm-0 mb-3 fw-extrabold color-dark">
              Performa Tugas
            </h4>
            <div className="d-flex flex-column flex-lg-row align-items-lg-center fs-6">
              <button className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fw-bold color-secondary fs-14-ss">
                <FaCloudDownloadAlt className="me-2" />
                Unduh
              </button>
            </div>
          </div>

          <Tabs navItems={navItems} className="mx-4" />
        </div>
      </div>
    </div>
  );
};

export default AnalisisPerformaTugas;
