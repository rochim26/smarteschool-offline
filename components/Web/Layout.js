import Link from "next/link";
import Dropdown from "./Dropdown";
import { elastic as Menu } from "react-burger-menu";
import { FaPhone, FaFax, FaEnvelope } from "react-icons/fa";
import Header from "./Header";
import { meSekolah } from "../../client/SekolahClient";
import useSekolah from "../../hooks/useSekolah";
import { useEffect } from "react";
import { getInformasiJurusan } from "../../client/InformasiJurusanClient";
import useInformasiJurusan from "../../hooks/useInformasiJurusan";
import Head from 'next/head'

const Layout = ({ children }) => {
  const { setInformasiJurusan } = useInformasiJurusan();
  const { setSekolah, sekolah } = useSekolah();

  const getMeSekolahData = async () => {
    const { data } = await meSekolah();

    if (data) {
      setSekolah(data.sekolah);
    }
  };

  const getDetailJurusan = async () => {
    const { data } = await getInformasiJurusan();
    if (data) {
      setInformasiJurusan(data);
    }
  };

  useEffect(() => {
    getMeSekolahData();
    getDetailJurusan();
  }, []);

  return (
    <div className="website-app">
      <Head>
        <link rel="shortcut icon" href={sekolah?.favicon} />
      </Head>
      <Header />
      <main className="pt-0">{children}</main>
      <footer>
        <div className="py-5 text-white footer">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <img src={sekolah?.informasi?.fotoLogo} alt="foto_logo" width={80} />
              </div>
              <div className="col-md-10">
                <h4 className="fw-extrabold">{sekolah?.nama}</h4>
                <div className="row">
                  <div className="col-md-6">{sekolah?.informasi?.alamat}</div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <FaPhone className="me-2" />{" "}
                          {sekolah?.informasi?.telp}
                        </p>
                        <p>
                          <FaFax className="me-2" /> {sekolah?.informasi?.fax}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <FaEnvelope className="me-2" />{" "}
                          {sekolah?.informasi?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 text-center color-dark">
          &copy;{sekolah?.nama}. Powered by{" "}
          <a href="http://www.getsmartschool.id" target="_blank" className="color-primary">
            Smartschool
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
