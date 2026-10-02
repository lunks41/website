import Head from "next/head";
import Home from "./home";

export default function Index() {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=Function.prototype`}
        ></script>
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
}
