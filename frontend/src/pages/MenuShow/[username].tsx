import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {TableInfo} from "../../components/TableInfo/TableInfo"

interface TableInfo {
  table_num: string,
  password: string,
  qr_url: string
}


const MenuShowPage: NextPage = () => {
  const router = useRouter();
  const [tableinfo, setinfo] = useState<TableInfo[]>([])
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

      // table情報をデータベースから取得し初期化
  }, [])

  const post_tableinfo = async() => {
    const params = new URLSearchParams();
    const response = await axios.post(
      "http://127.0.0.1:8081/save_tableinfo",
      {
        user_name: data?.user?.name,
        table_infos: tableinfo
      }
    )
  }

  const save_table_info = async() => {
    const response = post_tableinfo()

  }

  const add_table = () => {
    setinfo((prev) => {
      prev.push(
        {
          table_num: (prev.length+1).toString(),
          password: Math.random().toString(32).substring(2),
          qr_url: "/MenuTransition/" + (prev.length+1).toString()
        }
      )
      return [...prev]
    })
  }
  const remove_table = () => {
    setinfo((prev) => {
      if(prev.length != 0){
        prev.pop()
      }
      return [...prev]
    })
  }
  return (
    <>
      <div className="text-5xl text-lime-500 w-full text-center mt-5">Table管理</div>
      <div className="flex justify-end">
      <button onClick={save_table_info} className="mt-5 lg:mr-20 mr-5 border border-black rounded-lg p-1">保存する</button>
      </div>
      <table className="table-fixed mt-4 w-5/6 mx-auto border-separate border border-green-500">
        <thead>
          <tr className="lg:text-2xl  md:text-lg text-sm bg-green-300">
            <th className="w-1/6 border border-green-500 p-2">ID</th>
            <th className="w-4/6 border border-green-500">MenuURL</th>
            <th className="w-1/6 border border-green-500">QR</th>
          </tr>
        </thead>
        <tbody>
          {
            tableinfo.map((info) => {
              return (
              <TableInfo key={info.table_num} table_num={info.table_num} dammy_url={"table" + info.table_num} qr_url={info.qr_url} />
              )
            })
          }
        </tbody>
      </table>
      <div className="flex w-1/4 mx-auto">
      <button  onClick={add_table} className="mx-auto text-2xl border px-2 rounded-3xl bg-green-300 mt-3">+</button>
      <button  onClick={remove_table} className="mx-auto text-2xl border px-2 rounded-3xl bg-green-300 mt-3">ー</button>
      </div>
    </>
  )
}

export default MenuShowPage

