import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";

const MenuTransitionPage : NextPage = () => {
  // QRコードで表示する画面
  const password_ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // cookieからpasswordが取得できればそれを用いてpost=> OKならmenupageへ
    // post_password(document.cookie.password)

  },[])


  const post_password = async(value: string) => {
    const params = new URLSearchParams()
    params.append("id",location.pathname.split("/")[2])
    params.append("password",value)
    const result = await axios.post(
      "http://127.0.0.1:8081/check_menu_password",
      params,
    ).then((res) => {
      return res.data
    }).catch((err) => {
      return {
        status: "NG"
      }
    })

    return result
  }

  const ClickHandler = async() => {
    const value = (password_ref.current as HTMLInputElement).value;
    const response = await post_password(value)
    let expire = new Date();
    expire.setDate(expire.getDate() + 1)
    console.log(response)
    if(response.status == "OK"){
      // passwordを保存
      document.cookie = `menuPassword=${value}; expires=${expire.toUTCString()};`   
    }
  }
  
  return (
    <>
      <div className="container mx-auto md:w-3/5 w-4/5">
      <div className="flex flex-col justify-center items-center my-20  border-lime-500 border-2 border-dashed rounded-xl">
        <div className="text-xl mt-5">パスワードを入力してください</div>

        <input ref={password_ref} type="text" placeholder="パスワード" className="rounded bg-gray-50  h-8 mt-5 mx-5 border-gray-200 border-2" />
        <button onClick={ClickHandler} className="bg-blue-500 rounded-md font-mono font-medium text-white text-xl h-10 my-5 mx-20 hover:bg-blue-400 p-2">ログイン</button>
      </div>
      </div>

    </>
  )

}


export default MenuTransitionPage