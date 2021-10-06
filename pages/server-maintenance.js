import AnimatePage from "../components/Shared/AnimatePage/AnimatePage";

function index() {
  return (
    <>
      <AnimatePage>
        <main className="bg-light">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <img
                  src="/img/server-maintenance.png"
                  alt="server-maintenance"
                  className="img-fluid mt-md-0 mt-5"
                />
              </div>
              <div className="col-md-12 text-center">
                <h1 className="color-dark fw-black mb-4 mt-md-4 mt-5">
                  Server sedang diupdate
                </h1>
                <p className="fs-5 color-secondary fw-semibold mb-4">
                  Tunggu sebentar yaa, sistem sedang kita pelihara untuk
                  kenyamanan kita bersama
                </p>
                {/* <div className="text-center d-flex justify-content-center">
              <a
                className="btn btn-ss p-0 btn-primary-ss shadow-primary-ss rounded-pill d-flex justify-content-center align-items-center fs-18-ss fw-bold"
                style={{ width: "168px" }}
              >
                Coba lagi
              </a>
            </div> */}
              </div>
            </div>
          </div>
        </main>
      </AnimatePage>
      <footer className="bg-light">
        <div className="container py-4 text-center">
          <small>
            &copy;Smartschool {new Date().getFullYear()}. Hak Cipta Dilindungi
            oleh Undang-undang.
            <br />
            <a
              href="http://www.getsmartschool.id"
              target="_blank"
              rel="noreferrer noopener"
              className="text-decoration-none"
            >
              Powered by Smart School.
            </a>
          </small>
        </div>
      </footer>
    </>
  );
}

export default index;
