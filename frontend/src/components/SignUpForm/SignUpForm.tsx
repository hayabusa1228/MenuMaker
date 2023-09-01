import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SignUpForm: React.FC =  () => {
  const [ NG_input, setfn ] = useState(false);
  const [ NG_register, setfn2] = useState(false); 
  const username_ref = useRef(null);
  const password_ref = useRef(null);
  const router = useRouter();


  const  post_and_register_info = async(username: string, password: string) => {
    const result = await axios
      .post("http://127.0.0.1:8081/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return {
          "status": "NG"
        }
      })
    if(result.status == "OK"){
      // LoginPageへ
        router.push("http://localhost:3000/login")
        setfn2(true)
        clear_input()
    }else{
        setfn2(true)
        clear_input()
    }
  }

  const clear_input = () => {
    (username_ref.current! as HTMLInputElement).value =  "";
    (password_ref.current! as HTMLInputElement).value =  "";
  }

  const checkInput = (username: string, password: string) => {
    // 入力されているか
    if(!username || !password){
        setfn(true)
        clear_input()
        return;
    }
    // Postしてデータベースをチェックする
    post_and_register_info(username, password);
  }

  const ClickHandler = () => {
    const username = (username_ref.current! as HTMLInputElement).value; 
    const password  = (password_ref.current! as HTMLInputElement).value;
    checkInput(username, password)
  }
  return (
    <div className="container mx-auto md:w-3/5 w-4/5">
      <div className="flex flex-col justify-center items-center my-20  border-lime-500 border-2 border-dashed rounded-xl">
        <div className="font-mono mt-10 text-center font-bold text-5xl italic text-lime-600 ">Menu Maker</div>
        <div className="text-xl mt-5">アカウント登録</div>
        {
          NG_input ? (<div className="text-red-500 mt-5">※入力が正しくありません</div>) : null
        }
        {
          NG_register ? (<div className="text-red-500 mt-5">※その名前はすでに使用されています</div>) : null
        }
        <input ref={username_ref} type="text" placeholder="ユーザー名" className=" rounded bg-gray-50 h-8 mt-8 mx-5 border-gray-200 border-2"/>
        <input ref={password_ref} type="text" placeholder="パスワード" className="rounded bg-gray-50  h-8 mt-5 mx-5 border-gray-200 border-2" />
        <button onClick={ClickHandler} className="bg-blue-500 rounded-md font-mono font-medium text-white text-xl h-10 my-5 mx-20 hover:bg-blue-400 p-2">登録</button>
      </div>
      </div>
  )

}

export { SignUpForm }