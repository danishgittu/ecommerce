import React from "react";
import SideBar from "./SideBar";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import ShoppingCart from "./Pro";

const Cart = () => {
  return (
    <div
      className={`h-screen bg-neutral-300 w-full flex items-center justify-center gap-2 pt-2 pb-3 px-1`}
    >
      <SideBar></SideBar>;
      <div
        id="right"
        className="w-[calc(100vw-21.5rem)] bg-white h-full rounded-xl py-4 overflow-scroll hideScrol flex-1 flex flex-col items-center justify-center"
      >
        <ShoppingCart></ShoppingCart>
      </div>
    </div>
  );
};

export default Cart;
