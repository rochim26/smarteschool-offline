import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { adminURL } from "../../client/clientAxios";

const AdminAuthLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("ss-token")) {
      router.push(adminURL);
    }
  }, []);

  return (
    <div className="auth-layout bg-primary bg-gradient py-5">
      <div className="container">
        <div className="card">
          <div className="card-body p-5">
            {children}
            <div className="text-center mt-5">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthLayout;
