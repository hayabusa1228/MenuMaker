import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// credentials の情報から、ログイン可能か判定してユーザー情報を返す関数


const post_and_check_info = async(username: string, password: string) => {
  const result = await axios
    .post("http://127.0.0.1:8081/login", {
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
    return result
  }

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "login",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "UserName",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // データベースへpost
        // console.log(credentials)
        const res = await post_and_check_info(
          credentials!.username,
          credentials!.password
        )

        if (res.status === "OK") {
          const loginInfo = {
            name: credentials!.username,
          };   
          return loginInfo
        }
        return null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  // サインイン・サインアウトで飛ぶカスタムログインページを指定
  // サインアウト時に、”Are you sure you want to sign out?”と聞かれるページを挟むのをスキップする
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});