import React from "react";
import { useForm } from "react-hook-form";

export default function Fields({ setCurrentTab }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const LoadData = JSON.parse(localStorage.getItem("User"));
    const findIndexx = LoadData.findIndex((item) => item.Logged == true);
    LoadData[findIndexx].Details = data;
    localStorage.setItem("User", JSON.stringify(LoadData));
    console.log("Submitted Address:", data);
    console.log(setCurrentTab);
    setCurrentTab(1);
  };

  return (
    <div className="max-w-md mx-auto mt-10 !p-6 bg-white rounded border">
      <h2 className="text-xl font-semibold mb-4 text-center">Address Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div className="flex gap-3">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="FirstName"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="LastName"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div className="flex gap-3">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium">Pin Code</label>
            <input
              type="number"
              {...register("pinCode", {
                required: "Pin code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pin code must be 6 digits",
                },
              })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Pin Code"
            />
            {errors.pinCode && (
              <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Phone Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 !mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
