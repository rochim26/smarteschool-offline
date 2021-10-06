import React from "react";
import { getDetailUser } from "../../client/UserClient";
import { useState, useEffect } from "react";
import moment from "moment";

const CardLiveAbsen = ({ data }) => {
  const [name, setName] = useState("");

  const user = async () => {
    const user = await getDetailUser(data.data.user_id);
    if (user.data) {
      setName(user.data.user.nama);
    }
  };

  useEffect(() => {
    user();
  }, []);
  return (
    <div className="col-lg-4 col-md-6 mb-2">
      <div className="card card-ss p-3">
        <img src={data.data.image} alt="" className="card-img-top" />
        <div className="card-body">
          <table className="w-100">
            <tbody>
              <tr>
                <td>
                  <div className="mb-2 fw-bold color-dark">Nama</div>
                </td>
                <td style={{ width: "65%" }}>
                  <div className="mb-2 color-dark">: {name}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="mb-2 fw-bold color-dark">Mesin</div>
                </td>
                <td style={{ width: "65%" }}>
                  <div className="mb-2 color-dark">
                    :{" "}
                    {data.data.camera.substr(0, 5) +
                      "..." +
                      data.data.camera.substr(-5)}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="mb-2 fw-bold color-dark">Tanggal</div>
                </td>
                <td style={{ width: "65%" }}>
                  <div className="mb-2 color-dark">
                    :{" "}
                    {moment(data.data.created_at.seconds * 1000)
                      .locale("ID")
                      .format("dddd, D MMMM YYYY")}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="mb-2 fw-bold color-dark">Timestamp</div>
                </td>
                <td style={{ width: "65%" }}>
                  <div className="mb-2 color-dark">
                    :{" "}
                    {moment(data.data.created_at.seconds * 1000).format(
                      "HH:mm:ss"
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardLiveAbsen;
