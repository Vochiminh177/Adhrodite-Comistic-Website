import { removeAccents, formatVietNamMoney } from "../common-js/common.js";
import { productItemArray } from "../common-js/database.js";
import { getProductItemInfo } from "./getProductItem.js";
import {
  updateLeftMenuStyle,
  updateMainProductsListStyle,
} from "./productsPageStyles.js";
import { updateProductsPaginationActions } from "./productsPagination.js";

// Từ khoá chỉ tên sản phẩm cần tìm kiếm hiện tại
let currentProductItemName = "";
// Từ khoá chỉ danh mục hiện tại
let currentProductListKey = "";

// Hàm lấy thông tin từ Left Search (Tìm kiếm - Tìm kiếm cơ bản)
function getLeftSearchInfo() {
  // Lắng nghe sự kiện từ trường tìm kiếm
  const leftSearchInput = document.querySelector("#left-search-input");
  leftSearchInput.addEventListener("input", () => {
    // Cập nhập lại tên hiện tại của sản phẩm cần tìm
    currentProductItemName = leftSearchInput.value.trim().toLowerCase();
    if (currentProductItemName === "" || currentProductItemName) {
      // Cập nhật danh sách sản phẩm
      updateProductList(currentProductItemName, currentProductListKey);
    }
  });
}

// Hàm lấy thông tin từ Left Filter (Bộ lọc - Tìm kiếm nâng cao)
function getLeftFilterInfo() {}

// Hàm lấy thông tin từ Left Menu (Danh mục - Phân chia sản phẩm)
function getLeftMenuInfo() {
  // Tạo sự kiện có thể nhấn vào cho các danh mục con
  let array = Array.from(document.querySelectorAll(".left-menu__action "));
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Lấy giá trị của danh mục con đã nhấn
      const leftMenuValue =
        event.currentTarget.getAttribute("data-menu-product");
      if (leftMenuValue) {
        // Kiểm tra và đặt lại giá trị cho currentProductItemName và thẻ input ở Left Search
        const leftSearchInput = document.getElementById("left-search-input");
        if (leftSearchInput.value) {
          leftSearchInput.value = "";
          currentProductItemName = "";
        }

        // Cập nhật lại leftMenuStyle
        updateLeftMenuStyle(leftMenuValue);

        // Cập nhật danh sách sản phẩm
        currentProductListKey = leftMenuValue;
        updateProductList(currentProductItemName, currentProductListKey);
      }
    });
  });
}

// Hàm trở về danh sách sản phẩm trước đó khi nhấn "Quay lại" ở trang Chi tiết
export function comebackProductList() {
  updateProductList(currentProductItemName, currentProductListKey);
  getProductItemInfo();
}

