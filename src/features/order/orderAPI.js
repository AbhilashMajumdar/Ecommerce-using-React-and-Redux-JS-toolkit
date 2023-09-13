export function createOrder(orderedData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderedData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = '';
  for (let item in pagination) {
    queryString += `${item}=${pagination[item]}&`;
  }
  for (let item in sort) {
    queryString += `${item}=${sort[item]}&`;
    console.log(queryString);
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/orders?${queryString}`
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: totalOrders } });
  });
  // return new Promise(async (resolve) => {
  //   const response = await fetch("http://localhost:8080/orders");
  //   const data = await response.json();
  //   resolve({ data });
  // });
}

export function removeOrder(orderId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: orderId } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${order.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    resolve({ data });
  });
}
