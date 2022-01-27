import '@fontsource/poppins';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { StyledEngineProvider } from '@mui/material';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ChakraProvider theme={theme}>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </ChakraProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
