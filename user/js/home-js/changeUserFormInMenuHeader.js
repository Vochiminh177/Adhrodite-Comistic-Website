//Hiệu thêm class="btn-signup", username-signup, password-signup, email-signup của register
// .btn-signin của đăng nhập

import { add_user, check_user } from "../userUpdate/handleUserUpdate.js";
import { updateMainContent } from "./changeMainContent.js";

const formMap = {
  login: ` <form action="" autocomplete="off" class="header__user-form">
    <div class="header__form-group">
      <label for="username"><p>Tên tài khoản</p></label>
      <input
        type="text"
        id="username"
        placeholder="Nhập tên tài khoản"
      />
    </div>
    <div class="header__form-group">
      <label for="password"><p>Mật khẩu</p></label>
      <input
        type="password"
        id="password"
        placeholder="Nhập mật khẩu"
      />
    </div>
    <div class="header__form-group">
      <input
        type="checkbox"
        id="remember-user-account"
        hidden
      />
      <label for="remember-user-account" class="remember-password">
        <p>Ghi nhớ mật khẩu</p>
      </label>
    </div>
    <div class="header__form-group">
      <input type="submit" value="Đăng nhập" class="btn-signin"/>
    </div>
  </form>
  <div class="header__user-contacts">
    <p class="header__user-contacts-title">Hoặc</p>
    <div class="header__user-contacts-block">
      <a href="#!" class="header__user-contact">
        <i
          class="fa-brands fa-facebook-f header__user-contact-icon"
        ></i>
        <p class="header__user-contact-sub-title">Facebook</p>
      </a>
      <a href="#!" class="header__user-contact">
        <i
          class="fa-brands fa-google header__user-contact-icon"
        ></i>
        <p class="header__user-contact-sub-title">Google</p>
      </a>
    </div>
  </div>`,
  register: `<form action="" autocomplete="off" class="header__user-form">
  <div class="header__form-group">
    <label for="username">
      <p>Nhập tên tài khoản</p>
    </label>
    <input
      type="text"
      id="username"
      placeholder="Nhập tên tài khoản"
      class="username-signup"
    />
  </div>
  <div class="header__form-group">
    <label for="email">Nhập email</label>
    <input type="email" id="email" placeholder="Nhập email" class="email-signup"/>
  </div>
  <div class="header__form-group">
    <label for="first-password">
      <p>Nhập mật khẩu</p>
    </label>
    <input
      type="first-password"
      id="first-password"
      class="password-signup"
      placeholder="Nhập mật khẩu"
    />
  </div>
  <div class="header__form-group">
    <label for="second-password">
      <p>Nhập lại mật khẩu</p>
    </label>
    <input
      type="second-password"
      id="second-password"
      placeholder="Nhập lại mật khẩu"
    />
  </div>
  <div class="header__form-group">
      <input
        type="checkbox"
        id="remember-user-account"
        hidden
      />
      <label for="remember-user-account">
        <p>Tôi đồng ý với <u>điều khoản</u> và <u>dịch vụ</u></p>
      </label>
    </div>
  <div class="header__form-group">
    <input type="submit" value="Đăng ký" class="btn-signup"/>
  </div>
</form>
</div>`,
};

export function updateForm(formKey) {
  const formDiv = document.getElementById("user-form");
  if (formKey) {
    const reverseFormKey = {
      login: `register`,
      register: `login`,
    };
    const style = document.createElement("style");
    style.innerHTML = `
            .header__user-action#${reverseFormKey[formKey]} {
                color: #000;
            }
            .header__user-action#${reverseFormKey[formKey]}::after {
                opacity: 0;
                background: #000;
            }
            .header__user-action#${formKey} {
                color: #a94064;
            }
            .header__user-action#${formKey}::after {
                opacity: 1;
                background: #a94064;
            }
        `;
    document.head.appendChild(style);
    formDiv.innerHTML = formMap[formKey];
  }
}

document
  .querySelector(".main-user-form-body")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const formKey = event.target.getAttribute("data-user-form");
    if (formKey) {
      updateForm(formKey);

      //nếu là đăng ký thì xử lí đăng ký
      if (formKey == "register") {
        sign_up();
      }

      else {
        sign_in();
      }


    }
  });


//fuction đăng nhập, export để khi click vào user-click thì thì sẽ gán sự kiện vào nút đăng nhập
export let check_info_user = { //export một đối tượng thì file userIconInMenuHeaderAction mới thay đổi được giá trị true false
  check: false
};

export function sign_in(){  
  let handle_click_sign_in = () => {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let result = check_user(username, password);

    //nếu đăng nhập thành công
    if (result.status) {
      alert(result.mess);
      // Xóa changeUserFormInMenuHeaderScript--------Xem hàm trong phần import 
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

      userModal.style.visibility = "hidden";
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
      //--------------------------------------------------------

      document.querySelector("#username").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#remember-user-account").checked = false;

      //--vô trang Trang chủ khi đăng nhập thành công
      updateMainContent("home");
      check_info_user.check = true;
    }

    //nếu đăng nhập thất bại
    else alert(result.mess);

    document.querySelector(".btn-signin").removeEventListener("click", handle_click_sign_in); // xóa sự kiện tránh trường hợp click user-click để đăng nhập thì gán thêm sự kiện
  };
  document.querySelector(".btn-signin").addEventListener("click", handle_click_sign_in);
}

//function đăng ký
function sign_up(){
  document.querySelector(".btn-signup").addEventListener("click", () => {
    let username = document.querySelector(".username-signup").value;
    let password = document.querySelector(".password-signup").value;
    let email = document.querySelector(".email-signup").value;

    let result = add_user(username, password, email);

    //nếu đăng ký thành công
    if (result.status) {
      alert(result.mess);

      document.querySelector(".username-signup").value = "";
      document.querySelector(".password-signup").value = "";
      document.querySelector("#second-password").value = "";
      document.querySelector(".email-signup").value = "";
    }
    //nếu đăng ký thât bại
    else alert(result.mess);
  });
}