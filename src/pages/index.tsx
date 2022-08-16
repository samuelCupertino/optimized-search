import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <Head>
        <title>Busca de usuários</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main> conteúdo </main>
    </div>
  );
};

export default Home;
