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
import { useCart } from "../context/context";

export default function FormInputs() {
  const { addUser, User, addData, setItems } = useCart();
  const navigate = useNavigate();
  const [Valid, setValid] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const onSubmit = (data) => {
    //load the data
    const getdata = JSON.parse(localStorage.getItem("User")) || [];
    //check whether the entered details are matching the user or not
    if (getdata != null) {
      const alreadyExists = getdata.find((item) => item.Email === data.Email);
      if (alreadyExists) {
        setItems(alreadyExists.products);
      }
      // if matched log in
      if (alreadyExists) {
        setValid(true);
        const updatedUsers = getdata.map((item) =>
          item.Email === data.Email
            ? { ...item, Logged: true }
            : { ...item, Logged: false }
        );
        localStorage.setItem("User", JSON.stringify(updatedUsers));
        addData(updatedUsers);
        //wait for few seconds so that the user can read the message
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
      // else show message no user authentication
      else {
        setValid(false);
      }
    }
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
        <div>
          <Link className="text-black">Forgot Password?</Link>
        </div>
        <div className="mt-2">
          <input
            className="bg-black w-full text-white px-3 py-2 rounded-[4px] !text-2xl font-serif "
            type="submit"
            value={Valid ? "Logging In" : "Login"}
            disabled={isSubmitting}
          />
        </div>
        <div className="text-center mt-2 ">
          <span>
            Not a member?{" "}
            <Link className="text-black" onClick={() => navigate("/Signup")}>
              Signup now
            </Link>
          </span>
        </div>
        {Valid === true && (
          <div className="text-center">
            <span className="!text-green-500">User Autenticated</span>
          </div>
        )}{" "}
        {Valid === false && (
          <div className="text-center">
            <span className="!text-red-500">User Not Autenticated</span>
          </div>
        )}
      </form>
    </>
  );
}
