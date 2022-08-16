import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { UserCard } from "../components/molecules";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Busca de usuários</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UserCard
          avatar="https://i.pravatar.cc/300"
          name="Samuel Cupertino"
          email="samuelcupertino@email.com"
        />
      </main>
    </>
  );
};

export default Home;
