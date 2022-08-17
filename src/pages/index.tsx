import type { NextPage } from "next";
import Head from "next/head";
import { HomeScreen } from "../components/templates";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Busca de usuários randômicos</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomeScreen />
      </main>
    </>
  );
};

export default Home;
