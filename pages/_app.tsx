import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
 import { theme } from '../src/themes/index'
import MainLayout from "@/layouts";
import { Children } from "react";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";
import store from "@/reduxs/store";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    //value = {system} trong charka v3
    <Provider store = {store}>
    <ChakraProvider value ={theme}> 
      <MainLayout>
      <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
    </Provider>
  )
}
