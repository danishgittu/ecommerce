import React, { useEffect, useRef } from "react";
import "../styles/hero.css";
import { gsap } from "gsap";
import { useNavigate } from "react-router";
import SideBar from "./SideBar";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  const navigate = useNavigate();
  const textref = useRef();
  const btn = useRef();
  useEffect(() => {
    gsap.to(textref.current, {
      transform: "translateY(-20px)",
      opacity: 1,
      duration: 2,
      ease: "expo.out",
    });
    gsap.to(btn.current.children, {
      opacity: 1,
      duration: 2,
      ease: "expo.out",
    });
  }, []);

  return (
    <div className={`h-screen bg-neutral-300 w-full flex gap-2 pt-2 pb-3 px-1`}>
      <SideBar></SideBar>
      <div
        id="right"
        className="w-[calc(100vw-21.5rem)] bg-white h-full rounded-xl py-4 overflow-scroll hideScrol flex-1 flex flex-col justify-center"
      >
        <div id="welcome" className="w-[80%] mx-auto">
          <div id="animate" ref={textref}>
            <span id="heading">
              Welcome to <span id="Fresh">ProductsMart</span>
            </span>{" "}
            <br />
          </div>
          <div id="subwrapper">
            <span id="subheading">
              ProductsMart brings you the finest quality groceries, fresh
              produce, best electronic items,and everyday essentials, delivered
              straight to your doorstep with care and convenience.Want it? place
              order and get it.{" "}
            </span>
          </div>
        </div>
        <div id="herobtns" ref={btn} className="w-[80%] mx-auto !pl-4">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 !rounded-2xl"
          >
            Shop with Us{" "}
            <ArrowRightCircleIcon className="h-6 w-6"></ArrowRightCircleIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
