import { formatVietNamMoney } from "../common-js/common.js";

export function showPaginatedProducts(paginatedProducts) {
  const listDiv = document.getElementById("main-products__list");
  listDiv.innerHTML = "";

  paginatedProducts.forEach((product) => {
    const itemDiv = createProductItemWithHtml(product);
    listDiv.appendChild(itemDiv);
  });
}

//Hàm tạo một sản phẩm, trả về element sản phẩm
function createProductItemWithHtml(product) {
  // Image
  const img = document.createElement("img");
  img.src = `${product.src}`;
  img.alt = "";
  img.className = "main-products__image";
  const figure = document.createElement("figure");
  figure.appendChild(img);

  // Info
  const h3 = document.createElement("h3");
  h3.className = "main-products__name";
  h3.textContent = `${product.name}`;
  const p2 = document.createElement("p");
  p2.className = "main-products__price";
  p2.innerHTML = `${formatVietNamMoney(product.price)}đ`;
  const infoDiv = document.createElement("div");
  infoDiv.className = "main-products__info";
  infoDiv.appendChild(h3);
  infoDiv.appendChild(p2);

  // Item
  const itemDiv = document.createElement("div");
  itemDiv.className = "main-products__item";
  itemDiv.dataset.product = `${product.number}`;
  itemDiv.appendChild(figure);
  itemDiv.appendChild(infoDiv);

  return itemDiv;
}
