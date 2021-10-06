import Link from "next/link"
import { ssURL } from "../../client/clientAxios"

const SidebarJurusan = ({ tab, jurusan }) => {
  return (
    <div className="col-lg-3 positon-relative">
      <ul className="nav side-nav-ss side-nav-ujian bg-white rounded-ss px-3 pt-4 pb-5 flex-column shadow-dark-ss">
        {
          jurusan?.length > 0 && jurusan?.map((data, idx) => (
            <li className="nav-item mb-3" key={idx}>
              <Link href={`${ssURL}/publikasi-jurusan?tab=${data.kode.toLowerCase()}`}>
                <a
                  className={`
                    nav-link color-dark fw-bold fs-18-ss d-flex align-items-center px-4 mb-3
                    ${(tab === data.kode.toLowerCase() || (tab === "" && idx === 0)) ? "active" : ""}
                  `}
                >
                  {data.kode}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SidebarJurusan