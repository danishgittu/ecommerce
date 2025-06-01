import React, { useEffect, useRef, useState } from "react";
import { TruckIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

const Checkout = () => {
  const wraper = useRef(null);
  const truckRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    // Truck enters from left
    tl.fromTo(
      truckRef.current,
      { x: "-150%" },
      {
        x: "350%",
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          // Show text after truck stops
          setShowText(true);
        },
      }
    );
  }, []);

  return (
    <div
      ref={wraper}
      className="w-[22rem] h-[22rem] rounded-full flex justify-center items-center shadow-lg bg-white overflow-hidden relative"
    >
      <TruckIcon ref={truckRef} className="w-20  absolute" />
      {showText && (
        <p className="text-xl font-semibold  mt-28 animate-fadeIn">
          Order Placed!
        </p>
      )}
    </div>
  );
};

export default Checkout;
