import type { NextPage } from 'next'
import Head from 'next/head'
import { OptimisticUIIndependent } from '@/src/components/templates/OptimisticUI/Independent'

const OptimisticUIIndependentPage: NextPage = () => (
  <>
    <Head>
      <title>Interface otimista para criação de usuários</title>
      <meta
        name="description"
        content="Criação de usuários em uma interface otimista"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <OptimisticUIIndependent />
  </>
)

export default OptimisticUIIndependentPage
