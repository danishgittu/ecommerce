import { useEffect, useState, useRef } from "react";
import "../styles/products.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { List } from "./List";
import { Loading } from "./Loading";
import SideBar from "./SideBar";
import { useCart } from "../context/context";
import Modal from "./Modal";
import Modall from "./Modal";
import { Bars3Icon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  // data section

  const [Items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const cardContainerRef = useRef(null);
  const hasanimated = useRef(false);
  const { Logged } = useCart();

  //fetching data
  useEffect(() => {
    setisLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const Data = data.products.map((item) => ({
          ...item,
          isAdded: false,
        }));
        setItems(Data);
        setisLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log(Items);
  }, [Items]);

  // animating the list cards
  useEffect(() => {
    if (Items.length > 0 && cardContainerRef.current && !hasanimated.current) {
      hasanimated.current = true;
      gsap.fromTo(
        cardContainerRef.current.querySelectorAll("li"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }
  }, [Items]);
  const [sidebar, setShowSidebar] = useState(false);
  //designing the layout main jsx starts
  return (
    <>
      <div className="lg:hidden p-4 flex justify-end ">
        <button onClick={() => setShowSidebar((curr) => !curr)}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div
        className={`h-screen bg-neutral-300 w-full flex  items-center justify-center gap-2 pt-2 pb-3 px-1 
        `}
      >
        <SideBar sidebar={sidebar}></SideBar>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            id="right"
            className={`
            w-[calc(100vw-21.5rem)] bg-white h-full rounded-xl py-4 overflow-scroll hideScrol flex-1
            `}
          >
            <ul
              className={`list-none flex flex-wrap gap-2 items-center justify-center ${
                Logged == false ? "filter blur-md " : ""
              }
              `}
              ref={cardContainerRef}
            >
              {Items.map((item, key) => {
                return (
                  <List
                    key={key}
                    item={item}
                    id={item.id}
                    Item={Items}
                    setterresult={setItems}
                  ></List>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {Logged == false && <Modall></Modall>}
    </>
  );
}
