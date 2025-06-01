import React from "react";
import FormInputs from "./Formcompo";
import SideBar from "./SideBar";
import SignupCompo from "./Singupcompo";
const Signup = () => {
  return (
    <div className="flex h-screen p-2 bg-neutral-300 gap-2">
      <SideBar></SideBar>
      <SignupForm></SignupForm>
    </div>
  );
};
function SignupForm() {
  return (
    <div className="w-full h-full  rounded-2xl flex items-center justify-center bg-white">
      <div className="w-1/4 min-h-1/3 bg-black rounded-t-2xl">
        <div className="h-[25%] bg-black flex items-center justify-center rounded-t-[5px] p-4">
          <span className="text-white text-4xl font-mono">SIGNUP FORM</span>
        </div>
        <div className="h-full bg-neutral-50 shadow-2xl !p-7">
          <SignupCompo></SignupCompo>
        </div>
      </div>
    </div>
  );
}

export default Signup;
