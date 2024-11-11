import { updateMainContent } from "./changeMainContent.js";
import {
  handleSignUp,
  handleSignIn,
  handleChangePassword,
  handleSaveDateInformation,
  handleSaveDateMoney,
} from "../userUpdate/handleUserUpdate.js";

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

//hàm tạo thông báo
export function create_notification_user(mess) {
  let text = document.createElement("p");
  text.className = "notification";
  text.innerText = mess;
  text.style.backgroundColor = "#ffff";
  text.style.color = "#000";
  text.style.fontWeight = "400";
  text.style.position = "fixed";
  text.style.right = "0px";
  text.style.top = "0px";
  text.style.transform = "translate(100%, 50%)";
  text.style.zIndex = "100000";
  text.style.padding = "10px 50px";
  text.style.fontSize = "2rem";
  text.style.boxShadow = "1px 1px 12px rgba(0, 0, 0, 0.3)";
  text.style.transition =
    "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  document.body.appendChild(text);
  setTimeout(() => {
    document.querySelector(".notification").style.transform =
      "translate(-10%, 50%)";
  }, 10);
  setTimeout(() => {
    document.querySelector(".notification").style.transform =
      "translate(100%, 50%)";
  }, 1000);
  //xóa khỏi dom
  setTimeout(() => {
    document.querySelector(".notification").remove();
  }, 2200);
}

// hàm đăng nhập
export function signIn() {
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
      const userModal = document.getElementById("user-modal");
      const userBlock = document.getElementById("user-block");
      const userExit = document.getElementById("user-exit");
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
      userModal.style.visibility = "hidden";
      // --------------------------------------------------------

      document.querySelector("#username").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#remember-user-account").checked = false;

      // check_info_user.check = true; //trạng thái đăng nhập
    }
  };
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

//hàm đăng xuất
export let check_info_user = {
  //nếu true thì đang ở trạng thái đăng nhập, click user-click thì hiện form infouser, export cho file userIconMenu....
  check: false,
};
export function signOutUser(userStatusLoginIndex) {
  // check_info_user.check = false;
  document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
  let userList = JSON.parse(localStorage.getItem("userList"));
  userList[userStatusLoginIndex].statusLogin = false;
  create_notification_user("Đăng xuất thành công!");

  localStorage.setItem("userList", JSON.stringify(userList));
  updateMainContent("home");
}

//hàm đổi mật khẩu
export function changePassword() {
  let ele = document.createElement("div");
  ele.className = "container-change-password-user";
  ele.innerHTML = `
    <div class="form-change-password">
      <div class="content-change-password">
        <button class="exit-form-change-password-user">X</button>
        <p>Đổi mật khẩu</p>
        <div class="username-change">
          <label for="username-change"></label>
          <input type="text" id="username-change" placeholder="Tên tài khoản">
        </div>
        <div class="old-password-change">
          <label for="old-password-change"></label>
          <input type="text" id="old-password-change" placeholder="Mật khẩu cũ">
        </div>
        <div class="new-password-change">
          <label for="new-password-change"></label>
          <input type="text" id="new-password-change" placeholder="Mật khẩu mới">
        </div>
        <button class="btn-save-change-password">Lưu thay đổi</button>
      </div>
    </div>
  `;
  document.body.appendChild(ele);

  document.querySelector(".exit-form-change-password-user").onclick = () => {
    ele.remove();
  };

  document.querySelector(".btn-save-change-password").onclick = () => {
    let result = handleChangePassword();
    create_notification_user("Đổi mật khẩu thành công!");

    if (result) {
      setTimeout(() => {
        document.querySelector(".notification").style.transform =
          "translate(-10%, 50%)";
      }, 10);
      //tắt dần
      setTimeout(() => {
        document.querySelector(".notification").style.transform =
          "translate(100%, 50%)";
      }, 2000);
    }
    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 3000);
  };
}

