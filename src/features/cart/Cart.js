import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItemAsync,
  selectCartItems,
  updateCartItemAsync,
} from "./cartSlice";

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

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

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

  const handleCartQuantity = (e, item) => {
    const qty = Number(e.target.value);
    const updatedData = [{ ...item, quantity: qty }];
    dispatch(updateCartItemAsync(updatedData));
  };

  const removeCart = (itemId) => {
    dispatch(removeCartItemAsync(itemId));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <main className="grid min-h-full place-items-center mt-24 bg-white px-6 py-24 sm:py-24 lg:px-8">
          <div className="">
            {/* <p className="text-3xl font-bold tracking-tight sm:text-5xl text-indigo-600">
            
          </p> */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Empty Shopping Cart
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Please add a product to see Shopping Cart.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <div className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8 bg-white p-10">
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
                                  (item?.price * item?.discountPercentage) / 100
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
              <Link to={"/checkout"}>
                <div className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Checkout
                </div>
              </Link>
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
      )}
    </>
  );
}
