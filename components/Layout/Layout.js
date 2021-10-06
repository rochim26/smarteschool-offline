import BottomNavigation from "../Shared/Header/BottomNavigation";
import Header from "../Shared/Header/Header";

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
