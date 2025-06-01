import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  use,
} from "react";

// creating a context - a loop hole
const CartContext = createContext();

// defining a function that holds what all we neeed to do children is used to cover all the Components
export function CartProvider({ children }) {
  const [data, setdata] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("User"));
    return saved;
  });
  const [Items, setItems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("User"));
    if (saved != null && saved.length > 0) {
      const index = saved.find((item) => item.Logged == true);
      return index.products;
    } else {
      console.log("No products");
      return [];
    }
  });
  const [Logged, setLogged] = useState(null); // null | true | false
  const [LengthOfItems, setLengthOfItems] = useState(0);
  const [promo, setpromo] = useState("");
  const [wrongPromo, setwrongPromo] = useState(null);

  //login
  function addData(data) {
    setdata(data);
    console.log(data);
  }
  // finds the length of the cart items
  useEffect(() => {
    setLengthOfItems(Items.length);
  }, [Items]);

  //handles the modal for addtocart without login
  function closeModal() {
    setLogged(null);
  }

  // Add the items to the cart of the user when clicked on logout
  function Add() {
    console.log(Items);
    if (Items.length > 0) {
      console.log(data);
      const user = data.map((userr) =>
        userr.Logged === true
          ? {
              ...userr,
              products: Items,
              promoC: promo,
            }
          : userr
      );
      localStorage.setItem("User", JSON.stringify(user));
    } else {
      console.log("No items to add.");
    }
  }
  // Add to cart Functionality
  function addToCart(pro) {
    const data = JSON.parse(localStorage.getItem("User")) || [];
    const user = data.findIndex((item) => item.Logged == true);
    if (data != null) {
      const isPresent = data.some((item) => item.Logged === true);
      setLogged(isPresent);

      if (isPresent) {
        const exists = Items.some((item) => item.id === pro.id);
        if (!exists) {
          setItems((item) => [...item, pro]);
          const updatedData = [...Items, pro];
          data[user].products = updatedData;
          localStorage.setItem("User", JSON.stringify(data));
        }
      } else {
        console.log("Log in first");
      }
    }
  }
  // remove items from cart functionality
  function removeCart(pro) {
    const data = JSON.parse(localStorage.getItem("User"));
    const filterd = Items.filter((item) => item.id != pro.id);
    const findIndexx = data.findIndex((item) => item.Logged == true);
    data[findIndexx].products = filterd;
    localStorage.setItem("User", JSON.stringify(data));
    setItems(filterd);
  }
  const [shipcharge, setshipcharge] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("User"));
    if (saved) {
      const user = saved.findIndex((item) => item.Logged == true);
      return saved[user].DeliveryCharges;
    }
  });
  // when options change in the Delivery type its sets the value in the state
  const handleShippingChange = (e) => {
    const value = parseFloat(e.target.value);
    setshipcharge(value);
    console.log(value); // convert string to number
    const users = JSON.parse(localStorage.getItem("User"));
    const index = users.findIndex((user) => user.Logged === true);
    if (index !== -1) {
      users[index].DeliveryCharges = value;
      localStorage.setItem("User", JSON.stringify(users));
      console.log("Updated user:", users[index]);
    } else {
      console.log("No logged-in user found.");
    }
    console.log(e.target.value);
  };

  // get the total price of all the items in the cart
  const totalPrice = useMemo(() => {
    const total =
      Items.length > 0
        ? Items.reduce((acc, item) => acc + parseFloat(item.price || 0), 0)
        : 0.0;
    return parseFloat((total + shipcharge).toFixed(2));
  }, [Items, shipcharge]);

  const [promoCode, setPromoCode] = useState("");
  function EnterCode(e) {
    setPromoCode(e.target.value);
  }
  useEffect(() => {
    CheckPromo();
  }, [shipcharge, Items, LengthOfItems]);
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const [ValidPromo, setValidPromo] = useState(null);
  const CheckPromo = () => {
    const offers = [
      {
        Name: "FIRSTORDER",
        value: 0.25,
      },
      {
        Name: "SECONDORDER",
        value: 0.1,
      },
      {
        Name: "THIRDORDER",
        value: 0.05,
      },
    ];
    const valid = offers.find((item) => item.Name == promoCode);
    setValidPromo(valid);
    if (valid !== undefined) {
      const discount = totalPrice * valid.value;
      const finalprice = totalPrice - discount;
      setFinalPrice(parseFloat(finalprice.toFixed(2)));
      return;
    }
    setFinalPrice(totalPrice);
    return;
  };
  useEffect(() => {
    if (LengthOfItems < 1) {
      setPromoCode("");
    }
  }, [Items]);

  // Using the context as a provider and it will provide the following values
  return (
    <CartContext.Provider
      value={{
        totalPrice,
        Items,
        setItems,
        addToCart,
        removeCart,
        addData,
        data,
        Logged,
        closeModal,
        Add,
        LengthOfItems,
        handleShippingChange,
        promo,
        wrongPromo,
        shipcharge,
        EnterCode,
        CheckPromo,
        finalPrice,
        ValidPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
// a function is create that return useContext - the context is CartContext
export function useCart() {
  return useContext(CartContext);
}
