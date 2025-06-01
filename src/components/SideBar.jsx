import React from "react";
import {
  XMarkIcon,
  ChevronRightIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { TruckIcon } from "@heroicons/react/24/solid";
import { PhoneXMarkIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/context";
import gsap from "gsap";

const SideBar = ({ sidebar }) => {
  const [Expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const leftcontainer = useRef(null);
  const listanimate = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLabels, setShowLabels] = useState(Expanded);
  const { Items, data, setItems, Add } = useCart();
  // animating left container on mount
  useEffect(() => {
    gsap.fromTo(
      leftcontainer.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
      }
    );
  }, []);

  // animating left conatiner buttons
  useEffect(() => {
    const labels = listanimate.current?.querySelectorAll(".animateus");

    if (Expanded) {
      setShowLabels(true); // Show labels immediately
      gsap.fromTo(
        labels,
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    } else if (labels.length) {
      // Animate out, then remove from DOM
      gsap.to(labels, {
        x: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power3.in",
        onComplete: () => {
          setShowLabels(false); // Unmount AFTER animation
        },
      });
    }
  }, [Expanded]);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("User")) || [];
    const loggedUser = users.find((user) => user.Logged === true);
    setLoggedInUser(loggedUser);
  }, [data]); // rerun when context changes
  const handleLogout = () => {
    setItems([]);
    const users = JSON.parse(localStorage.getItem("User")) || [];
    const updatedUsers = users.map((user) => ({ ...user, Logged: false }));

    localStorage.setItem("User", JSON.stringify(updatedUsers));
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <div
      id="left"
      ref={leftcontainer}
      className={` 
      fixed top-0 left-0 z-50  
      lg:static lg:z-auto     ${
        Expanded ? "w-[10rem] transition-[width]" : "w-[5rem]"
      } bg-white h-full rounded-xl transition-[width] duration-300 flex flex-col items-center justify-between `}
    >
      <div>
        <div className="lg:flex justify-end items-end px-4 w-full hidden">
          <button
            className="pt-4 font-bold text-9xl"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {sidebar ? (
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-6 mt-5 text-base"
          ref={listanimate}
        >
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 w-full justify-center px-4 py-2 rounded-md transition ${
              location.pathname === "/"
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            {showLabels && <span className="animateus">Home</span>}
          </button>

          <button
            className={`flex items-center gap-2 w-full justify-center px-4 py-2 rounded-md transition ${
              location.pathname === "/products"
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => navigate("/products")}
          >
            <TruckIcon className="h-6 w-6" />
            {showLabels && <span className="animateus">Products</span>}
          </button>
          <div className="flex relative">
            <button
              className=" flex  items-center gap-2 w-full justify-center px-4 py-2 hover:bg-gray-100 rounded-md transition"
              onClick={() => {
                navigate("/Cart");
              }}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {showLabels && <span className="animateus">Cart</span>}
            </button>
            <span
              className={`absolute ${
                Expanded ? "right-1" : "right-3"
              } bg-black text-white rounded-[50%] text-[14px] px-1 text-center`}
            >
              {Items.length}
            </span>
          </div>

          <button className=" flex items-center gap-2 w-full justify-center px-4 py-2 hover:bg-gray-100 rounded-md transition">
            <PhoneXMarkIcon className="h-6 w-6" />
            {showLabels && <span className="animateus">Help</span>}
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        <button
          className={`${
            loggedInUser ? "" : "hidden"
          } mb-2 flex items-center gap-2 w-full justify-center font-bold px-2 py-2 hover:bg-gray-100 rounded-md transition`}
          onClick={() => {
            Add(), handleLogout(), navigate("/login");
          }}
        >
          <UserIcon className="h-6 w-6" />
          {showLabels && <span className="animateus">Log out</span>}
        </button>

        <>
          <button
            className={`${
              loggedInUser ? "hidden" : ""
            } mb-2 flex items-center gap-2 w-full justify-center font-bold px-2 py-2 hover:bg-gray-100 rounded-md transition`}
            onClick={() => navigate("/login")}
          >
            <UserIcon className="h-6 w-6" />
            {showLabels && <span className="animateus">Log in</span>}
          </button>
        </>

        <div className="p-2 bg-black text-white rounded-b-xl">
          <span className="">V.1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
