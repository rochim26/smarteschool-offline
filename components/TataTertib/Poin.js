import { useRouter } from "next/router";
import { ssURL } from "../../client/clientAxios";
import AnimatePage from "../Shared/AnimatePage/AnimatePage"
import Navbar from "../Shared/Navbar/Navbar";
import Pelanggaran from "./Pelanggaran";
import PelanggaranDetail from "./PelanggaranDetail";
import Penghargaan from "./Penghargaan";

const Poin = () => {

  const router = useRouter();
  const { query: { nav, detail } } = router;

  const navItems = [
    {
      url: `${ssURL}/tata-tertib?menu=poin&nav=penghargaan`,
      text: "Penghargaan",
      active: nav == "penghargaan" || nav == undefined,
    },
    {
      url: `${ssURL}/tata-tertib?menu=poin&nav=pelanggaran`,
      text: "Pelanggaran",
      active: nav == "pelanggaran",
    },
  ];

  return (
    <div className="col-md-12 col-lg-9">
      <AnimatePage>
        <Navbar
          nav={navItems}
        />

        { (nav == "penghargaan" || nav == undefined) && <Penghargaan />}
        { (nav == "pelanggaran" && !detail) && <Pelanggaran />}

        { (nav == "pelanggaran" && detail) && <PelanggaranDetail />}
      </AnimatePage>
    </div>
  )
}

export default Poin