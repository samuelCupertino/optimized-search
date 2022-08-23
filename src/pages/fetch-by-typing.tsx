import type { NextPage } from 'next'
import Head from 'next/head'
import { FetchByTyping } from '../components/templates'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Busca otimizada de usuários</title>
      <meta name="description" content="Busca de usuários de forma otimizada" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <FetchByTyping />
  </>
)

export default Home
