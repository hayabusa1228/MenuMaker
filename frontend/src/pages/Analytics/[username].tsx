import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AnalyticsPage: NextPage = () => {
  const router = useRouter();
  const {data, status} = useSession();
  useEffect(() => {
      // ログイン確認
      if (status != "authenticated") {
        router.push("/login");
      }
      
      //本人確認
      if(location.pathname.split("/").pop() != data?.user?.name){
        router.push("/")
      }
  }, [])
  return (
    <>
      This is page for analytics
      
    </>
  )
}

export default AnalyticsPage

