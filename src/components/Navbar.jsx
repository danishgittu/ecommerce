import React, { useEffect, useRef } from "react";
import "../styles/navbar.css";
import gsap from "gsap";
import { Link } from "react-router";

const Navbar = () => {
  gsap.registerPlugin();
  const nav = useRef();
  useEffect(() => {
    gsap.to(nav.current.children, {
      opacity: 1,
      duration: 2,
      stagger: 0.2,
      ease: "expo.out",
    });
  }, []);
  return (
    <nav>
      <div>
        <span id="logo">ProductsMart🍊</span>
      </div>
      <div id="wrapperLinks">
        <div id="links">
          <ul ref={nav}>
            <li className="links">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="links">
              <Link to={"/products"}>Products</Link>
            </li>
            <li className="links">
              <a href="#">Contact</a>
            </li>
            <li className="links">
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="searchArea">
        <form action="#">
          <input type="text" placeholder="Search Items..." />
          <button className="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
