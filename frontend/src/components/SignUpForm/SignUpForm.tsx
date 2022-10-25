const SignUpForm: React.FC =  () => {
  return (
    <div className="container mx-auto md:w-3/5 w-4/5">
      <div className="flex flex-col justify-center items-center my-20  border-lime-500 border-2 border-dashed rounded-xl">
        <div className="font-mono mt-10 text-center font-bold text-5xl italic text-lime-600 ">Menu Maker</div>
        <div className="text-xl mt-5">アカウント登録</div>
        <input type="text" placeholder="ユーザー名" className=" rounded bg-gray-50 h-8 mt-10 mx-5 border-gray-200 border-2"/>
        <input type="text" placeholder="パスワード" className="rounded bg-gray-50  h-8 mt-5 mx-5 border-gray-200 border-2" />
        <button className="bg-blue-500 rounded-md font-mono font-medium text-white text-xl h-10 my-5 mx-20 hover:bg-blue-400 p-2">登録</button>
      </div>
      </div>
  )

}

export { SignUpForm }