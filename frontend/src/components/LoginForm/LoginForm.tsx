import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/router";


const LoginForm: React.FC<{csrfToken: string}> = ({ csrfToken}) => {
  const [NG_input, setfn] = useState(false);
  const [OK_login, setLogin] = useState(false);
  const username_ref = useRef(null);
  const password_ref = useRef(null);
  const router = useRouter();
  const {data, status} = useSession();

  useEffect(() => {
    if(status == "authenticated"){
      router.push("/")
    }
  },[status])

  const clear_input = () => {
    (username_ref.current! as HTMLInputElement).value = "";
    (password_ref.current! as HTMLInputElement).value = "";
  };

  const checkInput = async (username: string, password: string) => {
    // 入力されているか
    if (!username || !password) {
      setfn(true);
      clear_input();
      return;
    }

    await signIn<any>("credentials", {
      redirect: false,
      username: username,
      password: password,
      callbackUrl: `${window.location.origin}`,
    })
      .then((res) => {
        setLogin(true)
        setfn(true)
        clear_input()
      })
      .catch((err) => {
        // console.log("err:", err);
    });
  };

  const SubmitHandler = (e: any) => {
    e.preventDefault();
    const username = (username_ref.current! as HTMLInputElement).value;
    const password = (password_ref.current! as HTMLInputElement).value;
    checkInput(username, password);
  };

  return (
    <div className="container mx-auto md:w-3/5 w-4/5">
      <div className="flex flex-col justify-center items-center my-20 border-lime-500 border-2 border-dashed rounded-xl">
        <div className="font-mono mt-10 text-center font-bold text-5xl italic text-lime-600 ">
          Menu Maker
        </div>
        {NG_input ? (
          <div className="text-red-500 mt-5">※入力が正しくありません</div>
        ) : null}
        <form className="text-center flex flex-col" onSubmit={SubmitHandler}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            ref={username_ref}
            type="text"
            placeholder="ユーザー名"
            className=" rounded bg-gray-50 h-8 mt-8 mx-5 border-gray-200 border-2"
          />
          <input
            ref={password_ref}
            type="password"
            placeholder="パスワード"
            className="rounded bg-gray-50  h-8 mt-5 mx-5 border-gray-200 border-2"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-md font-mono font-medium text-white text-xl h-10 my-5 mx-20 hover:bg-blue-400"
          >
            ログイン
          </button>
        </form>
        <Link href="./register">
          <span className="underline mb-5">新しいアカウント作成</span>
        </Link>
      </div>
    </div>
  );
};

export { LoginForm };

