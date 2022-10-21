import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider} from 'react-query'
import { queryClient } from '../services/queryClient'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp
