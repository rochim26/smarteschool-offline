import { FaTrashAlt } from "react-icons/fa";
import { baseURL } from "../../../client/clientAxios";
import useUser from "../../../hooks/useUser";
import moment from "moment";
import Avatar from "../Avatar/Avatar";

const KomenTimeline = ({
  idx = null,
  totalKomen = 0,
  komen = "",
  userObj = {},
  createdAt = "",
  userId = null,
  komenId = null,
  onClickDelete = () => {},
}) => {
  const { user } = useUser();
  const userComment = user?.id === userId ? "Anda" : userObj?.nama;

  return (
    <div className="row">
      {idx === 0 && (
        <div className="col-md-12">
          <h6 className="fs-18-ss fw-bold color-dark">
            Komentar ({totalKomen})
          </h6>
        </div>
      )}
      <div className="row mt-3 komen-timeline">
        <div className="col-md-12">
          <div className="comment-items d-flex">
            <div className="ava me-3">
              <Avatar name={userObj?.nama} src={userObj?.Avatar} />
            </div>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="comment-content">
                <p className="fw-14-ss fw-bold color-dark mb-2">
                  {userComment}
                </p>
                <p className="fw-14-ss color-secondary mb-2">{komen}</p>
                <div className="">
                  <span className="color-secondary fw-semibold fs-12-ss">
                    {moment(createdAt).fromNow()}
                  </span>
                </div>
              </div>
              {user.id == userId && komenId && (
                <button
                  className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 icon-trash-komen-timeline"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => onClickDelete(komenId)}
                >
                  <FaTrashAlt className="color-secondary" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomenTimeline;
