import React, { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchUserDataAsync } from "./features/user/userSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import LogoutPage from "./pages/LogoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected><HomePage /></Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin><AdminHomePage /></ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm",
    element: (
      <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm/:id",
    element: (
      <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage /></Protected>,
  },
  {
    path: "/orderSuccess/:id",
    element: <Protected><OrderSuccessPage /></Protected>,
  },
  {
    path: "/myOrders",
    element: <Protected><UserOrdersPage /></Protected>,
  },
  {
    path: "/myProfile",
    element: <Protected><UserProfilePage /></Protected>,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchItemsByUserIdAsync(user?.id));
    dispatch(fetchUserDataAsync(user?.id));
  }, [dispatch, user]);

  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
