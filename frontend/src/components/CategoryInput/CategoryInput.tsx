import React, { useRef } from "react";

interface Menu {
  category: string;
  contents: {
    name : string;
    image : string;
    price : string;
  }[]
}

interface CategoryInputProps{
  menues : Menu[];
  setMenu: any
  set_current_category: any
}

const CategoryInput: React.FC<CategoryInputProps> = ({ menues, setMenu, set_current_category}) => {
  const category_input_ref = useRef(null);
  const AppendCategory = () => {
    const value = (category_input_ref.current! as HTMLInputElement).value;
    if (!value) {
      return;
    }
    setMenu((prev: Menu[]) => [...prev, {category: value, contents: []}]);
    (category_input_ref.current! as HTMLInputElement).value = "";
  };

  const RemoveCategory = (event: any) => {

    const value = event.target.id
    if (!value) {
      return;
    }
    setMenu((prev: Menu[]) => {
      const newArray = prev.filter((menu) => menu.category != value);
      return newArray;
    });
    set_current_category("");
    (category_input_ref.current! as HTMLInputElement).value = "";
  };

  const ChangeCategory = (category: string) => {
    set_current_category(category)
  }
  return (
    <div>
    <input
      type="text"
      ref={category_input_ref}
      placeholder="category"
      className="md:text-xl text-sm md:w-1/5 w-2/5 mb-3 mx-5 border rounded-md border-black"
    ></input>
    <button onClick={AppendCategory} className="md:text-xl text-sm border-solid border-gray-700 border rounded-md">追加</button>
    <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2  grid-flow-row mx-3 gap-2">
    {
      menues.map((menu : Menu) => {
        return (
          <div key={menu.category} className="bg-green-300 flex">
          <button onClick={RemoveCategory}  id={menu.category}className="ml-1">✖</button>
          <button  onClick={ChangeCategory.bind("",menu.category)} className="w-full md:text-2xl text-sm bg-green-300 md:p-3 py-2 rounded-md">{menu.category}</button>
          </div>
        )
      })
    }
    </div>
  </div>
  )

}


export {CategoryInput}