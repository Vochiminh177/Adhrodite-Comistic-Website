import { updateMainContent } from "./changeMainContent.js";
import { sign_in } from "./changeUserFormInMenuHeader.js";
import { check_info_user } from "./changeUserFormInMenuHeader.js";


// Sự kiện khi người dùng nhấn vào icon hình nhân trên Header

function unShowUserFormInMenuHeader() {
  document.getElementById("user-exit").addEventListener("click", function () {
    // Xóa changeUserFormInMenuHeaderScript
    const changeUserFormInMenuHeaderExistingScript = document.querySelector(
      ".change-user-form-in-menu-header-script"
    );
    if (changeUserFormInMenuHeaderExistingScript) {
      changeUserFormInMenuHeaderExistingScript.remove();
    }

    // Xử lý sự kiện
    const userModal = document.getElementById("user-modal");
    const userBlock = document.getElementById("user-block");
    const userExit = document.getElementById("user-exit");
    if (
      getComputedStyle(userModal).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userBlock).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
    ) {
      userModal.style.visibility = "hidden";
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
    }
  });
}

export function showUserFormInMenuHeader() {
  document.getElementById("user-click").addEventListener("click", function () {

    //hiển thị form đăng nhập, đăng ký
    if(!check_info_user.check){
      // Tạo mới changeUserFormInMenuHeaderScript
      const changeUserFormInMenuHeaderScript = document.createElement("script");
      
      changeUserFormInMenuHeaderScript.type = "module";

      changeUserFormInMenuHeaderScript.src =
        "./js/home-js/changeUserFormInMenuHeader.js";
      changeUserFormInMenuHeaderScript.className =
        "change-user-form-in-menu-header-script";
      document.body.appendChild(changeUserFormInMenuHeaderScript);

      // Xử lý sự kiện
      const userModal = document.getElementById("user-modal");
      const userBlock = document.getElementById("user-block");
      const userExit = document.getElementById("user-exit");
      if (
        getComputedStyle(userBlock).getPropertyValue("visibility") ===
          "visible" &&
        getComputedStyle(userModal).getPropertyValue("visibility") ===
          "visible" &&
        getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
      ) {
        userModal.style.visibility = "hidden";
        userBlock.style.visibility = "hidden";
        userExit.style.visibility = "hidden";
      } else {
        userModal.style.visibility = "visible";
        userBlock.style.visibility = "visible";
        userExit.style.visibility = "visible";

        unShowUserFormInMenuHeader();
      }

      sign_in();
    }
    // hiển thị info-user
    else{
      let check = document.querySelector(".info-user"); //để kiểm tra info-user có tồn tại không, nếu không thì hiển thị, còn nếu có thì delete
      if(!check){
        let infoUser = `
              <div class="container-info">
                  <img src="./assets/images/acnecream-image-1.jpg" alt="img">
                  <h2>Chào bạn !</h2>
                  <hr>
                  <a href="">
                    <p>Hồ sơ</p>
                    <hr>
                  </a>
                  <a href="">
                    <p>Đổi mật khẩu</p>
                    <hr>
                  </a>
                  <a href="" class="sign-out-user">
                    <p>Đăng xuất</p>
                    <hr>
                  </a>
              </div>
        `;
        let info_user = document.createElement("div")
        info_user.classList.add("info-user");
        info_user.innerHTML = infoUser;
        document.querySelector(".header__menu").appendChild(info_user);

        sign_out_user();

      }
      else{
        document.querySelector(".info-user").remove(); //tắt info-user
      }
      
    }
  });
}

function sign_out_user(){
  document.querySelector(".sign-out-user").addEventListener("click", (e) => {
    e.preventDefault();
    check_info_user.check = false;
    updateMainContent("home");
    document.querySelector(".info-user").remove();//xóa info-user
  });
}