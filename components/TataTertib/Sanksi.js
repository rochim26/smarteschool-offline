import { useRouter } from "next/router";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import AnimatePage from "../Shared/AnimatePage/AnimatePage"
import Navbar from "../Shared/Navbar/Navbar";
import DaftarSanksi from "./DaftarSanksi";
import MonitorSanksi from "./MonitorSanksi";

const Admin = ({ nav }) => {

  const navItems = [
    {
      url: `${ssURL}/tata-tertib?menu=sanksi&nav=daftar-sanksi`,
      text: "Daftar Sanksi",
      active: nav == "daftar-sanksi" || nav == undefined,
    },
    {
      url: `${ssURL}/tata-tertib?menu=sanksi&nav=monitor-sanksi`,
      text: "Monitor Sanksi",
      active: nav == "monitor-sanksi",
    },
  ];

  const action = [
    {
      button: <input
        type="text"
        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
        id="exampleFormControlInput1"
        placeholder="Cari Nama Pelanggar"
        style={{ width: 400 }}
        // value={search}
      />,
      isVisible: nav == "monitor-sanksi"
    }
  ].filter(ac => ac.isVisible);

  return <>
    <Navbar
      nav={navItems}
      action={action}
    />

    { (nav == "daftar-sanksi" || nav == undefined) && <DaftarSanksi />}
    { nav == "monitor-sanksi" && <MonitorSanksi />}
  </>
}

const Guru = () => {
  return <>
    <div className="card card-ss px-3 py-3 align-items-center">
      <input
        type="text"
        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
        id="exampleFormControlInput1"
        placeholder="Cari Nama Pelanggaran"
        style={{ width: "100%" }}
        // value={search}
      />
    </div>

    <MonitorSanksi />
  </>
}

const Sanksi = () => {

  const { user } = useUser();

  const router = useRouter();
  const { query: { nav, detail } } = router;

  return (
    <div className="col-md-12 col-lg-9">
      <AnimatePage>
        { user?.role === "admin" && <Admin nav={nav} />}
        { user?.role === "guru" && <Guru />}
      </AnimatePage>
    </div>
  )
}

export default Sanksi