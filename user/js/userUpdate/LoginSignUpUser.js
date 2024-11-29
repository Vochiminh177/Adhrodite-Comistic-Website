
import {
    handleSignUp,
    handleSignIn,
  } from "../userUpdate/handleUserUpdate.js";
  import { create_notification_user } from "../menuUser/optionMenu.js";
  import { updateForm } from "../home-js/changeUserFormInMenuHeader.js";


// hàm đăng nhập
export function signIn() {
  if (document.querySelector(".btn-signin")) {
    document.querySelector(".btn-signin").onclick = (e) => {
      e.preventDefault();
      let result = handleSignIn();

      //nếu đăng nhập thành công
      if (result) {
        //tạo thông báo
        create_notification_user("Đăng nhập thành công!");
        // Xóa changeUserFormInMenuHeaderScript--------Xem hàm trong phần import
        const changeUserFormInMenuHeaderExistingScript = document.querySelector(
          ".change-user-form-in-menu-header-script"
        );
        if (changeUserFormInMenuHeaderExistingScript) {
          changeUserFormInMenuHeaderExistingScript.remove();
        }

        // ẩn form
        const userContainer = document.getElementById("user-container");
        const userOverlay = document.getElementById("user-overlay");
        const userBlock = document.getElementById("user-block");
        const userExit = document.getElementById("user-exit");
        userContainer.style.visibility = "hidden";
        userBlock.style.visibility = "hidden";
        userExit.style.visibility = "hidden";
        userOverlay.style.visibility = "hidden";
        // --------------------------------------------------------

        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
        // document.querySelector("#remember-user-account").checked = false;
      }
    };
  }
}

//function đăng ký
export function signUp() {
  document.querySelector(".btn-signup").onclick = (e) => {
    e.preventDefault();
    let result = handleSignUp();
    if (result) {
      updateForm("login");
      signIn();
      //tạo phần tử p (thông báo khi đăng ký thành công)
      create_notification_user("Đăng ký thành công!");
    }
  };
}
