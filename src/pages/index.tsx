import type { NextPage } from 'next'
import Head from 'next/head'
import { FetchByTyping } from '../components/templates'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Busca de usuários randômicos</title>
      <meta name="description" content="Busca de usuários aleatórios" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <FetchByTyping />
  </>
)

export default Home
