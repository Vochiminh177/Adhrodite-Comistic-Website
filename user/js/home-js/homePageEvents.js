import { updateNavbarStyle } from "../common-js/common.js";
import { mainContentMap, mainContentDiv } from "./changeMainContent.js";
import { getProductListInfo } from "../products-js/getProductList.js";

// Hàm tạo sự kiện khi người dùng nhấn vào "Danh mục nổi bậc"
export function clickToPopularMenu() {
  let array = document.querySelectorAll(".popular-menu__item");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Kéo lên đầu trang mỗi lần chuyển trang
      window.scrollTo(0, 0);

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
export function clickToProductItem() {
  let array = document.querySelectorAll(
    ".popular-product__item, .sale-product__item"
  );
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Thay đổi nội dung thành trang Sản phẩm
      mainContentDiv.innerHTML = mainContentMap["products"];

      // Cập nhật lại style cho navbar
      updateNavbarStyle("products");

      const filterProductsExistingScript = document.querySelector(
        ".filter-products-script"
      );
      if (filterProductsExistingScript) {
        filterProductsExistingScript.remove();
      }

      const filterProductsScript = document.createElement("script");
      filterProductsScript.src = "./js/products-js/showFilterProducts.js";
      filterProductsScript.className = "filter-products-script";
      document.body.appendChild(filterProductsScript);

      getProductListInfo();

      let popularMenuKey = event.currentTarget.getAttribute(
        "data-popular-product"
      );
      document.getElementById(`${popularMenuKey}-left-menu`).click();
      let productItemName = obj
        .querySelector(".popular-product__name")
        ?.textContent.trim();
      let saleProductItemName = obj
        .querySelector(".sale-product__name")
        ?.textContent.trim();
      // console.log(productItemName, saleProductItemName);
      let productList = document.querySelectorAll(".main-products__name");
      productList.forEach((name) => {
        if (
          name.textContent.trim() === productItemName ||
          name.textContent.trim() === saleProductItemName
        ) {
          name.click();
        }
      });
    });
  });
}

// Thiết lập sự kiện khi người dùng nhấn vào "Danh mục nổi bật"
// Thiết lập sự kiện khi người dùng nhấn vào một sản phẩm
window.addEventListener('load', () => {
  clickToPopularMenu();
  clickToProductItem();
});