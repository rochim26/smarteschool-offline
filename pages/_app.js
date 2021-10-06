import "antd/dist/antd.css";
import "../styles/globals.scss";
import "../styles/scrollbar.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/styles.css";
import "react-awesome-slider/dist/styles.css";
import "keen-slider/keen-slider.min.css";
import "react-circular-progressbar/dist/styles.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "react-image-lightbox/style.css";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";

// import your default seo configuration
import SEO from "../next-seo.config";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        ></link>

        {/* Font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>

        <script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

        <link
          href="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.js"></script>
      </Head>
      <DefaultSeo {...SEO} />
      <AnimatePresence exitBeforeEnter>
        <NextNprogress
          color="#96DAFF"
          startPosition={0.3}
          stopDelayMs={200}
          height="4"
        />
        <Component {...pageProps} />
      </AnimatePresence>
      <ToastContainer />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default MyApp;
