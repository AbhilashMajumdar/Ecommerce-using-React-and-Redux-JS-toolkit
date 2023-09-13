import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetCartItemsAsync } from '../cart/cartSlice';
import { selectUserInfo } from '../user/userSlice';
import { resetCurrentOrder } from './orderSlice';

export default function Order() {
  const orderId = Number(useParams().id);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(()=>{
    dispatch(resetCartItemsAsync(userInfo.id));
    dispatch(resetCurrentOrder());
  }, [dispatch, userInfo]);

  return (
    <>
      <main className="grid mt-20 min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* <p className="text-3xl font-bold tracking-tight sm:text-5xl text-indigo-600">404</p> */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Id - #{orderId}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Order is successfully placed.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/myProfile"
            >
              <p>You can see your order from (home - profile - myorders)</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
