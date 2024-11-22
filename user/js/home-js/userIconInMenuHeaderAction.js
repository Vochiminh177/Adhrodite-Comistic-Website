import { signIn } from "../userUpdate/LoginSignUpUser.js";
import { usersList } from "../../../database/database.js";
import { showFormInformation, changePassword, signOutUser } from "../menuUser/optionMenu.js";

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

    resetInputForLoginAndSignup();
    
    if (document.querySelector(".header__find-block-wrapper")) {
      document.querySelector(".header__find-block-wrapper").style.visibility = "hidden";
    }
    // deleteAllFormCreatedFromJsUser();
    //hiển thị form đăng nhập, đăng ký
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if (userList.length == 0) {
      userList = [...usersList];
    }
    localStorage.setItem("userList", JSON.stringify(userList));

    // lấy vị trí người đăng nhập và trạng thái đăng nhập để hiện form
    let userStatusLoginIndex = -1;
    userList.forEach((obj, index) => {
      if (obj.statusLogin == true) {
        userStatusLoginIndex = index;
      }
    });

    if (userStatusLoginIndex < 0) {
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
      
      // resetInputForLoginAndSignup()
      signIn();
    }

    // hiển thị info-user
    else {
      showUserMenu(userList, userStatusLoginIndex);
    }
  });
}


//hàm show menu profile
function showUserMenu(userList, userStatusLoginIndex) {
  // let userList = JSON.parse(localStorage.getItem("userList"));
  // let userStatusLoginIndex = -1;
  // userList.forEach((obj, index) => {
  //   if (obj.statusLogin == true) {
  //     userStatusLoginIndex = index;
  //   }
  // });

  let check = document.querySelector(".header__user-menu"); //để kiểm tra đang hiện form hay không, nếu có thì xóa, nếu không thì tạo form
  if (!check) {
    let infoUser = `
            <h2 class="header__user-title">
              ${userList[userStatusLoginIndex].username}
            </h2>
            <div class="header__user-menu-actions">
              <a href="" class="header__user-menu-action private-info">
                <p>Thông tin cá nhân</p>
              </a>
              <a href="" class="header__user-menu-action change-password">
                <p>Đổi mật khẩu</p>
              </a>
              <a href="" class="header__user-menu-action sign-out">
                <p>Đăng xuất</p>
              </a>
            </div>
          `;
    let info_user = document.createElement("div");
    info_user.classList.add("header__user-menu");
    info_user.innerHTML = infoUser;
    document.querySelector(".header__user-icon").appendChild(info_user);
    setTimeout(() => {
      info_user.style.opacity = "1";
    }, 10);

    //------KHI ẤN THÔNG TIN CÁ NHÂN
    document.querySelector(".private-info").onclick = (e) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      showFormInformation(userList, userStatusLoginIndex);
    };
    //---------KHI ẤN THAY ĐỔI MẬT KHẨU
    document.querySelector(".change-password").onclick = (e) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      changePassword();
    };
    //-----KHI ẤN ĐĂNG XUẤT
    document.querySelector(".header__user-menu-action.sign-out").onclick = (e) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      signOutUser(userStatusLoginIndex);
    };
    //--------ẤN LỊCH SỬ MUA HÀNG
    document.querySelector(".order-history-info").onclick = (e) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      showOrderHistory();
    };
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".header__user-menu").remove(); //tắt header__user-menu
  }
}

function resetInputForLoginAndSignup(){
  if(document.querySelector("#user-form .username-login")){
    document.querySelector("#user-form .username-login").placeholder = "Nhập tên tài khoản";
    document.querySelector("#user-form .username-login").classList.remove("err-text");
    document.querySelector("#user-form .username-login").style.borderBottom = "1px solid #ccc";
    document.querySelector("#user-form .password-login").placeholder = "Nhập mật khẩu";
    document.querySelector("#user-form .password-login").classList.remove("err-text");
    document.querySelector("#user-form .password-login").style.borderBottom = "1px solid #ccc";
  }
  if(document.querySelector(".username-signup")){
    document.querySelector(".username-signup").placeholder = "Nhập tên tài khoản";
    document.querySelector(".username-signup").classList.remove("err-text");
    document.querySelector(".username-signup").style.borderBottom = "1px solid #ccc";
    document.querySelector(".email-signup").placeholder = "Nhập email";
    document.querySelector(".email-signup").classList.remove("err-text");
    document.querySelector(".email-signup").style.borderBottom = "1px solid #ccc";

    document.querySelector("#first-password").placeholder = "Nhập tên tài khoản";
    document.querySelector("#first-password").classList.remove("err-text");
    document.querySelector("#first-password").style.borderBottom = "1px solid #ccc";

    document.querySelector("#second-password").placeholder = "Nhập tên tài khoản";
    document.querySelector("#second-password").classList.remove("err-text");
    document.querySelector("#second-password").style.borderBottom = "1px solid #ccc";

    document.querySelector(".accept-privacy").parentElement.querySelector("p").style = "black";
  }
}