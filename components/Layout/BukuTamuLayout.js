import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ssURL } from "../../client/clientAxios";
import { meSekolah } from "../../client/SekolahClient";
import { getProfil } from "../../client/sharedClient";
import useSekolah from "../../hooks/useSekolah";
import Head from "next/head";
import Help from "../Help/Help";

const BukuTamuLayout = ({ children }) => {
  const [meSekolahData, setMeSekolahData] = useState({});
  const { sekolah } = meSekolahData;

  const getMeSekolahData = async () => {
    const { data } = await meSekolah();

    if (data) {
      setMeSekolahData(data);
    }
  };

  useEffect(() => {
    getMeSekolahData();
  }, []);
  return (
    <>
      <div className="buku-tamu-layout py-5">
        <Head>
          <link rel="shortcut icon" href={sekolah?.favicon} />
        </Head>
        <div className="container">
          <div
            className="p-4 rounded-ss"
            style={{
              background: "rgba(255,255,255,.15)",
            }}
          >
            <div className="card card-ss container rounded-ss">
              <div className="bg-light">
                <div className="row justify-content-between">{children}</div>
              </div>
            </div>
          </div>
        </div>

        <Help isAuth />
      </div>
      <section className="bg-gradient-primary text-white">
        <div className="container py-4 text-center">
          <small>
            &copy;Smartschool {new Date().getFullYear()}. Hak Cipta Dilindungi
            oleh undang-undang. | {""}
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
      </section>{" "}
    </>
  );
};

export default BukuTamuLayout;
