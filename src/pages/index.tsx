import type { NextPage } from "next";
import Head from "next/head";
import { Search } from "../components/molecules";
import { ListOfUserCard } from "../components/organisms";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Busca de usuários randômicos</title>
        <meta name="description" content="Busca de usuários aleatórios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Search value={"ola"} onChange={() => {}} />
        <ListOfUserCard
          data={[
            {
              id: 1,
              avatar: "https://i.pravatar.cc/300",
              name: "João",
              email: "joao@email.com",
            },
            {
              id: 2,
              avatar: "https://i.pravatar.cc/300",
              name: "João",
              email: "joao@email.com",
            },
          ]}
        />
      </main>
    </>
  );
};

export default Home;