// Danh sách các sản phẩm được hiển thị theo tìm kiếm, bộ lọc, danh mục
function updateProductList(productItemName, productListKey) {
  //Hàm tạo một sản phẩm
  function createProductItemWithHtml(productItem) {
    // Image
    let img = document.createElement("img");
    img.src = `${productItem.src}`;
    img.alt = "";
    img.className = "main-products__image";
    let figure = document.createElement("figure");
    figure.appendChild(img);

    // Info
    let h3 = document.createElement("h3");
    h3.className = "main-products__name";
    h3.textContent = `${productItem.name}`;
    let p2 = document.createElement("p");
    p2.className = "main-products__price";
    p2.innerHTML = `${formatVietNamMoney(productItem.price)}đ`;
    let infoDiv = document.createElement("div");
    infoDiv.className = "main-products__info";
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p2);

    // Item
    let itemDiv = document.createElement("div");
    itemDiv.className = "main-products__item";
    itemDiv.dataset.product = `${productItem.number}`;
    itemDiv.appendChild(figure);
    itemDiv.appendChild(infoDiv);
    listDiv.appendChild(itemDiv);
  }

  // Đếm số lượng sản phẩm theo danh mục
  let countProductItem = 0;

  // Main Products
  let mainProductsDiv = document.createElement("div");
  mainProductsDiv.className = "main__products";

  // Title
  let h2 = document.createElement("h2");
  h2.className = "main-products__title heading";
  h2.textContent = "DANH SÁCH SẢN PHẨM";
  mainProductsDiv.appendChild(h2);

  // Body
  let bodyDiv = document.createElement("div");
  bodyDiv.className = "main-products__body";
  bodyDiv.id = "main-products-body";

  // Product List
  let listDiv = document.createElement("div");
  listDiv.className = "main-products__list";
  listDiv.id = "main-products__list";

  // Product Item
  productItemArray.forEach((productItem) => {
    if (
      (productListKey === "tat-ca" ||
        productListKey ===
          removeAccents(productItem.category)
            .toLowerCase()
            .replaceAll(" ", "-")) &&
      productItem.name.toLowerCase().includes(productItemName)
    ) {
      createProductItemWithHtml(productItem);
      countProductItem++;
    }
  });

  if (countProductItem > 0) {
    // Pagination
    let paginationDiv = document.createElement("div");
    paginationDiv.className = "main-products__pagination";
    paginationDiv.id = "main-products-pagination";
    // - Nút sang trái
    let leftButton = document.createElement("button");
    leftButton.className = "main-products__chevron";
    leftButton.id = "main-products-left-button";
    leftButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
    paginationDiv.appendChild(leftButton);
    // - Các nút thứ tự trang
    let numbersDiv = document.createElement("div");
    numbersDiv.className = "main-products__numbers";
    for (let i = 1; i <= Math.ceil(countProductItem / 6); i++) {
      let numberButton = document.createElement("span");
      numberButton.className = "main-products__number";
      numberButton.textContent = `${i}`;
      numbersDiv.appendChild(numberButton);
    }
    paginationDiv.appendChild(numbersDiv);
    // - Nút sang phải
    let rightButton = document.createElement("button");
    rightButton.className = "main-products__chevron";
    rightButton.id = "main-products-right-button";
    rightButton.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
    paginationDiv.appendChild(rightButton);

    bodyDiv.appendChild(listDiv);
    bodyDiv.appendChild(paginationDiv);
  } else {
    // Inform
    let pInform = document.createElement("p");
    pInform.className = "main-products__inform";
    pInform.textContent = "KHÔNG CÓ SẢN PHẨM NÀO TRONG DANH SÁCH";
    listDiv.appendChild(pInform);

    bodyDiv.appendChild(listDiv);
  }
  mainProductsDiv.appendChild(bodyDiv);

  /* Tạo ra một thẻ div để lấy nội dung bên trong nó,
    nếu không sẽ mất thẻ mainProductsDiv khi ghi đè nội dung */
  let productsMainHTML = document.createElement("div");
  productsMainHTML.appendChild(mainProductsDiv);
  const productsMainDiv = document.getElementById("products-main");
  productsMainDiv.innerHTML = `${productsMainHTML.innerHTML}`;

  // Cập nhật lại mainProductsListStyle
  updateMainProductsListStyle(countProductItem);

  // Cập nhật hành động cho các nút phân trang sản phẩm
  updateProductsPaginationActions(countProductItem);

  // Thiết lập hành động có thể xem "Chi tiết" cho các sản phẩm trong danh sách
  getProductItemInfo();
}

// Khi người dùng chuyển đến trang Sản phẩm thì các hành động sẽ được thực thi
export function getProductListInfo() {
  /* Cập nhật lại tên danh mục hiện tại và tên sản phẩm cần tìm kiếm hiện
  tại mỗi khi nhấn trở lại Sản phẩm */
  currentProductListKey = "";
  currentProductItemName = "";

  // Gọi các sự kiện để cập nhật Danh sách sản phẩm
  getLeftSearchInfo();
  getLeftFilterInfo();
  getLeftMenuInfo();
}
