import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import {useRouter} from "next/router"

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  // const router = useRouter();
  // useEffect(() => {
  //   if(!session){
  //     router.push("/login");
  //   }
  // },[]);

  
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
