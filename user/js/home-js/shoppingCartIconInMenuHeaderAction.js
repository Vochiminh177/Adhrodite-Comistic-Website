import { removeAllStyleTags } from "../common-js/common.js";
import { getShoppingCartInfo } from "../home-js/getShoppingCart.js";
import {create_notification_user} from "../home-js/changeUserFormInMenuHeader.js";

// Hàm cập nhật lại style
function updateStyleTags() {
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
      let userList = JSON.parse(localStorage.getItem("userList"));
      let index_user_status_login = -1;
      userList.forEach((obj, index) => {
        if(obj.status_login){
          index_user_status_login = index;
          return;
        }
      });

      //trạng thái có đăng nhập 
      if(index_user_status_login > -1){
        // Kéo lên đầu trang mỗi lần chuyển trang
        window.scrollTo(0, 0);

        // Cập nhật lại style khi người dùng ấn vào Giỏ hàng
        updateStyleTags();

        // Hiển thị thông tin sản phẩm của Giỏ hàng
        getShoppingCartInfo();
      }
      else{
        create_notification_user("Bạn chưa đăng nhập!");
      }
    });
}
