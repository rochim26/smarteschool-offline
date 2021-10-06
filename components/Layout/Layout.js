import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Shared/Header/Header";
import { getProfil } from "../../client/sharedClient";
import useUser from "../../hooks/useUser";
import { ppdbURL, ssURL } from "../../client/clientAxios";
import OperatorHeader from "../Shared/Header/OperatorHeader";
import useSekolah from "../../hooks/useSekolah";
import { meSekolah } from "../../client/SekolahClient";
import useBagian from "../../hooks/useBagian";
import Head from "next/head";
import Help from "../Help/Help";
import useTa from "../../hooks/useTa";
import BottomNavigation from "../Shared/Header/BottomNavigation";

const Layout = ({ children, isFluid, modalWrapper, isIndex, isDashboard }) => {
  return (
    <div className="smartschool-app">
      <Header />
      <main className={isIndex ? "bg-light" : "bg-main"}>
        <div
          className={`${
            isDashboard
              ? "container-fluid py-4 px-xl-5 px-4"
              : isFluid
              ? "container-fluid py-4"
              : "container py-4"
          }`}
        >
          {children}
        </div>
      </main>
      <BottomNavigation />
      {modalWrapper}
      <footer className="bg-light">
        <div className="container py-4 text-center">
          <small>
            &copy;Smarteschool {new Date().getFullYear()}. Hak Cipta Dilindungi
            oleh Undang-undang.
            <br />
            <a
              href="http://www.getsmartschool.id"
              target="_blank"
              rel="noreferrer noopener"
              className="text-decoration-none"
            >
              Powered by Smarteschool.
            </a>
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
