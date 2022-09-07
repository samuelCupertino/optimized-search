import type { NextPage } from 'next'
import Head from 'next/head'
import { OptimisticUIUseCase } from '@/src/components/templates/OptimisticUI/UseCase'

const OptimisticUIUseCasePage: NextPage = () => (
  <>
    <Head>
      <title>Interface otimista para criação de usuários</title>
      <meta
        name="description"
        content="Criação de usuários em uma interface otimista"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <OptimisticUIUseCase />
  </>
)

export default OptimisticUIUseCasePage
