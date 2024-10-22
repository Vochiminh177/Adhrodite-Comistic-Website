// Hàm cập nhật lại leftMenuStyle
export function updateLeftMenuStyle(leftMenuValue) {
  // Kiểm tra và xoá đi thẻ style (Left Menu Style) tồn tại từ trước
  const leftMenuExistingStyle = document.querySelector(".left-menu-style");
  if (leftMenuExistingStyle) {
    leftMenuExistingStyle.remove();
  }
  // Tạo một thẻ style (Left Menu Style) mới
  const leftMenuStyle = document.createElement("style");
  leftMenuStyle.className = "left-menu-style";
  leftMenuStyle.innerHTML = `
  .body__products .left-menu__action#${leftMenuValue}-left-menu {
    color: #fc8eac;
  }
  .body__products .left-menu__action#${leftMenuValue}-left-menu::before {
    background-color: #fc8eac;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu) {
    color: #000;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu)::before {
    background-color: #000;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu):hover {
    color: #fc8eac;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu):hover::before {
    background: #fc8eac;
  }
`;
  document.head.appendChild(leftMenuStyle);
}

// Hàm cập nhật lại mainProductsListStyle
export function updateMainProductsListStyle(numbersOfProductItem) {
  // Kiểm tra thẻ mainProductsListStyle có tồn tại hay không và xoá đi
  const mainProductsListExistingStyle = document.querySelector(
    ".main-products-list-style"
  );
  if (mainProductsListExistingStyle) {
    mainProductsListExistingStyle.remove();
  }
  // Thêm thẻ mainProductsListStyle mới
  const mainProductsListStyle = document.createElement("style");
  mainProductsListStyle.className = "main-products-list-style";
  // - Tuỳ vào số lượng sản phẩm thêm mainProductsListStyle tương ứng
  if (numbersOfProductItem >= 4) {
    mainProductsListStyle.innerHTML = `
        .body__products .main-products__list {
          flex-wrap: wrap;
          height: 856px;
        }
        .body__products .main-products__item {
          height: calc(100% / 2 - 24px);
        }
      `;
  } else if (numbersOfProductItem >= 1) {
    mainProductsListStyle.innerHTML = `
        .body__products .main-products__list {
          /* 428px - 24px (để tối ưu hiển thị với trường hợp trên) */
          height: 404px;
        }
      `;
  } else {
    mainProductsListStyle.innerHTML = `
        .body__products .main-products__list {
          position: relative;
          height: 576px;
          margin-top: 18px;
        }
      `;
  }
  document.head.appendChild(mainProductsListStyle);
}
