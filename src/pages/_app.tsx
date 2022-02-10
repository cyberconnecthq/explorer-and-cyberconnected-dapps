import '@fontsource/poppins';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
