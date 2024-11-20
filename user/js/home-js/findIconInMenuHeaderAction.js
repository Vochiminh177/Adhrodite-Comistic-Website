import { productItemArray } from "../../../database/database.js";
import { updateProductItem } from "../products-js/getProductItem.js";
import { updateMainContent } from "../home-js/changeMainContent.js";
import { updateProductList } from "../products-js/getProductList.js";

// Lớp bao thanh tìm kiếm và danh sách gợi ý
const userBlock = document.getElementById("find-block-wrapper");

// Thanh tìm kiếm
const searchInput = document.getElementById("find-header");

// Nút tìm kiếm
const searchButton = document.getElementById("find-action");

// Danh sách gợi ý
const suggestionsList = document.getElementById("suggestions-list");

let hasProductSuggestion = false;
let searchTerm = "";

/*-----------FUNCTION-----------*/
// Đi vào chi tiết sản phẩm khi bấm vào gợi ý
function goToProductDetails(productItemKey) {
  updateMainContent("products");
  updateProductItem(productItemKey);
  document.getElementById("left-search-input").focus();
}

/*-----------FUNCTION-----------*/
// Đi vào trang sản phẩm với từ khoá
function goToProductPageWithSearchTerm(searchTerm) {
  updateMainContent("products");
  const leftSearchInput = document.getElementById("left-search-input");
  leftSearchInput.value = searchTerm;
  leftSearchInput.focus();
  const filteredProducts = filterProducts(searchTerm);
  updateProductList(filteredProducts);
}

/*-----------FUNCTION-----------*/
// Reset lại khung tìm kiếm ở header
function resetFindBlock() {
  userBlock.style.visibility = "hidden";
  searchInput.value = "";
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";
}

/*-----------FUNCTION-----------*/
// Thêm sự kiện cho các elements
function setupEventListeners() {
  /*--------EVENT--------*/
  // Sự kiện 'click' ở nút 'Tìm'
  searchButton.addEventListener("click", () => {
    if (hasProductSuggestion) {
      goToProductPageWithSearchTerm(searchTerm);
    } else {
      searchTerm = "";
      goToProductPageWithSearchTerm(searchTerm);
    }

    resetFindBlock();
  });

  /*--------EVENT--------*/
  // Sự kiện 'keypress' nút 'ENTER'
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (hasProductSuggestion) {
        goToProductPageWithSearchTerm(searchTerm);
      } else {
        searchTerm = "";
        goToProductPageWithSearchTerm(searchTerm);
      }

      resetFindBlock();
    }
  });

  /*--------EVENT--------*/
  // Sự kiện 'click' vào sản phẩm gợi ý
  suggestionsList.addEventListener("click", (event) => {
    const closestLi = event.target.closest("#suggestions-list li");

    if (closestLi) {
      if (closestLi.matches(".HeaderSearch__show-more-products")) {
        // Bấm vào nút "hiển thị thêm"
        goToProductPageWithSearchTerm(searchTerm);
      } else if (closestLi.matches(".HeaderSearch__product-not-found")) {
        // Bấm vào nút 'sản phẩm khác'
        searchTerm = "";
        goToProductPageWithSearchTerm(searchTerm);
      } else {
        // Bấm vào sản phẩm gợi ý
        const productItemKey = parseInt(
          closestLi.getAttribute("data-index"),
          10
        );
        goToProductDetails(productItemKey);
      }

      resetFindBlock();
    }
  });

  /*--------EVENT--------*/
  // Sự kiện 'input' ở thanh tìm kiếm
  searchInput.addEventListener("input", headerSearch);
}

/*-----------FUNCTION-----------*/
// Hàm gọi các hàm để xử lý tìm kiếm
function headerSearch() {
  hasProductSuggestion = false;
  searchTerm = searchInput.value.trim().toLowerCase();
  const filteredProducts = filterProducts(searchTerm);
  showProductSuggestions(filteredProducts, searchTerm);
}

/*-----------FUNCTION-----------*/
// Lọc sản phẩm
function filterProducts(searchTerm) {
  const filteredProducts = productItemArray.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  return filteredProducts;
}

/*-----------FUNCTION-----------*/
// Hiển thị các sản phẩm gợi ý
function showProductSuggestions(filteredProducts, searchTerm) {
  suggestionsList.innerHTML = "";
  const firstFiveSuggestions = filteredProducts.slice(0, 5);
  if (searchTerm && firstFiveSuggestions.length > 0) {
    hasProductSuggestion = true;
    showFirstFiveSuggestions(firstFiveSuggestions);

    if (filteredProducts.length > 5) {
      handleMoreThanFiveSuggestions(searchTerm);
    }

    suggestionsList.style.display = "block";
    suggestionsList.scrollTo(0, 0);
  } else if (searchTerm) {
    handleSuggestionNotFound();

    suggestionsList.style.display = "block";
  } else {
    suggestionsList.style.display = "none";
  }
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

/*-----------FUNCTION-----------*/
// Hiện ra 5 sản phẩm gợi ý đầu tiên
function showFirstFiveSuggestions(firstFiveSuggestions) {
  firstFiveSuggestions.forEach((product) => {
    const li = createSuggestionLi(product);

    suggestionsList.appendChild(li);
  });
}

/*-----------FUNCTION-----------*/
// Nếu lượng sản phẩm gợi ý lớn hơn 5, hiện nút "tìm kiếm thêm"
function handleMoreThanFiveSuggestions(searchTerm) {
  const li = document.createElement("li");

  li.className = "HeaderSearch__show-more-products";
  li.innerHTML = `
    <span>Tìm kiếm thêm cho '${searchTerm}'</span>
  `;
  suggestionsList.appendChild(li);
}

/*-----------FUNCTION-----------*/
// Khi không tìm thấy sản phẩm
function handleSuggestionNotFound() {
  const li = document.createElement("li");
  li.className = "HeaderSearch__product-not-found";

  li.innerHTML = `
    <span>Không tìm thấy kết quả</span><br>
    <span>Xem các sản phẩm khác</span>
  `;

  suggestionsList.appendChild(li);
}

/*-----------EXPORT_FUNCTION-----------*/
// Sự kiện khi người dùng nhấn vào icon tìm kiếm trên Header
export function showFindFormInMenuHeader() {
  document.getElementById("find-click").addEventListener("click", function () {
    if (
      getComputedStyle(userBlock).getPropertyValue("visibility") === "visible"
    ) {
      userBlock.style.visibility = "hidden";
    } else {
      userBlock.style.visibility = "visible";
      searchInput.focus();
    }
  });

  setupEventListeners();
}
