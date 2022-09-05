import type { NextPage } from 'next'
import Head from 'next/head'
import { OptimisticUI } from '../components/templates'

const OptimisticUIPage: NextPage = () => (
  <>
    <Head>
      <title>Interface otimista para criação de usuários</title>
      <meta
        name="description"
        content="Criação de usuários em uma interface otimista"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <OptimisticUI />
  </>
)

export default OptimisticUIPage
