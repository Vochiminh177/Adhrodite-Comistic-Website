import { updateNavbarStyle } from "../common-js/common.js";
import { mainContentMap, mainContentDiv } from "./changeMainContent.js";
import { getProductListInfo } from "../products-js/getProductList.js";

// Hàm tạo sự kiện khi người dùng nhấn vào "Danh mục nổi bậc"
export function clickToPopularMenus() {
  let array = document.querySelectorAll(".popular-menu__item");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Thay đổi nội dung thành trang Sản phẩm
      mainContentDiv.innerHTML = mainContentMap["products"];

      // Cập nhật lại style cho navbar
      updateNavbarStyle("products");

      // Kiểm tra filterProductsScript có tồn tại hay không và xoá đi
      const filterProductsExistingScript = document.querySelector(
        ".filter-products-script"
      );
      if (filterProductsExistingScript) {
        filterProductsExistingScript.remove();
      }

      // Hiện thị menu lọc sản phẩm theo các tiêu chí
      const filterProductsScript = document.createElement("script");
      filterProductsScript.src = "./js/products-js/showFilterProducts.js";
      filterProductsScript.className = "filter-products-script";
      document.body.appendChild(filterProductsScript);

      // Tạo sự kiện cho các danh mục sản phẩm
      getProductListInfo();
      // Tự động nhấn mục mà người dùng đã chọn
      let popularMenuKey =
        event.currentTarget.getAttribute("data-popular-menu");
      document.getElementById(`${popularMenuKey}-left-menu`).click();
    });
  });
}

// Hàm tạo sự kiện khi người dùng nhấn vào một sản phẩm
export function clickToProductItem() {}

// Thiết lập sự kiện khi người dùng nhấn vào "Danh mục nổi bật"
clickToPopularMenus();

// Thiết lập sự kiện khi người dùng nhấn vào một sản phẩm
clickToProductItem();
