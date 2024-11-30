import { getProductItemInfo } from "./getProductItem.js";
import { updateLeftMenuStyle } from "./productsPageStyles.js";
import { updateProductsPagination } from "./productsPagination.js";
import { resetDoubleSlider } from "./generateFilter.js";
// Hàm format lại các tên theo kiểu "a-b-c"
import { replaceSpaceWithHyphen } from "../common-js/common.js";

// Từ khoá chỉ tên sản phẩm cần tìm kiếm hiện tại
let productItemName = "";
// Từ khoá chỉ danh mục hiện tại
let productListKey = "";

// Hàm lấy thông tin từ Left Search (Tìm kiếm - Tìm kiếm cơ bản)
function getLeftSearchInfo() {
  // Lắng nghe sự kiện từ trường tìm kiếm
  const leftSearchInput = document.querySelector("#left-search-input");
  leftSearchInput.addEventListener("input", () => {
    // Đưa về đầu trang
    window.scrollTo(0, 0);

    // Cập nhập lại tên hiện tại của sản phẩm cần tìm
    productItemName = leftSearchInput.value.trim().toLowerCase();
    filteredProducts = filterProducts();
    updateProductList(filteredProducts);
  });
}

// Các hãng đã chọn
let chosenBrands = [];
// Khoảng giá đã chọn
let chosenPrice = "";
// Loại sắp xếp đã chọn
let chosenSort = "";
// Giá thấp nhất
let minPrice = 0;
// Giá cao nhất
let maxPrice = 2 ** 31;
// Trạng thái đã chọn
let chosenStatus = "";
// Danh sách sản phẩm đã lọc
let filteredProducts = [];
// Kích hoạt bộ lọc
function activateFilterSearch(){
  // Đưa về đầu trang
  window.scrollTo(0, 0);

  // Các checked elements
  const chosenBrandsEle = Array.from(
    document.querySelectorAll(
      `.left-search-filter__brand [name="brand"]:checked`
    )
  );

  chosenBrands = chosenBrandsEle.map((brandEle) => brandEle.value);
  chosenSort = document.forms["left-search-filter__form"].sort.value;
  chosenPrice = document.forms["left-search-filter__form"].price.value;
  chosenStatus = document.forms["left-search-filter__form"].state.value;

  // Reset khung tìm kiếm
  document.querySelector("#left-search-input").value = "";
  productItemName = "";

  filteredProducts = filterProducts();
  updateProductList(filteredProducts);
}
// Đặt lại các tiêu chí lọc
function resetFilter(){
  document.querySelectorAll(`.left-search-filter__form input:checked`).forEach((ele) => {
    ele.checked = false;
  });
}
// Hàm so sánh dựa theo 'attribute' và 'sortType' để sắp xếp
function customSort(attribute, sortType){
  return function cmpFn(firstProduct, secondProduct){
    if(sortType === 'asc'){
      if(firstProduct[attribute] < secondProduct[attribute]){
        return -1;
      } else{
        return 1;
      }
    }

    if(sortType === 'desc'){
      if(firstProduct[attribute] > secondProduct[attribute]){
        return -1;
      } else{
        return 1;
      }
    }
  }
}
// Hàm lấy thông tin từ Left Filter (Bộ lọc - Tìm kiếm nâng cao)
function getLeftFilterInfo() {
  const applyButton = document.getElementById("left-search-filter__apply");
  applyButton.addEventListener("click", (event) => {
    event.preventDefault();
    activateFilterSearch();
  });

  const resetButton = document.getElementById("left-search-filter__reset");
  resetButton.addEventListener("click", () => {
    event.preventDefault();
    resetFilter();
    resetDoubleSlider();
    activateFilterSearch();
  });
}

// Hàm lấy thông tin từ Left Menu (Danh mục - Phân chia sản phẩm)
function getLeftMenuInfo() {
  const leftMenuList = document.getElementById("left-menu-list");
  // Tạo sự kiện có thể nhấn vào cho các danh mục con
  leftMenuList.addEventListener("click", (event) => {
    // Đưa về đầu trang
    window.scrollTo(0, 0);

    // Nếu nhấn vào một mục con trong "Danh mục sản phẩm"
    if (event.target.matches("a.left-menu__action")) {
      const leftMenuValue = event.target.getAttribute("data-menu-product");
      if (leftMenuValue) {
        // Đặt lại bộ lọc
        document.getElementById("left-search-filter__reset").click();

        // Kiểm tra và đặt lại giá trị cho currentProductItemName và thẻ input ở Left Search
        const leftSearchInput = document.getElementById("left-search-input");
        if (leftSearchInput.value) {
          leftSearchInput.value = "";
          productItemName = "";
        }

        // Cập nhật lại leftMenuStyle
        updateLeftMenuStyle(leftMenuValue);

        // Cập nhật danh sách sản phẩm
        productListKey = leftMenuValue;
        filteredProducts = filterProducts();
        updateProductList(filteredProducts);
      }
    }
  });
}

// Hàm lấy ra các sản phẩm sau khi lọc từ 3 mục Tìm kiếm, Bộ lọc và Danh mục
function filterProducts() {
  const chosenBrandsLength = chosenBrands.length;
  if (chosenPrice) {
    const tmpString = chosenPrice.split("-");
    minPrice = parseInt(tmpString[0], 10);
    if (tmpString[1] === "INF") {
      maxPrice = 2 ** 31;
    } else {
      maxPrice = parseInt(tmpString[1], 10);
    }
  } else {
    minPrice = document.getElementById("min-price").value;
    maxPrice = document.getElementById("max-price").value;
    minPrice = parseInt(minPrice.replace(/\./g, ""), 10);
    maxPrice = parseInt(maxPrice.replace(/\./g, ""), 10);
  }
  const productList = JSON.parse(localStorage.getItem("productList"));
  const filteredProducts = productList.filter((product) => {
    if (productListKey !== "tat-ca" && productListKey !== product.categoryID) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (
      chosenBrandsLength > 0 &&
      !chosenBrands.includes(replaceSpaceWithHyphen(product.brand))
    ) return false;

    if (!product.name.toLowerCase().includes(productItemName)) return false;

    // Chưa xét phần trạng thái
    return true;
  });

  if (chosenSort) {
    const tmpString = chosenSort.split("-");
    filteredProducts.sort(customSort(tmpString[0], tmpString[1]));
  }

  return filteredProducts;
}

// Hàm trở về danh sách sản phẩm trước đó khi nhấn "Quay lại" ở trang Chi tiết
export function comebackProductList() {
  updateProductList(filteredProducts);
}

// Danh sách các sản phẩm được hiển thị theo tìm kiếm, bộ lọc, danh mục
export function updateProductList(filteredProducts) {
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

  // Độ dài danh sách sản phẩm đã lọc
  const filteredProductsLength = filteredProducts.length;
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
    listDiv.style.minHeight = "558px";
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
  productListKey = "";
  productItemName = "";
  chosenBrands = [];
  chosenPrice = "";
  chosenSort = "";
  chosenStatus = "";
  minPrice = 0;
  maxPrice = 2 ** 31;
  
  // Gọi các sự kiện để cập nhật Danh sách sản phẩm
  getLeftSearchInfo();
  getLeftFilterInfo();
  getLeftMenuInfo();
}
