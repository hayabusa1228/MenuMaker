import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { ShopNameInput } from "../../components/ShopNameInput/ShopNameInput";
import { CategoryInput } from "../../components/CategoryInput/CategoryInput";
import { MenuComponent } from "../../components/MenuComponent/MenuComponent";
import { MenuComponentForm } from "../../components/MenuComponentForm/MenuComponentForm";
import axios from "axios";

interface Menu {
  category: string;
  contents: {
    name : string;
    image : string;
    price : string;
  }[]
}



const MenuMakePage: NextPage = () => {
  const router = useRouter();
  const [current_category, set_current_category] = useState<string>("")
  const [shop_name, setShopName] = useState<string>("ShopName")
  const [menues, setMenu] = useState<Menu[]>([]);
  const save_button_ref = useRef<HTMLButtonElement>(null)
  const { data, status } = useSession();

  const save_design_info = async() => {
    const result = await axios
    .post("http://127.0.0.1:8081/save_design", {
      user_name: data?.user?.name || "",
      shop_name: shop_name,
      menues: menues
    })
    .then((res) => {
       if(res.data.status == "OK"){
        (save_button_ref.current as HTMLButtonElement).textContent = "保存完了"
       }else{
        (save_button_ref.current as HTMLButtonElement).textContent = "保存失敗"
       }
       setTimeout(() => {
        (save_button_ref.current as HTMLButtonElement).textContent = "保存する"
        }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const getInitialvalue = async() => {
    const params = new URLSearchParams();
    params.append("username", (data?.user?.name)!)
    const result = await axios
    .post("http://127.0.0.1:8081/get_design", params)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
       return {
        status: "NG"
       }
    })
    console.log(result)

    return result
  }

  const getInitialMenu = (data: any) => {
    const menu = data?.menu?.map((menu: any) => {
      const category =  menu.Category
      const contents = menu.Content.map((content: any) => {
        return {
          name: content.name,
          image: content.image,
          price: content.price
        }
      }
      )
      return {
        category: category,
        contents: contents
      } 
    }) || ""
    return menu
  }

  useEffect(() => {
    // ログイン確認
    if (status != "authenticated") {
      router.push("/login");
    }
    //本人確認
    if (location.pathname.split("/").pop() != data?.user?.name) {
      router.push("/");
    }

    // 初期値取得
    (async() => {
      const data = await getInitialvalue()
      if(data.status == "OK"){
        // 店名の初期化
        setShopName((prev) => data.shopName)
        // メニューの初期化
        const menu = getInitialMenu(data) 
        if(menu != ""){
          setMenu((prev) => menu)
        }
      }
    })()
  }, []);


  return (
    <>
    <ShopNameInput shop_name={shop_name} setShopName={setShopName}/>
    <div className="flex justify-end mr-5">
    <button onClick={save_design_info} ref={save_button_ref} className="md:text-xl border border-black p-1 rounded-md text-sm">保存する</button>
    </div>
    <CategoryInput menues={menues} setMenu={setMenu} set_current_category={set_current_category}/>
    <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2  grid-auto-flow mt-5 mx-5 gap-4">
      <>
      {
        
        menues.filter((menu) => menu.category == current_category).map((menu) => {
          if(!menu.contents){
            return
          }
          return menu.contents.map((content) => {
            return (
            <MenuComponent key={content.name} name={content.name} image={content.image} price={content.price} setMenu={setMenu} current_category={current_category}/>
            )
          })
        })
      }
    {
        current_category ? (
        <MenuComponentForm setMenu={setMenu} current_category={current_category}/> 
        ): ""
    }
    </>
    </div>

    </>
  );
};

export default MenuMakePage;
