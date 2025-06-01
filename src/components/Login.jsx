import React from "react";
import SideBar from "./SideBar";
import FormInputs from "./Formcompo";
const Login = () => {
  return (
    <div className="flex h-screen p-2 bg-neutral-300 gap-2">
      <SideBar></SideBar>
      <LogCompo></LogCompo>
    </div>
  );
};

function LogCompo() {
  return (
    <div className="w-full h-full  rounded-2xl flex items-center justify-center bg-white">
      <div className="w-1/4 min-h-1/3 bg-black rounded-t-2xl">
        <div className="h-[25%] bg-black flex items-center justify-center rounded-t-[5px] p-4">
          <span className="text-white text-4xl font-mono">LOGIN FORM</span>
        </div>
        <div className="h-full bg-neutral-50 shadow-2xl !p-7">
          <FormInputs></FormInputs>
        </div>
      </div>
    </div>
  );
}

export default Login;
