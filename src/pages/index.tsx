import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Text } from "../components/atoms/Text";

const Home: NextPage = () => {
  return (
    <div>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <Head>
        <title>Busca de usuários</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        conteúdo
        <Text>conteúdo</Text>
      </main>
    </div>
  );
};

export default Home;
