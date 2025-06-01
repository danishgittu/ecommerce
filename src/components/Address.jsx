import {
  ArrowRightCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Fields from "./Fields";
import Checkout from "./Checkout";

const Address = () => {
  const [CurrenTab, setCurrentTab] = useState(0);
  const compos = {
    0: <Fields setCurrentTab={setCurrentTab} />,
    1: <Checkout />,
  };
  return (
    <div className="w-screen h-screen ">
      <div id="options" className="flex items-center justify-center gap-3 p-4">
        <button
          className="bg-neutral-50 text-neutral-700  px-5 py-3 border  hover:!bg-black hover:!text-white transition-colors duration-300 font-bold"
          onClick={() => setCurrentTab(0)}
        >
          Address{" "}
        </button>
        <span>
          <ChevronRightIcon className="text-neutral-600 font-bold w-6 h-6"></ChevronRightIcon>
        </span>
        <button
          disabled={true}
          className="bg-neutral-50 text-neutral-700 px-5 py-3 border hover:!bg-black hover:!text-white duration-300 font-bold"
        >
          CheckOut
        </button>
      </div>
      <div className="w-screen h-[calc(100vh-106px)] flex items-center">
        <div
          className={`min-h-[90%] w-[40%] mx-auto shadow-2xl rounded-2xl flex items-center justify-center ${
            CurrenTab == 0 ? "bg-white" : "bg-white"
          } duration-300`}
        >
          {compos[CurrenTab]}
        </div>
      </div>
    </div>
  );
};

export default Address;
