import { updateNavbarStyle } from "../common-js/common.js";
import { updateMainContent } from "../home-js/changeMainContent.js"
import { create_notification_user } from "../menuUser/optionMenu.js";
// Hàm tạo sự kiện khi người dùng nhấn vào "Danh mục nổi bậc"
export function clickToPopularMenu() {
  let array = document.querySelectorAll(".popular-menu__item");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Chuyển sang trang "Sản phẩm" 
      updateMainContent("products");

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
      updateNavbarStyle("products");
      
      // Chuyển sang trang "Sản phẩm"
      updateMainContent("products");

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