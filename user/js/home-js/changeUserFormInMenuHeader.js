import {
  handleSignUp,
  handleSignIn,
} from "../userUpdate/handleUserUpdate.js";
import { create_notification_user } from "../menuUser/optionMenu.js";

const formMap = {
  login: ` <form action="" autocomplete="off" class="header__user-form">
    <div class="header__form-group">
      <label for="username"><p>Tên tài khoản</p></label>
      <input
        type="text"
        id="username"
        class="username-login"
        placeholder="Nhập tên tài khoản"
      />
    </div>
    <div class="header__form-group">
      <label for="password"><p>Mật khẩu</p></label>
      <input
        type="password"
        id="password"
        class="password-login"
        placeholder="Nhập mật khẩu"
      />
    </div>
   
    <div class="header__form-group">
      <input type="submit" value="Đăng nhập" class="btn-signin"/>
    </div>
  </form>
  <div class="header__user-contacts">
    <p class="header__user-contacts-title">Hoặc</p>
    <div class="header__user-contacts-block">
      <a href="javascript:void(0)" class="header__user-contact">
        <i
          class="fa-brands fa-facebook-f header__user-contact-icon"
        ></i>
        <p class="header__user-contact-sub-title">Facebook</p>
      </a>
      <a href="javascript:void(0)" class="header__user-contact">
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
      type="password"
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
      type="password"
      id="second-password"
      placeholder="Nhập lại mật khẩu"
    />
  </div>
  <div class="header__form-group privacy-checkbox">
      <input
        type="checkbox"
        id="remember-user-account"
        hidden
        class="accept-privacy"
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
        signUp();
      } else {
        signIn();
      }
    }
  });

    // hàm đăng nhập
export function signIn() {
  if(document.querySelector(".btn-signin")){
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
  function signUp() {
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














