import { showPaginatedProducts } from "./showPaginatedProducts.js";

/*-----------FUNCTION-----------*/
// Xử lý focus, unfocus nút trang
function focusCurrentPage(currentPage) {
  // Chọn page element đã 'focus' trước đó để 'unfocus'
  const unFocus = document.querySelector(
    ".body__products .main-products__number.active"
  );

  if (unFocus) {
    unFocus.classList.remove("active");
  } else {
    console.log(`Cant find class="active"`);
  }

  // Chọn page element hiện tại để 'focus'
  const focus = document.querySelector(
    `.body__products .main-products__number[data-page="${currentPage}"]`
  );

  if (focus) {
    focus.classList.add("active");
  } else {
    console.log(`Cant find page${currentPage}`);
  }
}

/*-----------MAIN_FUNCTION-----------*/
//Hàm cập nhật phân trang
export function updateProductsPagination(
  filteredProducts,
  filteredProductsLength
) {
  
  // Lớp div chứa các nút trang
  const numbersDiv = document.getElementById("main-products-numbers");

  // Số sản phẩm mỗi trang
  const productsPerPage = 9;

  // Tổng số trang
  const totalPages = Math.ceil(filteredProductsLength / productsPerPage);

  // Số trang tối đa có thể hiển thị
  let maxPages = 7;
  // Ràng buộc: {3 <= maxPages <= totalPages}
  maxPages = Math.max(maxPages, 3);
  maxPages = Math.min(maxPages, totalPages);

  // Số trang tối đa có thể hiển thị ở giữa (firstPage ... maxMiddlePages ... lastPage)
  const maxMiddlePages = maxPages - 2;

  // Số trang phía bên trái so với currentPage
  const leftSidePages = Math.floor((maxMiddlePages - 1) / 2);

  // Trang đầu tiên và cuối cùng
  const firstPage = 1;
  const lastPage = totalPages;

  // Trang hiện tại
  let currentPage = 1;

  // Phân trang lần đầu tiên
  if (totalPages <= maxPages) {
    handleLessEuqalThanMaxPages();
  } else {
    createPageButtons(currentPage);
  }
  updatePage(currentPage);

  /*-----------FUNCTION-----------*/
  // Cập nhật lại trang (hiển thị sản phẩm, các nút trang)
  function updatePage(currentPage) {
    window.scrollTo(0, 0);
    const paginatedProducts = filteredProducts.slice(
      productsPerPage * (currentPage - 1),
      productsPerPage * currentPage
    );

    // Hiển thị sản phẩm trên 1 trang
    showPaginatedProducts(paginatedProducts);

    if (totalPages <= maxPages) {
      // Các nút trang có sẵn, không cần tạo lại
      // Chỉ cần focus vào currentPage
      focusCurrentPage(currentPage);
    } else {
      // Tạo lại các nút trang
      createPageButtons(currentPage);
    }
  }

  /*-----------FUNCTION-----------*/
  // Tạo các nút trang
  function createPageButtons(currentPage) {
    numbersDiv.innerHTML = "";

    // Mặc định sẽ luôn có firstPage và lastPage
    // Chỉ cần tính toán cho các trang hiện thị ở giữa
    let start = Math.max(currentPage - leftSidePages, 2);
    let end = start + maxMiddlePages - 1;

    if (end > lastPage - 1) {
      start -= end - (lastPage - 1);
      end = lastPage - 1;
    }

    // Tạo trang đầu tiên
    createPageButtonELe(firstPage);

    // Tạo các trang giữa
    createMiddlePageButtons(start, end);

    // Tạo trang cuối cùng
    createPageButtonELe(lastPage);
  }

  /*-----------FUNCTION-----------*/
  // Tạo element 'button' cho trang thứ ${index}
  function createPageButtonELe(index) {
    const numberButton = document.createElement("button");
    numberButton.className = "main-products__number";
    numberButton.textContent = `${index}`;
    numberButton.dataset.page = `${index}`;

    if (currentPage === index) {
      // Focus vào nút trang
      numberButton.classList.add("active");
    }

    numbersDiv.appendChild(numberButton);
  }

  /*-----------FUNCTION-----------*/
  // Tạo các nút trang ở giữa - (không bao gồm firstPage và lastPage)
  function createMiddlePageButtons(start, end) {
    if (start > firstPage + 1) {
      createEllipsis();
    }

    for (let i = start; i <= end; i++) {
      createPageButtonELe(i);
    }

    if (end < lastPage - 1) {
      createEllipsis();
    }
  }

  /*-----------FUNCTION-----------*/
  // Tạo dấu chấm lửng
  function createEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.classList.add("ellipsis");
    numbersDiv.appendChild(span);
  }

  /*-----------FUNCTION-----------*/
  // Khi tổng trang <= số trang hiển thị tối đa
  // totalPages <= maxPages
  // -> chỉ cần hiển thị các nút trang bình thường, không cần dấu chấm lửng
  function handleLessEuqalThanMaxPages() {
    numbersDiv.innerHTML = "";
    for (let i = firstPage; i <= lastPage; i++) {
      createPageButtonELe(i);
    }
  }

  // Nếu nhấn vào nút chuyển sang trái
  document
    .getElementById("main-products-left-button")
    .addEventListener("click", function () {
      if (currentPage > 1 && currentPage <= totalPages) {
        currentPage--;
        updatePage(currentPage);
      }
    });

  // Nếu nhấn vào nút chuyển trang là số thứ tự
  document
    .getElementById("main-products-numbers")
    .addEventListener("click", (event) => {
      if (event.target.matches("button.main-products__number")) {
        currentPage = parseInt(event.target.getAttribute("data-page"), 10);
        updatePage(currentPage);
      }
    });

  // Nếu nhấn vào nút chuyển sang phải
  document
    .getElementById("main-products-right-button")
    .addEventListener("click", function () {
      if (currentPage >= 1 && currentPage < totalPages) {
        currentPage++;
        updatePage(currentPage);
      }
    });
}
