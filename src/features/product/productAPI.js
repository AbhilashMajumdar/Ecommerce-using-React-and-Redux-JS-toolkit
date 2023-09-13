export function fetchAllProductsByFilter(filter, sort, pagination) {
  let queryString = "";
  // filter = {categories : ["smartphones", "laptops"]}
  // pagination = { _page=1, _limit=10 } -> show the first page with 10 products
  // filter categories/brands -> {_sort:rating, _order: desc} -> http://localhost:8080/products?_sort=rating&_order=desc

  for (let item in filter) {
    const categories = filter[item];
    if (categories.length) {
      //based on last category value we are filtering the products
      //TODO : later we can filter by all the category values
      const lastCategoryValue = categories[categories.length - 1];
      queryString += `${item}=${lastCategoryValue}&`;
    }
  }

  // sort -> {_sort:rating, _order: desc} -> http://localhost:8080/products?_sort=rating&_order=desc
  for (let item in sort) {
    queryString += `${item}=${sort[item]}&`;
    console.log(queryString);
  }

  //pagination
  for (let item in pagination) {
    queryString += `${item}=${pagination[item]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    const totalProducts = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalProducts: totalProducts } });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${productId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
