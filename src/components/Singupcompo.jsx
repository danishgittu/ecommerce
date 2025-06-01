import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  LockClosedIcon,
  UserCircleIcon,
  UserMinusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Products from "./products";
import { useCart } from "../context/context";

export default function SignupCompo() {
  const navigate = useNavigate();
  const [Ispresent, setIspresent] = useState(null);
  const { Items } = useCart();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const onSubmit = (data) => {
    const getdata = JSON.parse(localStorage.getItem("User")) || [];
    if (getdata != null) {
      const alreadyExists = getdata.some((item) => item.Email === data.Email);
      if (alreadyExists) {
        setIspresent(true);
      } else {
        setIspresent(false);
        const updatedUsers = [
          ...getdata,
          {
            ...data,
            Logged: false,
            products: Items,
            DeliveryCharges: 3,
          },
        ];
        localStorage.setItem("User", JSON.stringify(updatedUsers));
      }
    }
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="p-2 bg-black">
              <UsersIcon className="h-6  fill-white bg-black rounded-l-md"></UsersIcon>
            </div>
            <input
              {...register("Email", {
                required: {
                  value: true,
                  message: "The Input field Cant be Empty",
                },
              })}
              className="border-1 border-gray-300 bg-white font-bold !text-l p-2 w-full"
              placeholder="Email"
              type="email"
            ></input>
          </div>
          {errors.Email && (
            <div className="!text-red-400">{errors.Email.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="p-2 bg-black">
              <LockClosedIcon className="h-6 fill-white bg-black rounded-l-md"></LockClosedIcon>
            </div>
            <input
              className="border-1 border-gray-300 bg-white font-bold !text-l p-2 w-full"
              {...register("Password", {
                required: {
                  value: true,
                  message: "The Input field Cant be Empty",
                },
                minLength: {
                  value: 8,
                  message: "Miniumum Length for Password is 8",
                },
              })}
              placeholder="Password"
            />
          </div>
          {errors.Password && (
            <div className="!text-red-400">{errors.Password.message}</div>
          )}
        </div>
        <div className="mt-2">
          <input
            className="bg-black w-full text-white px-3 py-2 rounded-[4px] !text-2xl font-serif "
            type="submit"
            value={Ispresent ? "Signing Up" : "SignUp"}
            disabled={isSubmitting}
          />
        </div>
        <div className="text-center mt-2 ">
          <span>
            Already a member?{" "}
            <Link className="text-black" onClick={() => navigate("/login")}>
              Login now
            </Link>
          </span>
        </div>
        {Ispresent === true && (
          <div className="text-center">
            <span className="!text-red-500">User Already Present</span>
          </div>
        )}{" "}
        {Ispresent === false && (
          <div className="text-center">
            <span className="!text-green-500">
              User Sucessfully Added Please Login Now
            </span>
          </div>
        )}
      </form>
    </>
  );
}
