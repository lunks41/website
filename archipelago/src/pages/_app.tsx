import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

import AuthContextProvider from "@/contexts/AuthContext";
import CartContextProvider from "@/contexts/CartContext";
import PhotoContextProvider from "@/contexts/PhotoContext";
import ParamContextProvider from "@/contexts/ParamContext";
import Fonts from "@/components/Fonts/Fonts";
import ToTop from "@/components/ToTop/ToTop";

import "@/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/pages/layout";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <AuthContextProvider>
        <ParamContextProvider>
          <CartContextProvider>
            <PhotoContextProvider>
              <Fonts />
              <Layout seo={pageProps.seo}>
                <Component {...pageProps} />
              </Layout>
              <ToTop />
              <ToastContainer autoClose={2500} theme="colored" />
            </PhotoContextProvider>
          </CartContextProvider>
        </ParamContextProvider>
      </AuthContextProvider>
    </I18nextProvider>
  );
};

export default MyApp;
