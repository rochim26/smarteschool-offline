import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

const HeaderDetail = ({ title, backProps = false }) => {
  const router = useRouter();

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg bg-gradient-primary position-fixed w-100 p-4 position-fixed">
        <div className="container-fluid px-lg-5 px-4 justify-content-center">
          {backProps && (
            <a
              onClick={() => router.push(backProps)}
              className="me-auto text-white p-sm-0  p-2"
            >
              <FaChevronLeft />
            </a>
          )}
          {!backProps && (
            <a
              onClick={() => router.back()}
              className="me-auto text-white p-sm-0  p-2"
            >
              <FaChevronLeft />
            </a>
          )}

          <h3 className="me-auto mb-0 text-white fw-extrabold p-sm-0 p-2">
            {title}
          </h3>
        </div>
      </nav>
    </header>
  );
};

export default HeaderDetail;
