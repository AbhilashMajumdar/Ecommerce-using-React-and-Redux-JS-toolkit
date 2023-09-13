import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrdersByUserIdAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const userOrder = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchOrdersByUserIdAsync(user?.id));
  }, [dispatch, user]);

  return (
    <>
      {userOrder.length === 0 ? (
        <main className="grid min-h-full place-items-center bg-white px-6 py-10 sm:py-10 lg:px-8">
          <div className="">
            {/* <p className="text-3xl font-bold tracking-tight sm:text-5xl text-indigo-600">
            404
          </p> */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Please place an order to see here.
            </h1>
            {/* <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p> */}
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
        <div>
          {userOrder.map((order) => (
            <div>
              <div className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8 bg-white p-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Order Id - #{order.id}
                </h1>
                <h3 className="text-2xl my-3 font-bold tracking-tight text-red-900">
                  Order Status :- {order.status}
                </h3>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.cartItems.map((item, index) => (
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
                                        (item?.price *
                                          item?.discountPercentage) /
                                          100
                                      )}
                                  </p>
                                  <p className="ml-4 line-through text-gray-500">
                                    ${item.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                Qty : {order.totalItemsInCart}
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
                    <p>{order.totalItemsInCart}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium my-3 text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.discountedTotalPrice}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-500">
                    <p>Total Saved Price</p>
                    <p>${order.savedPrice}</p>
                  </div>
                </div>
                <p className="mt-5 text-xl font-bold text-gray-900">
                    Shipping Address :-
                  </p>

                <div className="flex justify-between gap-x-6 py-5 p-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.address.fullname}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                        {order.address.email}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.address.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.address.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                      {order.address.state}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.address.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrders;
