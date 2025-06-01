import {
  ShoppingCartIcon,
  HeartIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/context";
import { useEffect } from "react";
import Modal from "./Modal";

export function List({ item, id, result, setterresult }) {
  const { Items, addToCart, removeCart, Logged } = useCart();
  const isAdded = Items.some((items) => items.id === item.id);

  function handleFavourite(id) {
    const mapped = result.map((item) => {
      if (item.id == id) {
        return { ...item, isFavourite: !item.isFavourite };
      }
      return item;
    });
    setterresult(mapped);
  }
  return (
    <>
      <li className="bg-neutral-50 shadow-2xl p-1 hover:cursor-pointer ">
        <div className="min-w-[15rem] w-[18rem] min-h-[15rem] h-[26rem] p-2 flex flex-col justify-center bg-white hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center">
            <HeartIcon
              onClick={(e) => {
                e.stopPropagation();
                handleFavourite(id);
              }}
              className={`${
                item.isFavourite ? "fill-red-500" : ""
              } h-6 w-6 fixed right-7 top-7`}
            ></HeartIcon>
            <img
              onClick={() => handleFavourite(id)}
              src={item.thumbnail}
              width={150}
              height={150}
              alt=""
              className=""
            />
          </div>
          <div>
            <h4 className="px-3">{item.title}</h4>
          </div>
          <div>
            <p className="text-xs font-bold tracking-tight text-justify px-3 m-0">
              {item.description}
            </p>
          </div>
          <span className="px-3 mt-auto mb-2 font-bold">
            Price:{item.price + "$"}
          </span>
          <div className="flex items-center justify-center gap-2">
            {isAdded ? (
              <button
                className="bg-emerald-500 flex items-center justify-center text-xs text-white py-1 px-2 rounded-2 w-full  mt-auto"
                onClick={() => removeCart(item)}
              >
                Added
                <CheckCircleIcon className="h-6 w-6  outline-white"></CheckCircleIcon>
              </button>
            ) : (
              <button
                className="bg-black flex items-center justify-between text-white py-1 px-2 rounded-2 w-full hover:bg-white mt-auto"
                onClick={() => addToCart(item)}
              >
                Add to Cart
                <ShoppingCartIcon className="h-6 w-6  outline-white"></ShoppingCartIcon>
              </button>
            )}
            <button className="bg-black text-white py-1 rounded-2 w-full hover:bg-white mt-auto">
              Place Order
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
