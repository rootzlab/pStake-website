import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/molecules/header";
import * as gtag from "../utils/gtag";
import "../styles/globals.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import AppProvider from "../context/appContext";
import '@persistenceone/interop-widget/style.css';

const App = ({ Component, pageProps }: any) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // @ts-ignore
    document.body.classList! = "";
    document!.getElementById("nav-bar")!.classList.add("navbar-white");
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>pSTAKE Finance | Bitcoin Yields and BTC Liquid Staking</title>
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
          name="viewport"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Bitcoin yields for all, backed by Binance Labs"
        />
        <meta
          name="keywords"
          content="liquid staking, pstake, bitcoin, stkBTC, btc, stkbtc, cosmos, persistence, stkBNB, stkATOM"
        />
      </Head>
      <Header />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
};

export default App;
