import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ssURL } from "../../client/clientAxios";
import { meSekolah } from "../../client/SekolahClient";
import { getProfil } from "../../client/sharedClient";
import useSekolah from "../../hooks/useSekolah";
import Head from "next/head";
import Help from "../Help/Help";

const AuthLayout = ({ children }) => {
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
    <div className="auth-layout bg-primary bg-gradient py-5">
      <Head>
        <link rel="shortcut icon" href={sekolah?.favicon} />
      </Head>
      <div className="container">
        <div className="card rounded-ss">
          <div className="card-body p-5">
            {children}
            <div className="text-center mt-5">
              {sekolah?.id == 5 ? (
                <>
                  &copy;Smarteschool 2020. Hak Cipta Dilindungi oleh
                  Undang-undang.
                </>
              ) : (
                <>
                  &copy;Smartschool {new Date().getFullYear()}. Hak Cipta
                  Dilindungi oleh Undang-undang.
                </>
              )}

              <br />
              <a
                href={`${
                  sekolah?.id == 5
                    ? "http://getsmartschool.id/"
                    : "http://www.getsmartschool.id"
                }`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-decoration-none"
              >
                {" "}
                {sekolah?.id == 5
                  ? "Powered by Smartschool"
                  : "Powered by Smart School."}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Help isAuth />
    </div>
  );
};

export default AuthLayout;
