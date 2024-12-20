import { updateProductItem } from "../products-js/getProductItem.js";
import { updateProductList } from "../products-js/getProductList.js";
import { updateMainContent } from "./changeMainContent.js";
import { updateNavbarStyle } from "../common-js/common.js";

let headerHasProductSuggestion = false;
let headerSearchTerm = "";

/*-----------FUNCTION-----------*/
// Đi vào chi tiết sản phẩm khi bấm vào gợi ý
function goToProductDetails(key, headerSearchTerm) {
  updateMainContent("products");
  updateNavbarStyle("products");

  const findContainer = document.querySelector(".header__find-container");
  findContainer.remove();

  const leftSearchInput = document.getElementById("left-search-input");
  leftSearchInput.value = headerSearchTerm;
  leftSearchInput.focus();
  updateProductItem(key);
}

/*-----------FUNCTION-----------*/
// Đi vào trang sản phẩm với từ khoá
function goToProductPageWithHeaderSearchTerm(headerSearchTerm) {
  updateMainContent("products");
  updateNavbarStyle("products");

  const findContainer = document.querySelector(".header__find-container");
  findContainer.remove();

  const leftSearchInput = document.getElementById("left-search-input");
  leftSearchInput.value = headerSearchTerm;
  leftSearchInput.focus();

  const filteredProducts = filterProducts(headerSearchTerm);
  updateProductList(filteredProducts, 1);
}

/*-----------FUNCTION-----------*/
// Reset lại khung tìm kiếm ở header
function resetFindBlock() {
  const searchInput = document.getElementById("find-input");
  const suggestionsList = document.getElementById("suggestions-list");
  if(searchInput){
    searchInput.value = "";
  }
  if(suggestionsList){
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
  }
}

/*-----------FUNCTION-----------*/
// Thêm sự kiện cho các elements
function setupEventListeners() {
  // Lớp bao thanh tìm kiếm và danh sách gợi ý
  const userBlock = document.getElementById("find-block");

  // Thanh tìm kiếm
  const searchInput = document.getElementById("find-input");

  // Nút tìm kiếm
  // const searchButton = document.getElementById("find-action");

  // Danh sách gợi ý
  const suggestionsList = document.getElementById("suggestions-list");

  /*--------EVENT--------*/
  // Sự kiện 'input' ở thanh tìm kiếm
  searchInput.addEventListener("input", headerSearch);

  /*--------EVENT--------*/
  // Sự kiện 'click' ở nút 'Tìm'
  // searchButton.addEventListener("click", () => {
  //   if (headerHasProductSuggestion) {
  //     goToProductPageWithHeaderSearchTerm(headerSearchTerm);
  //   } else {
  //     headerSearchTerm = "";
  //     goToProductPageWithHeaderSearchTerm(headerSearchTerm);
  //   }

  //   resetFindBlock();
  // });

  /*--------EVENT--------*/
  // Sự kiện 'keypress' nút 'ENTER'
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (headerHasProductSuggestion) {
        goToProductPageWithHeaderSearchTerm(headerSearchTerm);
      } else {
        headerSearchTerm = "";
        goToProductPageWithHeaderSearchTerm(headerSearchTerm);
      }

      resetFindBlock();
    }
  });

  /*--------EVENT--------*/
  // Sự kiện 'click' vào sản phẩm gợi ý
  suggestionsList.addEventListener("click", (event) => {
    const closestLi = event.target.closest("#suggestions-list li");
    // setTimeout dùng để hiện hiệu ứng nhấn khi dùng màn hình cảm ứng
    if (closestLi) {
      if (closestLi.matches(".HeaderSearch__show-more-products")) {
        // Bấm vào nút "hiển thị thêm"
        setTimeout(() => {
          goToProductPageWithHeaderSearchTerm(headerSearchTerm);
          resetFindBlock();
        }, 100);
      } else if (closestLi.matches(".HeaderSearch__product-not-found")) {
        // Bấm vào nút 'sản phẩm khác'
        headerSearchTerm = "";
        setTimeout(() => {
          goToProductPageWithHeaderSearchTerm(headerSearchTerm);
          resetFindBlock();
        }, 100);
      } else {
        // Bấm vào sản phẩm gợi ý
        const key = parseInt(
          closestLi.getAttribute("data-index"),
          10
        );
        setTimeout(() => {
          goToProductDetails(key, headerSearchTerm);
          resetFindBlock();
        }, 100);
      }
    }
  });
}

/*-----------FUNCTION-----------*/
// Hàm gọi các hàm để xử lý tìm kiếm
function headerSearch() {
  const searchInput = document.getElementById("find-input");
  headerHasProductSuggestion = false;
  headerSearchTerm = searchInput.value.trim().toLowerCase();
  const filteredProducts = filterProducts(headerSearchTerm);
  showProductSuggestions(filteredProducts, headerSearchTerm);
}

