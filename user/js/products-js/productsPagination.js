//Hàm cập nhật lại productsPaginationScript
export function updateProductsPaginationActions(numbersOfProductItem) {
  // Hàm gán style cho mainProductsBodyStyle
  function assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage) {
    mainProductsBodyStyle.innerHTML = `
        .body__products .main-products__list {
            transform: translateY(calc(-${currentPage - 1}00% - ${
      currentPage - 1
    } * 48px));
        }
        .body__products .main-products__number:first-of-type {
            background: transparent;
            color: #000;
        }
        .body__products .main-products__number:nth-of-type(${currentPage}) {
            background: #fc8eac;
            color: #fff;
        }
    `;
  }

  // Tổng số trang sản phẩm
  const totalPage = Math.ceil(numbersOfProductItem / 6);

  // Trang hiện tại
  let currentPage = 1;

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
        currentPage--;
        assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
        window.scrollTo(0, 0);
      }
    });
  // Nếu nhấn vào nút chuyển trang là số thứ tự
  document
    .getElementById("main-products-numbers")
    .addEventListener("click", (event) => {
      if (event.target.matches("button.main-products__number")){
        currentPage = parseInt(event.target.textContent, 10);
        assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
        window.scrollTo(0, 0);
      }
    });

  // Nếu nhấn vào nút chuyển sang phải
  document
    .getElementById("main-products-right-button")
    .addEventListener("click", function () {
      if (currentPage >= 1 && currentPage < totalPage) {
        currentPage++;
        assignMainProductsBodyStyle(mainProductsBodyStyle, currentPage);
        window.scrollTo(0, 0);
      }
    });

  document.head.appendChild(mainProductsBodyStyle);
}
