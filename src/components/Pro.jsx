import React from "react";
import { useCart } from "../context/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../styles/products.css";
import { Link } from "react-router";
const ShoppingCart = () => {
  const {
    Items,
    removeCart,
    LengthOfItems,
    totalPrice,
    handleShippingChange,
    grandTotal,
    promocode,
    discoutedPrice,
    wrongPromo,
    promo,
    shippingCost,
    shipcharge,
    EnterCode,
    CheckPromo,
    finalPrice,
    ValidPromo,
  } = useCart();
  return (
    <section
      className="h-[100vh] shadow-lg shadow-black rounded-2xl"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", height: "100%" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 h-100">
                  {/* Left Column - Cart Items with scroll */}
                  <div className="col-lg-8 overflow-y-auto hideScrol h-[80vh] pr-3">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">
                          {LengthOfItems < 1
                            ? "No Items"
                            : LengthOfItems < 2
                            ? `${LengthOfItems} item`
                            : `${LengthOfItems} items`}
                        </h6>
                      </div>
                      <hr className="my-4" />

                      {/* Repeat for each item */}
                      {Items.map((item, index) => (
                        <div key={index}>
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.thumbnail}
                                className="img-fluid rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{item.title}</h6>
                              <h6 className="mb-0">{item.category}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={(e) =>
                                  e.target
                                    .closest(".d-flex")
                                    .querySelector("input[type=number]")
                                    .stepDown()
                                }
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <input
                                id={`quantity-${index}`}
                                min="0"
                                name="quantity"
                                defaultValue="1"
                                type="number"
                                className="form-control form-control-sm"
                              />

                              <button
                                className="btn btn-link px-2"
                                onClick={(e) =>
                                  e.target
                                    .closest(".d-flex")
                                    .querySelector("input[type=number]")
                                    .stepUp()
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">${item.price}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" className="text-muted">
                                <i className="fas fa-times text-black">
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    onClick={() => removeCart(item)}
                                  ></XMarkIcon>
                                </i>
                              </a>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      ))}

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link
                            to={"/products"}
                            href="#!"
                            className="text-body"
                          >
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Summary */}
                  <div className="col-lg-4 bg-body-tertiary">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          {LengthOfItems < 1
                            ? "No Items"
                            : LengthOfItems < 2
                            ? `${LengthOfItems} item`
                            : `${LengthOfItems} items`}
                        </h5>
                        <h5>${LengthOfItems > 0 ? totalPrice : 0}</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select
                          className="form-select"
                          onChange={handleShippingChange}
                          defaultValue={shipcharge}
                        >
                          <option value={3.0}>Standard-Delivery- $3.00</option>
                          <option value={5.0}>Fast-Delivery-$5.00</option>
                          <option value={8.0}>Air-Delivery-$8.00</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Promo Code</h5>

                      <div className="mb-5">
                        <div className="form-outline">
                          <div className="flex gap-1">
                            <input
                              type="text"
                              id="form3Examplea2"
                              className="form-control form-control-lg"
                              placeholder="Eg... FIRSTORDER"
                              onChange={EnterCode}
                            />
                            <button
                              className="bg-black text-white !px-7 border-0 !py-0 !text-xl"
                              onClick={CheckPromo}
                            >
                              Apply
                            </button>
                          </div>
                          <label
                            className="form-label w-full text-xs"
                            htmlFor="form3Examplea2"
                          >
                            {ValidPromo != undefined
                              ? "Offer Applied Successfully"
                              : "Invalid PromoCode"}
                          </label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="flex flex-col justify-content-between mb-5">
                        <div className="flex gap-4">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>${LengthOfItems > 0 ? finalPrice : 0}</h5>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600">
                            +including Shipping Charges
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg w-full"
                      >
                        <Link
                          to={"/Address"}
                          className={`list-none text-white ${
                            LengthOfItems > 0 ? "" : "disabled"
                          }`}
                        >
                          Place Order
                        </Link>
                      </button>
                    </div>
                  </div>
                  {/* End Right Column */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