/*-----------FUNCTION-----------*/
// Lọc sản phẩm
function filterProducts(headerSearchTerm) {
  const productList = JSON.parse(localStorage.getItem("productList"));
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(headerSearchTerm)
  );
  return filteredProducts;
}

/*-----------FUNCTION-----------*/
// Hiển thị các sản phẩm gợi ý
function showProductSuggestions(filteredProducts, headerSearchTerm) {
  const limitQuantity = 5;
  const suggestionsList = document.getElementById("suggestions-list");
  suggestionsList.innerHTML = "";
  const filteredProductsLength = filteredProducts.length;
  
  // Tìm thấy sản phẩm
  if(filteredProductsLength > 0){
    headerHasProductSuggestion = true;
    // Giới hạn hiện thị sản phẩm
    for(let i = 0; i < Math.min(5, filteredProductsLength); i++){
      const li = createSuggestionLi(filteredProducts[i]);
      suggestionsList.appendChild(li);
    }

    // Xem thêm các sản phẩm
    if(filteredProductsLength > limitQuantity){
      const li = document.createElement("li");
      li.className = "HeaderSearch__show-more-products";
      li.innerHTML = `
        <span>Xem thêm ${filteredProductsLength - limitQuantity} sản phẩm</span>
      `;
      suggestionsList.appendChild(li);
    }
    suggestionsList.style.display = "block";
  } else{ 
    // Không tìm thấy sản phẩm
    const li = document.createElement("li");
    li.className = "HeaderSearch__product-not-found";
  
    li.innerHTML = `
      <span>Không tìm thấy sản phẩm...</span><br>
      <span>Xem các sản phẩm khác</span>
    `;
  
    suggestionsList.appendChild(li);
    
  }
  suggestionsList.style.display = "block";
  if(headerSearchTerm === ""){
    suggestionsList.style.display = "none";
  }
  suggestionsList.scrollTo(0, 0);
}

/*-----------FUNCTION-----------*/
// Tạo các thẻ <li> cho sản phẩm
function createSuggestionLi(product) {
  const li = document.createElement("li");

  li.dataset.index = product.number;

  li.innerHTML = `
      <img src="${product.src}" alt="${product.name}" />
      <span>${product.name}</span>
  `;

  return li;
}

/*-----------EXPORT_FUNCTION-----------*/
// Sự kiện khi người dùng nhấn vào icon tìm kiếm trên Header
// export function showFindFormInMenuHeader() {
//   document.getElementById("find-click").addEventListener("click", function () {
//     if (document.querySelector(".header__user-menu")) {
//       document.querySelector(".header__user-menu").remove();
//     }
//     if (
//       getComputedStyle(userBlock).getPropertyValue("visibility") === "visible"
//     ) {
//       userBlock.style.visibility = "hidden";
//     } else {
//       userBlock.style.visibility = "visible";
//       searchInput.focus();
//     }
//   });

//   setupEventListeners();
// }

// Ẩn đi form Đăng nhập - Đăng ký
function unShowFindFormInMenuHeader() {
  const findContainer = document.querySelector(".header__find-container");
  document
    .querySelector(".header__find-overlay")
    .addEventListener("click", function () {
      findContainer.remove();
    });
  document
    .querySelector(".header__find-exit")
    .addEventListener("click", function () {
      findContainer.remove();
    });
}

export function showFindFormInMenuHeader() {
  document.getElementById("find-click").addEventListener("click", function () {
    if (document.querySelector(".header__user-menu")) {
      document.querySelector(".header__user-menu").remove();
    }

    const findContainerInner = `
          <div class="header__find-block" id="find-block">
            <div class="header__find-header">
              <h2 class="header__find-title">TÌM KIẾM</h2>
              <button class="header__find-exit" id="find-exit">x</button>
            </div>
            <div class="header__find-body">
              <input
                type="text"
                name="find-input"
                id="find-input"
                class="header__find-input"
                placeholder="Tìm kiếm sản phẩm..."
                autocomplete="off"
              />
              <ul id="suggestions-list"></ul>
            </div>
          </div>
        <div class="header__find-overlay"></div>
  `;
    const findContainerDiv = document.createElement("div");
    findContainerDiv.className = "header__find-container";
    findContainerDiv.id = "find-container";
    findContainerDiv.innerHTML = findContainerInner;
    document.body.appendChild(findContainerDiv);

    document.getElementById("find-input").focus();
    unShowFindFormInMenuHeader();

    setupEventListeners();
  });
}
