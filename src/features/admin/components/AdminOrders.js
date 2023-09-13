import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  removeOrderAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../../app/Constants";
import { Pagination } from "../../common/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [showEditOption, setShowEditOption] = useState(-1);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
    console.log(sort);
  };

  const handleShow = () => {};

  const handleChange = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    if (order.status === updatedOrder.status) {
      setShowEditOption(-1);
    } else {
      dispatch(updateOrderAsync(updatedOrder));
      setShowEditOption(-1);
    }
  };

  const handleEdit = (orderId) => {
    setShowEditOption(orderId);
  };

  const handleRemove = (orderId) => {
    dispatch(removeOrderAsync(orderId));
  };

  const showOrderStatus = (status) => {
    switch (status) {
      case "Assign":
        return "bg-purple-200 font-bold text-purple-600";

      case "Pending":
        return "bg-purple-200 font-bold text-purple-600";

      case "Delivered":
        return "bg-green-200 font-bold text-green-600";

      case "Dispatched":
        return "bg-yellow-200 font-bold text-yellow-600";

      case "Cancelled":
        return "bg-red-200 font-bold text-red-600";

      default:
        return "bg-purple-200 font-bold text-purple-600";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Id{" "}
                      {sort._sort === "id" && sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      )}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "discountedTotalPrice",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Price{" "}
                      {sort._sort === "discountedTotalPrice" &&
                      sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center font-bold">
                          {order.id}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex font-bold items-center">
                          {order.cartItems.map((item) => (
                            <div className="mr-3">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-8 h-8 inline"
                              />{" "}
                              - {item.title}{" "}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex font-bold items-center justify-center">
                          ${order.discountedTotalPrice}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>{order.address.fullname}</div>
                        <div>{order.address.email}</div>
                        <div>
                          {order.address.street} - {order.address.pincode}
                        </div>
                        <div>
                          {order.address.city} - {order.address.state} -{" "}
                          {order.address.country}
                        </div>
                        <div>{order.address.phone}</div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span
                          className={` ${showOrderStatus(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {showEditOption === order.id ? (
                            <select
                              value={order.status}
                              onChange={(e) => handleChange(e, order)}
                            >
                              <option value="Assign">Assign</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Pending">Pending</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          ) : (
                            order.status
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="h-6 w-6"
                              onClick={(e) => handleShow(order.id)}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="h-6 w-6"
                              onClick={(e) => handleEdit(order.id)}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <TrashIcon
                              className="h-6 w-6"
                              onClick={(e) => handleRemove(order.id)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalPages={totalPages}
          totalProducts={totalOrders}
        />
      </div>
    </>
  );
};

export default AdminOrders;
