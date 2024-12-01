import { userList } from "../../../database/database.js";
import { removeAllStyleTags } from "../common-js/common.js";
import { getShoppingCartInfo } from "../home-js/getShoppingCart.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { deleteAllFormCreatedFromJsUser } from "./changeMainContent.js";

// Hàm cập nhật lại style
export function updateStyleTags() {
  // Xoá các thẻ style đã tồn tại từ trước đó
  removeAllStyleTags();
  // Đặt lại style cho navBarStyle
  const navbarStyle = document.createElement("style");
  navbarStyle.className = "navbar-style";
  navbarStyle.innerHTML = `
      .header-navbar__action {
        color: #dbd7d7;
        text-shadow: none;
      }
      .header-navbar__action#home {
        color: #dbd7d7;
        text-shadow: none;
      }
      .header-navbar__action#home:hover {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
      .header-navbar__action:hover {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
    `;
  document.head.appendChild(navbarStyle);
}

// Sự kiện khi người dùng nhấn vào icon giỏ hàng trên Header
export function showShoppingCartFormInMenuHeader() {
  document
    .getElementById("shopping-cart-click")
    .addEventListener("click", function () {
      deleteAllFormCreatedFromJsUser();
      let indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"));
      //trạng thái có đăng nhập 
      if(indexCurrentUserLogin === null || indexCurrentUserLogin === undefined){
        indexCurrentUserLogin = -1;
        localStorage.setItem("indexCurrentUserLogin", JSON.stringify(indexCurrentUserLogin));
      }

      if(indexCurrentUserLogin > -1){
        updateStyleTags();

        // Hiển thị thông tin sản phẩm của Giỏ hàng
        getShoppingCartInfo();
      }
      else{
        create_notification_user("Bạn chưa đăng nhập!");
      }
    });
}
