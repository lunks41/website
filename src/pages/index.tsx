import Head from "next/head";
import Home from "./home";

export default function Index() {
  return (
    <>
      <Head>
        <title>Archipelago.ae</title>
        <meta
          name="description"
          content="Archipelago Middle East Shipping LLC"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/brand-icon.ico" />

        <meta property="og:title" content="Archipelago.ae" />
        <meta
          property="og:description"
          content="Archipelago Middle East Shipping LLC"
        />
        <meta property="og:image" content="/brand-image.jpg" />
        <meta
          property="og:url"
          content="https://archipelago.ae/"
        />
        <meta property="og:type" content="website" />

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
