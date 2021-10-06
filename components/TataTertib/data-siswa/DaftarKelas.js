import { FaUser } from "react-icons/fa";
import AnimatePage from "../../Shared/AnimatePage/AnimatePage"
import Link from "next/link";
import { ssURL } from "../../../client/clientAxios";
import { getRombel } from "../../../client/TataTertibClient";
import { useEffect, useState } from "react";

const DaftarKelas = ({ rombelData=null }) => {

  const [listRombel, setListRombel] = useState([]);

  useEffect(() => {
    if (rombelData !== null) {
      const rombel = {
        X: rombelData?.rombel?.filter(romb => romb?.tingkat === "X"),
        XI: rombelData?.rombel?.filter(romb => romb?.tingkat === "XI"),
        XII: rombelData?.rombel?.filter(romb => romb?.tingkat === "XII")
      }
      setListRombel(rombel);
    }
  }, [rombelData])

  return (
    <AnimatePage>
      <div>
        {
          Object?.keys(listRombel)?.map(keyKelas => {
            return <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="color-dark fw-bold mb-0">Kelas {keyKelas}</h6>
                <hr style={{ width: "90%" }} className="hr-ss" />
              </div>
              <div className="row mt-3">
                { listRombel?.[keyKelas]?.map(rombel => (
                  <div className="col-md-4 mb-4" key={rombel?.id}>
                    <Link href={`${ssURL}/tata-tertib?menu=data-siswa&nav=data&detail=kelas&id=${rombel?.id}`}>
                      <a>
                        <div className="card card-ss px-3 py-4">
                          <h5 className="color-dark fw-bold mb-0">{rombel?.nama}</h5>
                          
                          <div className="d-flex align-items-center mt-2">
                            <FaUser className="color-primary me-2" />
                            <span className="color-primary mb-0 me-1">{rombel?.meta?.total}</span> Siswa
                          </div>

                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          })
        }
      </div>
    </AnimatePage>
  )
}

export default DaftarKelas;