import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      resetCSS={true}
      theme={extendTheme({ fonts: { body: "Spoqa Han Sans Neo, sans-serif" } })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
