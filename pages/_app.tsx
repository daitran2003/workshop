import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
 import { theme } from '../src/themes/index'
 import InvestView from "@/views/invests";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
