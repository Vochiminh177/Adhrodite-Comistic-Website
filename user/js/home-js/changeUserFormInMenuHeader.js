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

//hàm tạo thông báo
function create_notification(mess){
  let text = document.createElement("p");
  text.className = "notification";
  text.innerText = mess;
  text.style.backgroundColor = "#ffff";
  text.style.color = "#a94064";
  text.style.position = "absolute";
  text.style.left = "50%";
  text.style.transform = "translate(-50%, -200%)";
  text.style.zIndex = "2";
  text.style.padding = "10px 50px";
  text.style.fontSize = "2.4rem";
  text.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  document.querySelector(".header__menu").appendChild(text);
}

export function sign_in(){  
  let handle_click_sign_in = (e) => {
    e.preventDefault();
    let result = check_user();
    //tạo thông báo
    create_notification("Đăng nhập thành công!");
    //nếu đăng nhập thành công
    if (result) {
      // Xóa changeUserFormInMenuHeaderScript--------Xem hàm trong phần import 
      const changeUserFormInMenuHeaderExistingScript = document.querySelector(".change-user-form-in-menu-header-script");
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
      document.querySelector(".notification").style.transform = "translate(-50%, 20%)";

      check_info_user.check = true; //trạng thái đăng nhập

      //mờ dần
      setTimeout(() => {
        document.querySelector(".notification").style.opacity = "1"; 
      }, 2000);
    }

    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 2001);
  }
  document.querySelector(".btn-signin").onclick = handle_click_sign_in;
}

//function đăng ký
function sign_up(){
  let handle_sign_up = (e) =>{
    e.preventDefault();
    let result = add_user();

    //tạo phần tử p (thông báo khi đăng ký thành công)
    create_notification("Đăng ký thành công!");

    if(result){ 
      updateForm("login");
      sign_in();
      document.querySelector(".notification").style.transform = "translate(-50%, 20%)";
      //mờ dần
      setTimeout(() => {
        document.querySelector(".notification").style.opacity = "0"; 
      }, 800);
    }

    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 801);
  }
  document.querySelector(".btn-signup").onclick = handle_sign_up;
}

export function sign_out_user(){
  document.querySelector(".sign-out-user").addEventListener("click", (e) => {
    e.preventDefault();
    check_info_user.check = false;
    document.querySelector(".info-user").remove();//xóa info-user
    create_notification("Đăng xuất thành công!");

    setTimeout(() => {
      document.querySelector(".notification").style.transform = "translate(-50%, 20%)";
    }, 10);
    setTimeout(() =>{
      document.querySelector(".notification").style.opacity = "1";
    }, 2000);
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 2001);
  });
}
