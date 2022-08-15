import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <Head>
        <title>Busca de usuários</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>conteúdo</main>
    </div>
  );
};

export default Home;
