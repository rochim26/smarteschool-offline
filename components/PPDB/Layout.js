import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Shared/Header/Header";
import { getProfil } from "../../client/sharedClient";
import useUser from "../../hooks/useUser";
import { ssURL, webURL } from "../../client/clientAxios";
import OperatorHeader from "../Shared/Header/OperatorHeader";
import useSekolah from "../../hooks/useSekolah";
import { meSekolah } from "../../client/SekolahClient";
import useBagian from "../../hooks/useBagian";
import Head from "next/head";
import Help from "../Help/Help";
import HeaderPPDB from "../Shared/Header/HeaderPPDB";
import useTa from "../../hooks/useTa";
import { FaEnvelope, FaFax, FaGlobe, FaPhone } from "react-icons/fa";
import Link from "next/link";

const Layout = ({
  children,
  isFluid,
  modalWrapper,
  isIndex,
  isDashboard,
  isFrontPage = false,
}) => {
  const router = useRouter();
  const { setTa } = useTa();
  const { setUser } = useUser();
  const { setSekolah, sekolah } = useSekolah();

  const getProfilData = async () => {
    const { data, status } = await getProfil();
    if (data && status === 200) {
      setUser(data?.user);

      if (data?.user?.role != "ppdb") {
        router.push(ssURL);
      }

      return setTa(data?.ta);
    }
  };

  const getMeSekolahData = async () => {
    const { data } = await meSekolah();

    if (data) {
      setSekolah(data.sekolah);
    }
  };

  useEffect(() => {
    getMeSekolahData();
    getProfilData();
  }, []);

  return (
    <div className="smartschool-app">
      <Head>
        <link rel="shortcut icon" href={sekolah?.favicon} />
      </Head>
      <HeaderPPDB isFrontPage={isFrontPage} />
      <main
        className={`${isFrontPage && "main-ppdb"} ${
          isIndex ? "bg-light" : "bg-main"
        }`}
      >
        {children}
      </main>
      {modalWrapper}
      {isFrontPage ? (
        <>
          <footer id="footer-ppdb">
            <section className="footer-content pb-4">
              <div className="container text-white">
                <div className="row gy-4">
                  <div className="col-md-3">
                    <h4 className="fw-extrabold mb-4">{sekolah?.nama}</h4>
                    <p
                      className="fs-14-ss dangerous-html text-white"
                      dangerouslySetInnerHTML={{
                        __html: sekolah?.informasi?.visi,
                      }}
                    />
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <h4 className="fw-extrabold mb-4">Tautan Lain</h4>
                    <div className="mb-3">
                      <Link href={webURL}>
                        <a href="#" className="text-white fs-14-ss">
                          Pusat Informasi
                        </a>
                      </Link>
                    </div>
                    <div className="mb-3">
                      <a
                        href={sekolah?.informasi?.virtualTour}
                        className="text-white fs-14-ss"
                      >
                        Jelajah Sekolah
                      </a>
                    </div>
                    <div className="mb-3">
                      <Link href={ssURL}>
                        <a href="#" className="text-white fs-14-ss">
                          Smartschool
                        </a>
                      </Link>
                    </div>
                    <div className="mb-3">
                      <Link href={`${webURL}/profil`}>
                        <a href="#" className="text-white fs-14-ss">
                          Profil Sekolah
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <h4 className="fw-extrabold mb-4">Bantuan</h4>
                    <div className="mb-3">
                      <a
                        href={`tel:${sekolah?.informasi?.telp}`}
                        className="text-white text-decoration-none fs-14-ss"
                      >
                        <FaPhone className="me-2" /> {sekolah?.informasi?.telp}
                      </a>
                    </div>
                    <div className="mb-3">
                      <a
                        href={`tel:${sekolah?.informasi?.fax}`}
                        className="text-white text-decoration-none fs-14-ss"
                      >
                        <FaFax className="me-2" />
                        {sekolah?.informasi?.fax}
                      </a>
                    </div>
                    <div className="mb-3">
                      <a
                        href={`mailto:${sekolah?.informasi?.email}`}
                        className="text-white text-decoration-none fs-14-ss"
                      >
                        <FaEnvelope className="me-2" />{" "}
                        {sekolah?.informasi?.email}
                      </a>
                    </div>
                    <div className="mb-3">
                      <Link href="/">
                        <a
                          href="#"
                          className="text-white text-decoration-none fs-14-ss"
                        >
                          <FaGlobe className="me-2" /> {sekolah?.mainDomain}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h4 className="fw-extrabold mb-4">Lokasi Sekolah</h4>
                    <p className="fs-14-ss">{sekolah?.informasi?.alamat}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-gradient-primary text-white">
              <div className="container py-4 text-center">
                <small>
                  &copy;Smartschool {new Date().getFullYear()}. Hak Cipta
                  Dilindungi oleh undang-undang. | {""}
                  <a
                    href="http://www.getsmartschool.id"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-decoration-none fw-bold text-white"
                  >
                    Powered by Smartschool Indonesia.
                  </a>
                </small>
              </div>
            </section>
          </footer>
        </>
      ) : (
        <>
          {" "}
          <footer className="bg-light">
            <div className="container py-4 text-center">
              <small>
                &copy;Smartschool {new Date().getFullYear()}. Hak Cipta
                Dilindungi oleh undang-undang.
                <br />
                <a
                  href="http://www.getsmartschool.id"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-decoration-none"
                >
                  Powered by Smartschool Indonesia.
                </a>
              </small>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
