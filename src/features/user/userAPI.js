export function updateUserInfo(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userData.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchUserData(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchOrdersByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?user.id=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}
