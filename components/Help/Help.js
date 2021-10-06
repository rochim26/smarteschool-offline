import { useState } from "react";
import { FaQuestion, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import useJoyride from "../../hooks/useJoyride";
import useUser from "../../hooks/useUser";

const Help = ({ isAuth = false }) => {
  const [isDropupOpen, setIsDropupOpen] = useState(false);
  const { joyrideConfig, setJoyrideConfig } = useJoyride();

  const router = useRouter();
  const { user } = useUser();
  const handleClick = () => {
    setIsDropupOpen(false);
    setJoyrideConfig({ ...joyrideConfig, [router.pathname]: false });
  };

  return (
    <>
      <span
        className={`${
          isAuth ? "circle-auth" : "circle"
        } shadow-primary-ss pointer position-fixed circle-help`}
        onClick={() => setIsDropupOpen(!isDropupOpen)}
        style={{ bottom: "3%", right: "3%", zIndex: "100" }}
      >
        {isDropupOpen ? <FaTimes /> : <FaQuestion />}
      </span>
      {isDropupOpen && (
        <div
          className="card card-ss position-fixed px-0 py-2"
          style={{ bottom: "11%", right: "3%" }}
        >
          <div className="card-body p-0">
            {user?.role == "guru" && (
              <>
                <a
                  href="https://www.youtube.com/watch?v=IdWB09vXlTo"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Import Soal Via Excel
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=bRJX1oId71w"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Menambahkan Jadwal Ujian
                  </div>
                </a>
                <a
                  href="https://youtu.be/kTUF_xiRm3k"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Menambahkan Tugas
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=GpVnxwKEYbQ"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Membuat Pertemuan Kelas
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=6IVvmDMck_4"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Absen Harian
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=YxEQUeXVxr4"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Membuat Materi
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=2C-1QeOcmBk"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Membuat Tugas
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=xidNt4ILVT8"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Membuat Bank Soal
                  </div>
                </a>
              </>
            )}

            {user?.role == "siswa" && (
              <>
                <a
                  href="https://youtu.be/qvVtrQOy2Fg"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Membaca Materi
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Njh6HUZ9Eg0"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Menghadiri Pertemuan
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=jQMLpn2EnHE"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <div className="help-items pointer px-4 py-3 fs-14-ss fw-bold color-secondary">
                    Tutorial Mengerjakan Ujian
                  </div>
                </a>
              </>
            )}

            <div
              onClick={handleClick}
              className="help-items pointer px-4 py-3 fs-14-ss fw-bold"
            >
              Ulangi Asisten Tutorial
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Help;
