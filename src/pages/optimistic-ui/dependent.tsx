import type { NextPage } from 'next'
import Head from 'next/head'
import { OptimisticUIDependent } from '@/src/components/templates/OptimisticUI/Dependent'

const OptimisticUIDependentPage: NextPage = () => (
  <>
    <Head>
      <title>Interface otimista para criação de usuários</title>
      <meta
        name="description"
        content="Criação de usuários em uma interface otimista"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <OptimisticUIDependent />
  </>
)

export default OptimisticUIDependentPage
