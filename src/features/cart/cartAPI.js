export function addToCart(cartData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cartItems", {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/cartItems?user=${userId}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCartItem(item) {
  // console.log(item[0].id);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/cartItems/${item[0].id}`,
      {
        method: "PUT",
        body: JSON.stringify(item[0]),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function removeCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cartItems/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCartItems(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const cartItems = await response.data;
    for (let item of cartItems) {
      await removeCartItem(item.id);
    }
    resolve({ status: "success" });
  });
}
