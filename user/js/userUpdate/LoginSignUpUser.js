import { handleSignUp, handleSignIn } from "../userUpdate/handleUserUpdate.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { updateForm } from "../home-js/userIconInMenuHeaderAction.js";

// hàm đăng nhập
export function signIn() {
  if (document.querySelector(".btn-signin")) {
    document.querySelector(".btn-signin").onclick = (e) => {
      e.preventDefault();
      let result = handleSignIn();

      //nếu đăng nhập thành công
      if (result) {
        // tạo thông báo
        create_notification_user("Đăng nhập thành công!");

        // ẩn form
        const userContainerDiv = document.querySelector(
          ".header__user-container"
        );
        userContainerDiv.remove();

        //
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
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
