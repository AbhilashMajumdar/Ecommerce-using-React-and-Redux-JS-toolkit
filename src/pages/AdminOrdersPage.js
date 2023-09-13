import React from "react";
import AdminOrders from "../features/admin/components/AdminOrders";
import Navbar from "../features/navbar/Navbar";

const AdminOrdersPage = () => {
  return (
    <>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </>
  );
};

export default AdminOrdersPage;
