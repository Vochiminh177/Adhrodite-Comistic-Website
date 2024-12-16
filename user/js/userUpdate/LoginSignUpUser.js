import { handleSignUp, handleSignIn } from "../userUpdate/handleUserUpdate.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { updateForm } from "../home-js/userIconInMenuHeaderAction.js";
import { showFormInformation } from "../menuUser/optionMenu.js";
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
        const userList = JSON.parse(localStorage.getItem("userList"));
        const indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"));

        let firstName = userList[indexCurrentUserLogin].first_name;
        let lastName = userList[indexCurrentUserLogin].last_name;
        let email = userList[indexCurrentUserLogin].email;
        let phone = userList[indexCurrentUserLogin].phone;
        let address = userList[indexCurrentUserLogin].address;
        
        if(!firstName || !lastName || !email || !phone || !address){
          showFormInformation(userList, indexCurrentUserLogin);
          localStorage.setItem("userList", JSON.stringify(userList));
        }
      }
      else document.querySelector("#password").value = "";
    };
  }
}

//function đăng ký
export function signUp() {
  document.querySelector(".btn-signup").onclick = (e) => {
    e.preventDefault();
    let result = handleSignUp();
    if (result) {
      create_notification_user("Đăng ký thành công!");
      updateForm("login");
      signIn();
    }
  };
}
