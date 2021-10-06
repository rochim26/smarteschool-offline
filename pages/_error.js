import React from "react";
import AnimatePage from "../components/Shared/AnimatePage/AnimatePage";
import Layout from "../components/Layout/Layout";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { ssURL } from "../client/clientAxios";

function index() {
  return (
    <AnimatePage>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img
            src="/img/lost-connection.png"
            alt="lost-connection"
            className="img-fluid mt-md-0 mt-5"
          />
        </div>
        <div className="col-md-12 text-center">
          <h1 className="color-dark fw-black mb-4 mt-md-4 mt-5">
            Internet kamu hilang
          </h1>
          <p className="fs-5 color-secondary fw-semibold mb-4">
            Klik tombol dibawah untuk mencoba lagi
          </p>
          <div className="text-center d-flex justify-content-center">
            <a
              href="/smartschool"
              className="btn btn-ss p-0 btn-primary-ss shadow-primary-ss rounded-pill d-flex justify-content-center align-items-center fs-18-ss fw-bold"
              style={{ width: "168px" }}
            >
              Coba lagi
            </a>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
}

export default index;
