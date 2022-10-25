import Link  from "next/link";


const LoginForm: React.FC = () => {
  return (
     <div className="container mx-auto md:w-3/5 w-4/5">
      <div className="flex flex-col justify-center items-center my-20 bg-sky-100 rounded-xl">
        <div className="font-mono mt-10 text-center font-bold text-5xl italic text-lime-600 ">Menu Maker</div>
        <input type="text" placeholder="ユーザー名" className=" rounded bg-white-100 h-8 mt-10 mx-5"/>
        <input type="text" placeholder="パスワード" className="rounded bg-white-100  h-8 mt-5 mx-5"/>
        <button className="bg-blue-500 rounded-md font-mono font-medium text-white text-xl h-10 my-5 mx-20 hover:bg-blue-400">ログイン</button>
        <Link href="./signUp">
          <span className="underline mb-5">
          新しいアカウント作成
          </span>
        </Link>
      </div>
      </div>
  )

}

export { LoginForm }