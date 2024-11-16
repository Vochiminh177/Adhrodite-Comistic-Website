import { signIn } from "./changeUserFormInMenuHeader.js";
import { check_info_user } from "./changeUserFormInMenuHeader.js";
import { showUserMenu } from "./changeUserFormInMenuHeader.js";
import { usersList } from "../../../database/database.js";

// Sự kiện khi người dùng nhấn vào icon hình nhân trên Header

function unShowUserFormInMenuHeader() {
  function unShow() {
    // Xóa changeUserFormInMenuHeaderScript
    const changeUserFormInMenuHeaderExistingScript = document.querySelector(
      ".change-user-form-in-menu-header-script"
    );
    if (changeUserFormInMenuHeaderExistingScript) {
      changeUserFormInMenuHeaderExistingScript.remove();
    }

    // Xử lý sự kiện
    const userContainer = document.getElementById("user-container");
    const userOverlay = document.getElementById("user-overlay");
    const userBlock = document.getElementById("user-block");
    const userExit = document.getElementById("user-exit");
    if (
      getComputedStyle(userContainer).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userOverlay).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userBlock).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
    ) {
      userContainer.style.visibility = "hidden";
      userOverlay.style.visibility = "hidden";
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
    }
  }
  document
    .getElementById("user-overlay")
    .addEventListener("click", function () {
      unShow();
    });
  document.getElementById("user-exit").addEventListener("click", function () {
    unShow();
  });
}

export function showUserFormInMenuHeader() {
  document.getElementById("user-click").addEventListener("click", function () {
    //hiển thị form đăng nhập, đăng ký
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if (userList.length == 0) {
      userList = [...usersList];
    }
    localStorage.setItem("userList", JSON.stringify(userList));

    // lấy vị trí người đăng nhập và trạng thái đăng nhập để hiện form
    let index_user_status_login = -1;
    userList.forEach((obj, index) => {
      if (obj.statusLogin == true) {
        index_user_status_login = index;
      }
    });

    if (index_user_status_login < 0) {
      //nếu chưa có trạng thái đăng nhập
      // Tạo mới changeUserFormInMenuHeaderScript
      const changeUserFormInMenuHeaderScript = document.createElement("script");

      changeUserFormInMenuHeaderScript.type = "module";

      changeUserFormInMenuHeaderScript.src =
        "./js/home-js/changeUserFormInMenuHeader.js";
      changeUserFormInMenuHeaderScript.className =
        "change-user-form-in-menu-header-script";
      document.body.appendChild(changeUserFormInMenuHeaderScript);

      // Xử lý sự kiện
      const userContainer = document.getElementById("user-container");
      const userOverlay = document.getElementById("user-overlay");
      const userBlock = document.getElementById("user-block");
      const userExit = document.getElementById("user-exit");
      if (
        getComputedStyle(userContainer).getPropertyValue("visibility") ===
          "visible" &&
        getComputedStyle(userBlock).getPropertyValue("visibility") ===
          "visible" &&
        getComputedStyle(userOverlay).getPropertyValue("visibility") ===
          "visible" &&
        getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
      ) {
        userContainer.style.visibility = "hidden";
        userOverlay.style.visibility = "hidden";
        userBlock.style.visibility = "hidden";
        userExit.style.visibility = "hidden";
      } else {
        userContainer.style.visibility = "visible";
        userOverlay.style.visibility = "visible";
        userBlock.style.visibility = "visible";
        userExit.style.visibility = "visible";

        unShowUserFormInMenuHeader();
      }

      signIn();
    }

    // hiển thị info-user
    else {
      showUserMenu();
    }
  });
}
