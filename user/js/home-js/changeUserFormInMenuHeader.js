
import { handle_sign_up, handle_sign_in, handle_change_password} from "../userUpdate/handleUserUpdate.js";

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


export let check_info_user = { //nếu true thì đang ở trạng thái đăng nhập, click user-click thì hiện form infouser
  check: false
};

//hàm tạo thông báo
function create_notification_user(mess) {
  let text = document.createElement("p");
  text.className = "notification";
  text.innerText = mess;
  text.style.backgroundColor = "#ffff";
  text.style.color = "#a94064";
  text.style.position = "absolute";
  text.style.right = "0px";
  text.style.top = "0px";
  text.style.transform = "translate(100%, 50%)";
  text.style.zIndex = "2";
  text.style.padding = "10px 50px";
  text.style.fontSize = "2rem";
  text.style.boxShadow = "1px 1px 12px rgba(0, 0, 0, 0.3)";
  text.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  document.body.appendChild(text);
}

export function sign_in() {
  let handle_click_sign_in = (e) => {
    e.preventDefault();
    let result = handle_sign_in();
    //tạo thông báo
    create_notification_user("Đăng nhập thành công!");
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
      document.querySelector(".notification").style.transform = "translate(-10%, 50%)";

      check_info_user.check = true; //trạng thái đăng nhập

      //tắt dần
      setTimeout(() => {
        document.querySelector(".notification").style.transform = "translate(100%, 50%)";
      }, 2000);
    }

    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 3000);
  }
  document.querySelector(".btn-signin").onclick = handle_click_sign_in;
}

//function đăng ký
function sign_up() {
  let handle_sign_up = (e) => {
    e.preventDefault();
    let result = handle_sign_up();

    //tạo phần tử p (thông báo khi đăng ký thành công)
    create_notification_user("Đăng ký thành công!");

    if (result) {
      updateForm("login");
      sign_in();
      document.querySelector(".notification").style.transform = "translate(-10%, 50%)";
      //mờ dần
      setTimeout(() => {
        document.querySelector(".notification").style.transform = "translate(100%, 50%)";
      }, 2000);
    }

    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 3000);
  }
  document.querySelector(".btn-signup").onclick = handle_sign_up;
}

export function sign_out_user() {
  document.querySelector(".sign-out-user").addEventListener("click", (e) => {
    e.preventDefault();
    check_info_user.check = false;

    document.querySelector(".info-user").remove();//xóa info-user
    create_notification_user("Đăng xuất thành công!");

    setTimeout(() => {
      document.querySelector(".notification").style.transform = "translate(-10%, 50%)";
    }, 10);
    //mờ dần
    setTimeout(() => {
      document.querySelector(".notification").style.transform = "translate(100%, 50%)";
    }, 2000);
    //xóa khỏi dom
    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 3000);
  });
}

export function change_password() {
  document.querySelector(".change-password-user").onclick = (e) => {
    document.querySelector(".info-user").remove(); //xóa form infouser khi ấn đổi mật khẩu
    e.preventDefault();
    let ele = document.createElement("div");
    ele.className = "container-change-password-user";
    ele.innerHTML = `
      <div class="form-change-password">
        <div class="content-change-password">
          <button class="exit-form-change-user">X</button>
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

    document.querySelector(".exit-form-change-user").onclick = () => {
      ele.remove();
    };

    document.querySelector(".btn-save-change-password").onclick = () => {
      let result = handle_change_password();
      create_notification_user("Đổi mật khẩu thành công!");

      if(result){
        setTimeout(() => {
          document.querySelector(".notification").style.transform = "translate(-10%, 50%)";
        }, 10);
        //tắt dần
        setTimeout(() => {
          document.querySelector(".notification").style.transform = "translate(100%, 50%)";
        }, 2000);
      }
      //xóa khỏi dom
      setTimeout(() => {
        document.querySelector(".notification").remove();
      }, 3000);
    };
  };
}


export function show_infoUser() {
  let check = document.querySelector(".info-user"); //để kiểm tra đang hiện form hay không, nếu có thì xóa, nếu không thì tạo form
  if (!check) {
    let infoUser = `
              <div class="container-info">
                  <img src="./assets/images/acnecream-image-1.jpg" alt="img">
                  <h2>Chào bạn !</h2>
                 
                  <a href="">
                    <p>Hồ sơ</p>
                    
                  </a>
                  <a href="" class="change-password-user">
                    <p>Đổi mật khẩu</p>
                    
                  </a>
                  <a href="" class="sign-out-user">
                    <p>Đăng xuất</p>
                    
                  </a>
              </div>
        `;
    let info_user = document.createElement("div");
    info_user.classList.add("info-user");
    info_user.innerHTML = infoUser;
    document.querySelector(".header__menu").appendChild(info_user);

    sign_out_user();
    change_password();
    setTimeout(() => {
      info_user.style.opacity = "1";
    }, 10);

    document.querySelector(".header__navbar").onclick = () => {
      document.querySelector(".info-user").remove();
    }
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".info-user").remove(); //tắt info-user
  }
}