//hàm show menu profile
export function showUserMenu() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let userStatusLoginIndex = -1;
  userList.forEach((obj, index) => {
    if (obj.status_login == true) {
      userStatusLoginIndex = index;
    }
  });

  let check = document.querySelector(".header__user-menu"); //để kiểm tra đang hiện form hay không, nếu có thì xóa, nếu không thì tạo form
  if (!check) {
    let infoUser = `
          <h2 class="header__user-title">
            ${userList[userStatusLoginIndex].username}
          </h2>
          <div class="header__user-menu-actions">
            <a href="" class="header__user-menu-action info">
              <p>Hồ sơ</p>
            </a>
            <a href="" class="header__user-menu-action private-info">
              <p>Thông tin cá nhân</p>
            </a>
            <a href="" class="header__user-menu-action bank-info">
              <p>Thông tin ngân hàng</p>
            </a>
            <a href="" class="header__user-menu-action info">
              <p>Lịch sử mua hàng</p>
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

    document.querySelector(".header__user-menu-action.info").onclick = (e) => {
      e.preventDefault();
      showUserProfile();
    };
    document.querySelector(
      ".header__user-menu-action.change-password"
    ).onclick = (e) => {
      e.preventDefault();
      changePassword();
    };
    document.querySelector(".header__user-menu-action.sign-out").onclick = (
      e
    ) => {
      e.preventDefault();
      signOutUser(userStatusLoginIndex);
    };

    document.querySelector(".header__navbar").onclick = () => {
      if (document.querySelector(".header__user-menu"))
        document.querySelector(".header__user-menu").remove();
    };
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".header__user-menu").remove(); //tắt header__user-menu
  }
}

//hàm show profile
function render_form_profile() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let userStatusLoginIndex;
  //vị trí user đang đăng nhập
  userList.forEach((obj, index) => {
    if (obj.status_login) {
      userStatusLoginIndex = index;
      return;
    }
  });

  //tạo form hồ sơ
  let ele = document.createElement("div");
  ele.className = "container-profile-user";
  ele.innerHTML = `
  <div class="form-profile-user">
        <div class="content-profile-user">
          <div class="left-content">
            <img src=${userList[userStatusLoginIndex].src} alt="">
            <h2>${
              userList[userStatusLoginIndex].firstName +
              " " +
              userList[userStatusLoginIndex].lastName
            }</h2>
            <hr>
            <div class="information info">
              <p>Tài khoản</p>
            </div>
            <div class="money info">
              <p>Ngân hàng</p>
            </div>
          </div>
          <div class="right-content">
          </div>
          <a href="">X<a>
        </div>
      </div>
  `;
  document.body.appendChild(ele);
}

function handlePicture_user(path_picture_user) {
  let inputPicture = document.querySelector(".picture-profile");

  inputPicture.onchange = () => {
    const file = inputPicture.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        path_picture_user.src = reader.result; // Hiển thị ảnh
        localStorage.setItem("userImage", reader.result); // Lưu Base64 vào localStorage
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    }
  };
}

function showUserProfile() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let userStatusLoginIndex;
  //vị trí user đang đăng nhập
  userList.forEach((obj, index) => {
    if (obj.status_login) {
      userStatusLoginIndex = index;
      return;
    }
  });

  render_form_profile();

  //nếu click tài khoản
  document.querySelector(".information").onclick = () => {
    let right_content = `
      <div class="two-input">
        <input type="text" class="first-name" placeholder="Nhập họ" value="${userList[userStatusLoginIndex].firstName}">
        <input type="text" class="last-name" placeholder="Nhập tên" value="${userList[userStatusLoginIndex].lastName}">
      </div>
      <div class="two-input">
        <input type="text" class="phone" placeholder="Nhập số điện thoại" value="${userList[userStatusLoginIndex].phone}">
        <input type="file" class="picture-profile" accept="image/*">
      </div>
      <div class="one-input">
        <input type="text" class="address" placeholder="Nhập địa chỉ" value="${userList[userStatusLoginIndex].address}">
      </div>
      <div class="one-input">
        <input type="text" class="email-info" placeholder="Nhập email" value="${userList[userStatusLoginIndex].email}">
      </div>
      <div class="one-input-btn">
        <button class="save-information">Lưu thông tin</button>
      </div>
      `;
    document.querySelector(".right-content").innerHTML = right_content;

    let path_picture_user = {
      src: null,
    };
    handlePicture_user(path_picture_user); //Hàm lấy hình ảnh để upload

    //nếu ấn nút lưu thông tin
    document.querySelector(".save-information").onclick = () => {
      let result = handleSaveDateInformation(
        userStatusLoginIndex,
        path_picture_user
      );
      if (result) {
        create_notification_user("Cập nhật thành công");
        document.querySelector(".container-profile-user").remove();
        showUserProfile();
      }
    };
  };

  //nếu click ví
  // let index_user_login;
  document.querySelector(".money").onclick = () => {
    let right_content = `
      <div class="two-input">
        <input type="text" class="ma-the" placeholder="Nhập mã thẻ" value="${userList[userStatusLoginIndex].ma_the}">
        <input type="text" class="bank" placeholder="Nhập code 3 số cuối" value="${userList[userStatusLoginIndex].code_the}">
        <input type="text" class="code-the" placeholder="Nhập ngân hàng" value="${userList[userStatusLoginIndex].bank}">
      </div>
      <div class="one-input-btn">
        <button class="save-money">Lưu thông tin</button>
      </div> 
    `;
    document.querySelector(".right-content").innerHTML = right_content;

    //nếu ấn lưu ví
    document.querySelector(".save-money").onclick = () => {
      let result = handleSaveDateMoney(userStatusLoginIndex);
      if (result) {
        create_notification_user("Cập nhật ví thành công");
        document.querySelector(".container-profile-user").remove();
        showUserProfile();
      }
    };
  };

  //ấn Dấu x xóa form
  document.querySelector(".content-profile-user a").onclick = (e) => {
    e.preventDefault();
    document.querySelector(".container-profile-user").remove();
  };
}
