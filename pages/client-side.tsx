import Head from 'next/head'

import ClientOnly from '../components/ClientOnly'
import Countries from '../components/Countries'

export default function ClientSide(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome!</h1>
        <ClientOnly>
          <Countries />
        </ClientOnly>
      </main>
    </div>
  )
}
