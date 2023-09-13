export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}

export function logOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
