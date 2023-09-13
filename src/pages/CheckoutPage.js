import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItemAsync,
  selectCartItems,
  updateCartItemAsync,
} from "../features/cart/cartSlice";
import {
  selectUserInfo,
  updateUserInfoAsync,
} from "../features/user/userSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const addresses = [
  {
    name: "Abhilash Majumdar",
    email: "abhilash@gmail.com",
    phone: "7872909202",
    city: "Mankar",
    state: "West Bengal",
    pin: "713144",
  },
  {
    name: "Abhilash Majumdar",
    email: "abhilashmajumdar306@gmail.com",
    phone: "7872909202",
    city: "Newtown",
    state: "West Bengal",
    pin: "700131",
  },
];

const CheckoutPage = () => {
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const totalPrice = cartItems.reduce(
    (acc, item) => item.quantity * item.price + acc,
    0
  );
  const savedPrice = cartItems.reduce(
    (acc, item) =>
      item.quantity * item.price -
      Math.round((item.quantity * item.price * item.discountPercentage) / 100) +
      acc,
    0
  );
  const totalItemsInCart = cartItems.reduce(
    (acc, item) => item.quantity + acc,
    0
  );

  const [payment, setPayment] = useState("cash");
  const [address, setAddress] = useState(null);

  const handleCartQuantity = (e, item) => {
    const qty = Number(e.target.value);
    const updatedData = [{ ...item, quantity: qty }];
    dispatch(updateCartItemAsync(updatedData));
  };

  const removeCart = (itemId) => {
    dispatch(removeCartItemAsync(itemId));
  };

  const handleOrder = () => {
    if (address && payment) {
      const data = {
        cartItems,
        totalPrice,
        discountedTotalPrice: savedPrice,
        savedPrice: totalPrice - savedPrice,
        totalItemsInCart,
        payment,
        address,
        user: userInfo,
        status: "pending",
      };
      dispatch(createOrderAsync(data));
    } else {
      alert("Please select all the required fields!");
    }
  };

  const onSubmit = (data) => {
    dispatch(
      updateUserInfoAsync({
        ...userInfo,
        addresses: [...userInfo.addresses, data],
      })
    );
    // dispatch(updateUserInfoAsync(
    //   { ...user, addresses: [...user.addresses, data] }
    // ));
    reset();
  };

  return (
    <>
    {currentOrder && <Navigate to={`/orderSuccess/${currentOrder?.id}`} replace={true}></Navigate>}
    {cartItems.length === 0 && <Navigate to={'/'} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8 bg-white p-10">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          <div className="lg:col-span-3 bg-white">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900">
                Checkout
              </h1>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("fullname", {
                            required: "Fullname is required",
                          })}
                          id="fullname"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.fullname?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.email?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          id="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.country?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone Number is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.phone?.message}</p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street address is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.street?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.city?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.state?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Pin Code is required",
                          })}
                          id="pincode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.pincode?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="reset"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please select from existing addresses
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {userInfo.addresses.map((address, index) => (
                      <li
                        key={address.email}
                        className="flex justify-between gap-x-6 py-5 p-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            id="address"
                            name="address"
                            value={index}
                            onChange={(e) =>
                              setAddress(userInfo?.addresses[e.target.value])
                            }
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          {/* <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src={address.imageUrl}
                            alt=""
                          /> */}
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.fullname}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                              {address.email}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.city}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                            {address.state}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pincode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payments Method
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Please select the payment mode
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payment"
                            value={"card"}
                            onChange={(e) => setPayment(e.target.value)}
                            checked={payment === "card"}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payment"
                            value={"cash"}
                            onChange={(e) => setPayment(e.target.value)}
                            checked={payment === "cash"}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white">
            <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.thumbnail}>{item.title}</a>
                            </h3>
                            <div>
                              <p className="ml-4">
                                $
                                {item?.price -
                                  Math.round(
                                    (item?.price * item?.discountPercentage) /
                                      100
                                  )}
                              </p>
                              <p className="ml-4 line-through text-gray-500">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty
                            {/* {product.quantity} */}
                            <select
                              className="ml-5"
                              onChange={(e) => handleCartQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(e) => removeCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium my-3 text-gray-900">
                <p>Total Items In Cart</p>
                <p>{totalItemsInCart}</p>
              </div>
              <div className="flex justify-between text-base font-medium my-3 text-gray-900">
                <p>Subtotal</p>
                <p>${savedPrice}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-500">
                <p>Total Saved Price</p>
                <p>${totalPrice - savedPrice}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <div
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  onClick={handleOrder}
                >
                  Pay and Order
                </div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to={"/"}>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
