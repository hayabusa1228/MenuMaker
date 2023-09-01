import Image from "next/image";
import React, { useRef, useState } from "react";

import { MenuImageInput } from "../MenuImageInput/MenuImageInput";

interface Menu {
  category: string;
  contents: {
    name: string;
    image: string;
    price: string;
  }[];
}

interface MenuComponentFormProp {
  current_category: string;
  setMenu: any;
}

const MenuComponentForm: React.FC<MenuComponentFormProp> = ({
  setMenu,
  current_category,
}) => {
  const name_input_ref = useRef<HTMLTextAreaElement>(null);
  const price_input_ref = useRef<HTMLInputElement>(null);
  const [image_path, setImagePath] = useState<string>("");
  const ClickHandler = () => {
    const name = (name_input_ref.current as HTMLTextAreaElement).value;
    const price = (price_input_ref.current as HTMLInputElement).value;
    if (!name || !price || !image_path) {
      return;
    }
    setMenu((prev: Menu[]) => {
      let prevContents = prev.filter(
        (menu) => menu.category == current_category
      )[0].contents;
      // データを追加
      prevContents.push({
        name: name,
        image: image_path,
        price: price,
      });

      // 入力をクリア
      (name_input_ref.current as HTMLTextAreaElement).value = "";
      (price_input_ref.current as HTMLInputElement).value = "";
      setImagePath("")

      return [...prev];
    });
  };
  return (
    <div className="border-2 border-dashed border-lime-500">
      <button className="w-full text-2xl" onClick={ClickHandler}>
        ＋
      </button>
      <div className="h-2/5 w-full mt-3">
        <MenuImageInput current_category={current_category} image_path={image_path} setImagePath={setImagePath}/>
        <br></br>
        <br></br>
        <div className="text-center">
          <textarea
            ref={name_input_ref}
            placeholder="MenuName"
            className="text-center text-xl w-2/3"
          ></textarea>
        </div>
        <div >
          <input
            ref={price_input_ref}
            type="text"
            placeholder="100"
            className="w-2/5 text-right"
          />
          円(税込)
        </div>
        <br></br>
      </div>
    </div>
  );
};

export { MenuComponentForm };
