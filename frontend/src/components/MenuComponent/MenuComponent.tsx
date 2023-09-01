import axios from "axios";
import Image from "next/image"
import React from "react";

import { MenuImage } from "../../components/MenuImage/MenuImage"



interface Menu {
  category: string;
  contents: {
    name : string;
    image : string;
    price : string;
  }[]
}

interface MenuComponentProp {
  name : string;
  image : string;
  price : string;
  setMenu: any
  current_category: string
}

const MenuComponent: React.FC<MenuComponentProp> = ({name, image, price, setMenu, current_category}) => {
  const RemoveComponentHandler = async() => {
    setMenu((prev: Menu[]) => {
      let newResult = prev.filter((menu) => menu.category == current_category)[0].contents.filter((content) => content.name != name);
      prev.filter((menu) => menu.category == current_category)[0].contents = newResult
      return [...prev]
    })

    // サーバーの画像を削除する
    const response = await axios.get("http://127.0.0.1:8081/remove_image", {
      params: {
        filepath: image
      }
    })

  }
  return (
  <div className="border-2  border-dashed  border-lime-500 ">
    <button className="w-full text-2xl" onClick={RemoveComponentHandler}>×</button>
  <div className="h-3/5  w-full">
    <MenuImage image={image}/>
    <br></br>
    <div className="text-center h10 text-2xl mt-3">
      {name}
    </div>
    <div className="text-center text-sm">
      {price}円(税込)
    </div>
    <br></br>
    <br></br>
    <br></br>
  </div>
  </div>
  );
};

export { MenuComponent };
