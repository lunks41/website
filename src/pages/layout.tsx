import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TransparentHeader from "@/components/TransparentHeader/TransparentHeader";
import { ParamContext } from "@/contexts/ParamContext";
import { useContext } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isApplicationLoading, isHeaderTransparent } =
    useContext<any>(ParamContext);

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
      <div style={{ padding }}>
        {isHeaderTransparent ? <TransparentHeader /> : <Header />}
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
