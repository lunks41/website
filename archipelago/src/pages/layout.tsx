import React, { useState, useEffect, useContext } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TransparentHeader from "@/components/TransparentHeader/TransparentHeader";
import SEO from "@/components/SEO/SEO";
import { ParamContext } from "@/contexts/ParamContext";
import type { DynamicSeoProps } from "@/contants/seo";

export default function RootLayout({
  children,
  seo,
}: {
  children: React.ReactNode;
  seo?: DynamicSeoProps;
}) {
  const { isHeaderTransparent } = useContext<any>(ParamContext);

  const [padding, setPadding] = useState("0");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 2000) {
        setPadding("0 15rem");
      } else {
        setPadding("0");
      }
    };

    // Set initial padding
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <SEO {...seo} />
      <div style={{ padding }}>
        {isHeaderTransparent ? <TransparentHeader /> : <Header />}
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
