import { useRef, useState } from "react";

interface ShopNameInputProps {
  shop_name: string;
  setShopName: any;
}

const ShopNameInput: React.FC<ShopNameInputProps> = ({
  shop_name,
  setShopName,
}) => {
  const shop_name_input_ref = useRef(null);

  const ChangeShopName = () => {
    const value = (shop_name_input_ref.current! as HTMLInputElement).value;
    setShopName(value);
  };

  return (
    <>
      <input
        type="text"
        ref={shop_name_input_ref}
        value={shop_name}
        onChange={ChangeShopName}
        className="w-3/5 sm:text-5xl text-2xl m-5 text-lime-600"
      ></input>
    </>
  );
};

export { ShopNameInput };
