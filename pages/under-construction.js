import React from "react";
import AnimatePage from "../components/Shared/AnimatePage/AnimatePage";
import Layout from "../components/Layout/Layout";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { ssURL } from "../client/clientAxios";

function index() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Layout>
      <AnimatePage>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img
              src="/img/under-construction-illustration.png"
              alt="under-construction"
              className="img-fluid mt-md-0 mt-5"
            />
          </div>
          <div className="col-md-12 text-center">
            <h1 className="color-dark fw-black mb-4 mt-md-4 mt-5">
              Otw sekolah digital
            </h1>
            <p className="fs-5 color-secondary fw-semibold mb-4">
              Sabar yaa, kami sedang menyiapkan sesuatu yang spesial untuk {""}
              {user?.role == "siswa" ? "kamu" : "anda"}
            </p>
            {/* <div className="text-center d-flex justify-content-center">
              <Link href={`${ssURL}`}>
                <a
                  className="btn btn-ss p-0 btn-primary-ss shadow-primary-ss rounded-pill d-flex justify-content-center align-items-center fs-18-ss fw-bold"
                  style={{ width: "168px" }}
                >
                  Kembali
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </AnimatePage>
    </Layout>
  );
}

export default index;
