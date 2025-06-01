import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CartProvider } from "./context/context";
import SideBar from "./components/SideBar.jsx";
import Products from "./components/products.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Cart from "./components/Cart.jsx";
import Address from "./components/Address.jsx";
const Route = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex">
        <Hero></Hero>
      </div>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Products></Products>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login></Login>
      </>
    ),
  },
  ,
  {
    path: "/Signup",
    element: (
      <>
        <Signup></Signup>
      </>
    ),
  },
  ,
  {
    path: "/Cart",
    element: (
      <>
        <Cart></Cart>
      </>
    ),
  },
  {
    path: "/Address",
    element: (
      <>
        <Address></Address>
      </>
    ),
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={Route} />
    </CartProvider>
  );

  // const [loading, setloading] = useState(false);
  // const [trying, settrying] = useState(false);
  // const [query, setquery] = useState("");
  // const [results, setResults] = useState([]);
  // const [Error, setError] = useState(false);
  // function handlechange(e) {
  //   setquery(e.target.value);
  // }
  // function retry() {
  //   settrying((trying) => !trying);
  // }
  // function handle() {
  //   setloading(true);
  //   fetch("https://dummyjson.com/products/category/furniture")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filtered = data.products.filter((product) =>
  //         product.title.toLowerCase().includes(query.toLowerCase())
  //       );
  //       setResults(filtered);
  //       setloading(false);
  //       setError(false);
  //     })
  //     .catch(() => setError(true));
  // }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handle();
  //   }, 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [query]);
  // useEffect(() => {
  //   console.log(results);
  //   return () => {
  //     console.clear();
  //   };
  // }, [results]);
  // return (
  //   <>
  //     {Error ? (
  //       ""
  //     ) : (
  //       <>
  //         <input
  //           type="text"
  //           placeholder="enter name"
  //           onChange={handlechange}
  //           value={query}
  //         ></input>
  //         <button onClick={() => retry()}>retry</button>
  //       </>
  //     )}
  //     <div>
  //       {results.length > 0
  //         ? results.map((item, key) => {
  //             return (
  //               <div key={key} style={{ display: "flex" }}>
  //                 <img src={item.thumbnail}></img>
  //                 <h1>{item.title}</h1>
  //                 <button>{item.availabilityStatus}</button>
  //               </div>
  //             );
  //           })
  //         : Error
  //         ? "OOps Something went wrong we will be back soon 👉 "
  //         : "No products found"}
  //     </div>
  //   </>
  // );
}

export default App;
