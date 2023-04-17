import type { AppProps } from "next/app";
import "../index.css";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="addax" content="1 2 3 5 8" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
