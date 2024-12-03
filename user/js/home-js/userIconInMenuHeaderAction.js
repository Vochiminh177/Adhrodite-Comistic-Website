import { signIn, signUp } from "../userUpdate/LoginSignUpUser.js";
import {
  showFormInformation,
  changePassword,
  signOutUser,
} from "../menuUser/optionMenu.js";

// Cập nhật lại giá trị của các thẻ input
function resetInputInLoginAndLogoutForm() {
  if (document.querySelector("#user-form .username-login")) {
    document.querySelector("#user-form .username-login").placeholder =
      "Nhập tên tài khoản";
    document.querySelector("#user-form .username-login").value = "";
    document
      .querySelector("#user-form .username-login")
      .classList.remove("err-text");
    document.querySelector("#user-form .username-login").style.borderBottom =
      "1px solid #ccc";
    document.querySelector("#user-form .password-login").placeholder =
      "Nhập mật khẩu";
    document
      .querySelector("#user-form .password-login")
      .classList.remove("err-text");
    document.querySelector("#user-form .password-login").style.borderBottom =
      "1px solid #ccc";
    document.querySelector("#user-form .password-login").value = "";
  }
  if (document.querySelector("#user-form .username-signup")) {
    document.querySelector("#user-form .username-signup").placeholder =
      "Nhập tên tài khoản";
    document
      .querySelector("#user-form .username-signup")
      .classList.remove("err-text");
    document.querySelector("#user-form .username-signup").style.borderBottom =
      "1px solid #ccc";
    document.querySelector("#user-form .username-signup").value = "";
    document.querySelector("#user-form .email-signup").placeholder =
      "Nhập email";
    document
      .querySelector("#user-form .email-signup")
      .classList.remove("err-text");
    document.querySelector("#user-form .email-signup").style.borderBottom =
      "1px solid #ccc";
    document.querySelector("#user-form .email-signup").value = "";

    document.querySelector("#user-form #first-password").placeholder =
      "Nhập tên tài khoản";
    document.querySelector("#user-form #first-password").value = "";
    document
      .querySelector("#user-form #first-password")
      .classList.remove("err-text");
    document.querySelector("#user-form #first-password").style.borderBottom =
      "1px solid #ccc";

    document.querySelector("#user-form #second-password").placeholder =
      "Nhập tên tài khoản";
    document
      .querySelector("#user-form #second-password")
      .classList.remove("err-text");
    document.querySelector("#user-form #second-password").value = "";
    document.querySelector("#user-form #second-password").style.borderBottom =
      "1px solid #ccc";

    document
      .querySelector(".accept-privacy")
      .parentElement.querySelector("p").style = "black";
    document.querySelector(".accept-privacy").checked = false;
  }
}

// Ẩn đi form Đăng nhập - Đăng ký
function unShowUserFormInMenuHeader() {
  const userFormDiv = document.querySelector(".header__user-container");
  document
    .querySelector(".header__user-overlay")
    .addEventListener("click", function () {
      userFormDiv.remove();
    });
  document
    .querySelector(".header__user-exit")
    .addEventListener("click", function () {
      userFormDiv.remove();
    });
}

// Cập lại form Đăng nhập - Đăng ký
export function updateForm(userFormKey) {
  const userFormMap = {
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
  const userFormDiv = document.getElementById("user-form");
  if (userFormKey) {
    const reverseUserFormKey = {
      login: `register`,
      register: `login`,
    };
    const style = document.createElement("style");
    style.innerHTML = `
            .header__user-action#${reverseUserFormKey[userFormKey]} {
                color: #000;
            }
            .header__user-action#${reverseUserFormKey[userFormKey]}::after {
                opacity: 0;
                background: #000;
            }
            .header__user-action#${userFormKey} {
                color: #a94064;
            }
            .header__user-action#${userFormKey}::after {
                opacity: 1;
                background: #a94064;
            }
        `;
    document.head.appendChild(style);
    userFormDiv.innerHTML = userFormMap[userFormKey];
  }
}

// Hàm khi nhấn Đăng nhập - Đăng ký
function clickToLoginOrLogout() {
  document
    .querySelector(".main-user-form-body")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const userFormKey = event.target.getAttribute("data-user-form");
      if (userFormKey) {
        updateForm(userFormKey);
        //nếu là đăng ký thì xử lí đăng ký
        if (userFormKey == "register") {
          signUp();
        } else {
          signIn();
        }
      }
    });
}

