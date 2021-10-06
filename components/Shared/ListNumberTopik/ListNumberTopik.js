import { FaLightbulb, FaLock, FaPlus, FaQuestion } from "react-icons/fa";
import Link from "next/link";
import { ssURL } from "../../../client/clientAxios";

const CircleComponent = ({ topik, index, topikId, user, lastIndex }) => {
  return (
    <div className={`list-number-topik-circle ${index !== 0 ? "mt-50" : ""}`}>
      {user?.role == "siswa" && topik.lock ? (
        <a>
          <span className={`circle bg-secondary fw-bold text-white`}>
            <FaLock />
          </span>
        </a>
      ) : null}

      {user?.role == "guru" || !topik.lock ? (
        <Link href={`${ssURL}/bab/${topik.mBabId}?topik_id=${topik.id}`}>
          <a>
            <span
              className={`circle fw-bold ${
                topikId == topik?.id ? "active" : ""
              }`}
            >
              {topik?.kuis ? <FaQuestion /> : <FaLightbulb />}
            </span>
          </a>
        </Link>
      ) : null}
      {
        (user?.role == "guru" || !lastIndex) && <div className="list-number-topik-stripe"></div>
      }
    </div>
  );
};

const ListNumberTopik = ({
  listTopik,
  handlePostTopikData,
  formData,
  topikId,
  user,
}) => {
  return (
    <div className="list-number-topik-container scrollbar-y-overlay">
      <div className="list-number-topik-header d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center text-white">
          <FaLightbulb />
          <p className="mb-0 fw-bold fs-6">&nbsp; Topik</p>
        </div>
      </div>
      <div className="list-number-topik-content d-flex justify-content-center align-items-center flex-column scrollbar-overlay">
        {listTopik?.length
          ? listTopik?.map((d, index) => (
              <CircleComponent
                user={user}
                topik={d}
                index={index}
                key={index}
                topikId={topikId}
                lastIndex={listTopik?.length - 1 === index}
              />
            ))
          : null}
        {user?.role == "guru" && (
          <div className="dropdown dropdown-ss">
            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className={`
            plus-container
            ${listTopik.length > 0 ? "mt-50" : ""}
            ${listTopik.length > 4 ? "stick-to-bottom" : ""}
          `}
            >
              <FaPlus className="text-white" />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-ss my-1"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    handlePostTopikData({ ...formData, kuis: 0 });
                  }}
                >
                  Topik
                </a>
              </li>
              {/* <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    handlePostTopikData({ ...formData, kuis: 1 });
                  }}
                >
                  Kuis
                </a>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNumberTopik;
