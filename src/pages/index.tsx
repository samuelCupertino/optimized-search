import type { NextPage } from "next";
import Head from "next/head";
import { UserCard, Search } from "../components/molecules";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Busca de usuários randômicos</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Search />
        <UserCard
          avatar="https://i.pravatar.cc/300"
          name="Samuel Cupertino"
          email="samuelcupertino@email.com"
          highlight="samuel"
        />
      </main>
    </>
  );
};

export default Home;
