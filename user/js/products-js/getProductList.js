import { productItemArray } from "../common-js/database.js";
import { getProductItemInfo } from "./getProductItem.js";
import { updateLeftMenuStyle } from "./productsPageStyles.js";
import { updateProductsPagination } from "./productsPagination.js";

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
  const leftMenuList = document.getElementById('left-menu-list');
  // Tạo sự kiện có thể nhấn vào cho các danh mục con
  leftMenuList.addEventListener('click', (event) =>{
    window.scrollTo(0, 0);
    
    if(event.target.matches('a.left-menu__action')){
      const leftMenuValue =
        event.target.getAttribute("data-menu-product");
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
    }
  });
}

// Hàm trở về danh sách sản phẩm trước đó khi nhấn "Quay lại" ở trang Chi tiết
export function comebackProductList() {
  updateProductList(currentProductItemName, currentProductListKey);
}

let filteredProductsLength = 0;
function filterProducts(productItemName, productListKey) {
  filteredProductsLength = 0;
  const filteredProducts = productItemArray.filter((product) => {
    if (
      (productListKey === "tat-ca" || productListKey === product.categoryID) &&
      product.name.toLowerCase().includes(productItemName)
    ) {
      filteredProductsLength++;
      return true;
    }

    return false;
  });

  return filteredProducts;
}

// Danh sách các sản phẩm được hiển thị theo tìm kiếm, bộ lọc, danh mục
export function updateProductList(productItemName, productListKey) {
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

  const filteredProducts = filterProducts(productItemName, productListKey);

  if (filteredProductsLength > 0) {
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
    numbersDiv.id = "main-products-numbers";
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
    listDiv.style.minHeight = '558px';
    // Inform
    let pInform = document.createElement("p");
    pInform.className = "main-products__inform";
    pInform.textContent = "KHÔNG CÓ SẢN PHẨM NÀO TRONG DANH SÁCH";
    listDiv.innerHTML = "";
    listDiv.appendChild(pInform);
    bodyDiv.appendChild(listDiv);
  }

  mainProductsDiv.appendChild(bodyDiv);
  const productsMainDiv = document.getElementById("products-main");
  productsMainDiv.innerHTML = "";
  productsMainDiv.appendChild(mainProductsDiv);

  if (filteredProductsLength > 0) {
    // Cập nhật hành động cho các nút phân trang sản phẩm
    updateProductsPagination(filteredProducts, filteredProductsLength);
  }
  
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