// hàm show menu profile
function showUserMenu(userList, indexCurrentUserLogin) {
  let check = document.querySelector(".header__user-menu"); //để kiểm tra đang hiện form hay không, nếu có thì xóa, nếu không thì tạo form
  if (!check) {
    let infoUser = `
            <h2 class="header__user-title">
              ${userList[indexCurrentUserLogin].username}
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
      showFormInformation(userList, indexCurrentUserLogin);
    };
    //---------KHI ẤN THAY ĐỔI MẬT KHẨU
    document.querySelector(".change-password").onclick = (e) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      changePassword();
    };
    //-----KHI ẤN ĐĂNG XUẤT
    document.querySelector(".header__user-menu-action.sign-out").onclick = (
      e
    ) => {
      e.preventDefault();
      document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
      signOutUser();
    };
    //--------ẤN LỊCH SỬ MUA HÀNG
    // document.querySelector(".order-history-info").onclick = (e) => {
    //   e.preventDefault();
    //   document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
    //   showOrderHistory();
    // };
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".header__user-menu").remove(); //tắt header__user-menu
  }
}

export function showUserFormInMenuHeader() {
  document.getElementById("user-click").addEventListener("click", function () {
    let indexCurrentUserLogin =
      JSON.parse(localStorage.getItem("indexCurrentUserLogin")) || -1;
    let userList = JSON.parse(localStorage.getItem("userList"));
    // Nếu chưa đăng nhập
    if (indexCurrentUserLogin < 0) {
      const userContainerInner = `
      <div class="header__user-block">
        <button class="header__user-exit">x</button>
        <div class="header__user-actions main-user-form-body">
          <a
            href="javascript:void(0)"
            class="header__user-action"
            id="login"
            data-user-form="login"
          >
            Đăng nhập
          </a>
          <a
            href="javascript:void(0)"
            class="header__user-action a-signup"
            id="register"
            data-user-form="register"
          >
            Đăng ký
          </a>
        </div>
        <div class="header__user-body" id="user-form">
          <form
            action=""
            autocomplete="off"
            class="header__user-form"
          >
            <div class="header__form-group">
              <label for="username">Tên tài khoản</label>
              <input
                type="text"
                id="username"
                class="username-login"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div class="header__form-group">
              <label for="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                class="password-login"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div class="header__form-group">
              <input
                type="submit"
                value="Đăng nhập"
                class="btn-signin"
              />
            </div>
          </form>
          <div class="header__user-contacts">
            <p class="header__user-contacts-title">Hoặc</p>
            <div class="header__user-contacts-block">
              <a
                href="javascript:void(0)"
                class="header__user-contact"
              >
                <i
                  class="fa-brands fa-facebook-f header__user-contact-icon"
                ></i>
                <p class="header__user-contact-sub-title">Facebook</p>
              </a>
              <a
                href="javascript:void(0)"
                class="header__user-contact"
              >
                <i
                  class="fa-brands fa-google header__user-contact-icon"
                ></i>
                <p class="header__user-contact-sub-title">Google</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="header__user-overlay"></div>
    `;
      const userContainerDiv = document.createElement("div");
      userContainerDiv.className = "header__user-container";
      userContainerDiv.innerHTML = userContainerInner;
      document.body.appendChild(userContainerDiv);

      // Thiết lập sự kiện ẩn đi form
      unShowUserFormInMenuHeader();

      // Khi người dùng nhấn vào mục Đăng nhập - Đăng ký
      clickToLoginOrLogout();

      // Cập nhật lại giá trị của các thẻ
      resetInputInLoginAndLogoutForm();

      // Thiết lập sự kiện cho phép người dùng Đăng nhập - Đăng ký
      signIn();
      signUp();
    } else {
      // Nếu đang đăng nhập một tài khoản
      showUserMenu(userList, indexCurrentUserLogin);
    }
  });
}
