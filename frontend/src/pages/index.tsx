import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FucntionOption } from "../components/FunctionOption/FunctionOption";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const username = data?.user?.name;

  useEffect(() => {
    // ログイン確認
    if (status != "authenticated") {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className=" text-lime-600 text-4xl my-8 mx-5">My Page</div>
      <div className="md:grid grid-cols-2  grid-flow-row gap-4 justify-items-center my-10 justify-center">
        <FucntionOption
          href={"/MenuMake/" + username}
          text="Menu作成"
          bgColor="palegreen"
          textColor="green"
        />
        <FucntionOption
          href={"/MenuShow/" + username}
          text="Menu表示"
          bgColor="palegreen"
          textColor="green"
        />
        <FucntionOption
          href={"/BillManagement/" + username}
          text="お会計管理"
          bgColor="palegreen"
          textColor="green"
        />
        <FucntionOption
          href={"/Analytics/" + username}
          text="売上分析"
          bgColor="palegreen"
          textColor="green"
        />
      </div>
    </>
  );
};

export default Home;
