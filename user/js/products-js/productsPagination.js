//Hàm cập nhật lại productsPaginationScript
export function updateProductsPaginationActions(numbersOfProductItem) {
  // Hàm gán style cho mainProductsBodyStyle
  function assignMainProductsBodyStyleForSmallNumberofProducts(mainProductsBodyStyle, currentPage) {
    mainProductsBodyStyle.innerHTML = `
        .body__products .main-products__list {
          transform: translateY(calc(-${currentPage - 1}00% - ${currentPage - 1} * 48px));
        }
      `;

    document
      .querySelector(".body__products .main-products__number.active")
      .classList.remove("active");
      
    document
      .querySelector(
        `.body__products .main-products__number[data-page="${currentPage}"]`
      )
      .classList.add("active");
  }

  function assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage) {
    mainProductsBodyStyle.innerHTML = `
        .body__products .main-products__list {
          transform: translateY(calc(-${currentPage - 1}00% - ${currentPage - 1} * 48px));
        }
      `;
  }


  // Lớp div bao các STT trang ở giữa
  const numbersDiv = document.getElementById("main-products-numbers");

  // Số sản phẩm mỗi trang
  const productsPerPage = 6;
  
  // Tổng số trang
  const totalPage = Math.ceil(numbersOfProductItem / productsPerPage);

  // Số trang tối đa
  let maxPages = 7;
  // (3 <= maxPages <= totalPages)
  maxPages = Math.max(maxPages, 3);
  maxPages = Math.min(maxPages, totalPage);

  // Số trang tối đa hiển thị ở giữa (firstPage ... maxMiddlePages ... lastPage)
  const maxMiddlePages = maxPages - 2;

  // Số trang phía bên trái
  const leftSidePages = Math.floor((maxMiddlePages - 1) / 2);

  // Trang đầu tiên và cuối cùng
  const firstPage = 1;
  const lastPage = totalPage;

  // Trang hiện tại
  let currentPage = 1;

  /*-----------MAIN_FUNCTION-----------*/
  // Tạo các nút trang
  function createPageButtons(currentPage) {
    numbersDiv.innerHTML = "";

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
  // Tạo element 'button' cho trang ${index}
  function createPageButtonELe(index) {
    const numberButton = document.createElement("button");
    numberButton.className = "main-products__number";
    numberButton.textContent = `${index}`;
    numberButton.dataset.page = `${index}`;
    if (currentPage === index) {
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
  // -> chỉ cần hiển thị trang bình thường, không cần chấm lửng
  function handleLessEuqalThanMaxPages() {
    for (let i = firstPage; i <= lastPage; i++) {
      createPageButtonELe(i);
    }
  }


  // Phân trang lần đầu tiên
  if (totalPage <= maxPages) {
    handleLessEuqalThanMaxPages();
  } else {
    createPageButtons(currentPage);
  }


  // Kiểm tra thẻ mainProductsBodyStyle có tồn tại hay không và xoá đi
  const mainProductsBodyExistingStyle = document.querySelector(
    ".main-products-body-style"
  );
  if (mainProductsBodyExistingStyle) {
    mainProductsBodyExistingStyle.remove();
  }
  // Thêm thẻ mainProductsBodyStyle mới
  const mainProductsBodyStyle = document.createElement("style");
  mainProductsBodyStyle.className = "main-products-body-style";

  // Nếu nhấn vào nút chuyển sang trái
  document
    .getElementById("main-products-left-button")
    .addEventListener("click", function () {
      if (currentPage > 1 && currentPage <= totalPage) {
        window.scrollTo(0, 0);
        
        currentPage--;
        
        if (totalPage > maxPages) {
          assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
          createPageButtons(currentPage);
        } else{
          assignMainProductsBodyStyleForSmallNumberofProducts(mainProductsBodyStyle, currentPage);
        }
      }
    });

  // Nếu nhấn vào nút chuyển trang là số thứ tự
  document
    .getElementById("main-products-numbers")
    .addEventListener("click", (event) => {
      if (event.target.matches("button.main-products__number")){
        window.scrollTo(0, 0);

        currentPage = parseInt(event.target.getAttribute("data-page"), 10);

        if (totalPage > maxPages) {
          assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
          createPageButtons(currentPage);
        } else{
          assignMainProductsBodyStyleForSmallNumberofProducts(mainProductsBodyStyle, currentPage);
        }
      }
    });

  // Nếu nhấn vào nút chuyển sang phải
  document
    .getElementById("main-products-right-button")
    .addEventListener("click", function () {
      if (currentPage >= 1 && currentPage < totalPage) {
        window.scrollTo(0, 0);

        currentPage++;
        
        if (totalPage > maxPages) {
          assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
          createPageButtons(currentPage);
        } else{
          assignMainProductsBodyStyleForSmallNumberofProducts(mainProductsBodyStyle, currentPage);
        }
      }
    });

  document.head.appendChild(mainProductsBodyStyle);
}
