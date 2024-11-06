
import { usersList } from "../../../database/database.js";
import { handle_sign_up, handle_sign_in, handle_change_password, handle_save_data_information, handle_save_data_money} from "../userUpdate/handleUserUpdate.js";

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
        sign_up();
      }

      else {
        sign_in();
      }
    }
  });


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
  setTimeout(() => {
    document.querySelector(".notification").style.transform = "translate(-10%, 50%)";
  }, 10);
  setTimeout(() => {
    document.querySelector(".notification").style.transform = "translate(100%, 50%)";
  }, 1000);
  //xóa khỏi dom
  setTimeout(() => {
    document.querySelector(".notification").remove();
  }, 2200);
}

// hàm đăng nhập
export function sign_in() {
  document.querySelector(".btn-signin").onclick = (e) => {
    e.preventDefault();
    let result = handle_sign_in();

    //nếu đăng nhập thành công
    if (result) {
      //tạo thông báo
      create_notification_user("Đăng nhập thành công!");

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

      check_info_user.check = true; //trạng thái đăng nhập
    }
  }
}

//function đăng ký
function sign_up() {
  document.querySelector(".btn-signup").onclick = (e) => {
    e.preventDefault();
    let result = handle_sign_up();
    if (result) {
      updateForm("login");
      sign_in();
      //tạo phần tử p (thông báo khi đăng ký thành công)
      create_notification_user("Đăng ký thành công!");
    }
  };
}

//hàm đăng xuất
export let check_info_user = { //nếu true thì đang ở trạng thái đăng nhập, click user-click thì hiện form infouser, export cho file userIconMenu....
  check: false
};
export function sign_out_user() {
  check_info_user.check = false;

  document.querySelector(".info-user").remove();//xóa info-user
  create_notification_user("Đăng xuất thành công!");
  
}

//hàm đổi mật khẩu
export function change_password() {
  document.querySelector(".info-user").remove(); //xóa form infouser khi ấn đổi mật khẩu
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
}

//hàm show menu profile
export function show_menuUser() {
  let check = document.querySelector(".info-user"); //để kiểm tra đang hiện form hay không, nếu có thì xóa, nếu không thì tạo form
  if (!check) {
    let infoUser = `
              <div class="container-info">
                  <img src="./assets/images/acnecream-image-1.jpg" alt="img">
                  <h2>Chào bạn !</h2>
                 
                  <a href="" class="info-profile">
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
    setTimeout(() => {
      info_user.style.opacity = "1";
    }, 10);

    document.querySelector(".sign-out-user").onclick = (e) => {
      e.preventDefault();
      sign_out_user();
    };
    document.querySelector(".change-password-user").onclick = (e) => {
      e.preventDefault();
      change_password();
    };
    document.querySelector(".info-profile").onclick = (e) => {
      e.preventDefault();
      show_profile_user();
    };

    document.querySelector(".header__navbar").onclick = () => {
      if(document.querySelector(".info-user")) document.querySelector(".info-user").remove();
    }
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".info-user").remove(); //tắt info-user
  }
}

//hàm show profile
function render_form_profile(){
  let userList = JSON.parse(localStorage.getItem("userList"));
  let index_user_status_login;
    //vị trí user đang đăng nhập
    userList.forEach((obj, index) => {
      if(obj.status_login){
        index_user_status_login = index;
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
            <img src="${userList[index_user_status_login].src}" alt="">
            <h2>${userList[index_user_status_login].first_name + " " + userList[index_user_status_login].last_name}</h2>
            <hr>
            <div class="information info">
              <p>Tài khoản</p>
            </div>
            <div class="money info">
              <p>Ví</p>
            </div>
          </div>
          <div class="right-content">
          </div>
        </div>
      </div>
  `;
  document.body.appendChild(ele);
}

function show_profile_user(){
  let userList = JSON.parse(localStorage.getItem("userList"));
  let index_user_status_login;
  //vị trí user đang đăng nhập
  userList.forEach((obj, index) => {
    if(obj.status_login){
      index_user_status_login = index;
      return;
    }
  });

  render_form_profile();

  //nếu click tài khoản
  document.querySelector(".information").onclick = () => {
    let right_content = `
      <div class="two-input">
        <input type="text" class="first-name" placeholder="Nhập họ" value="${userList[index_user_status_login].first_name}">
        <input type="text" class="last-name" placeholder="Nhập tên" value="${userList[index_user_status_login].last_name}">
      </div>
      <div class="two-input">
        <input type="text" class="phone" placeholder="Nhập số điện thoại" value="${userList[index_user_status_login].phone}">
        <input type="file" class="picture-profile" accept="image/*">
      </div>
      <div class="one-input">
        <input type="text" class="address" placeholder="Nhập địa chỉ" value="${userList[index_user_status_login].address}">
      </div>
      <div class="one-input">
        <input type="text" class="email-info" placeholder="Nhập email" value="${userList[index_user_status_login].email}">
      </div>
      <div class="one-input-btn">
        <button class="save-information">Lưu thông tin</button>
      </div>
      `;
    document.querySelector(".right-content").innerHTML = right_content;

    //nếu ấn nút lưu thông tin
    document.querySelector(".save-information").onclick = () => {
      let result = handle_save_data_information(index_user_status_login);
      if(result){
        create_notification_user("Cập nhật thành công");
        document.querySelector(".container-profile-user").remove();
        show_profile_user();
      }
    };
  }

  //nếu click ví
  let index_user_login;
  document.querySelector(".money").onclick = () => {
    let right_content = `
      <div class="two-input">
        <input type="text" class="stk" placeholder="Nhập số tài khoản" value="${userList[index_user_status_login].stk}">
        <input type="text" class="bank" placeholder="Nhập tên ngân hàng" value="${userList[index_user_status_login].bank}">
      </div>
      <div class="one-input-btn">
        <button class="save-money">Lưu thông tin</button>
      </div> 
    `;
    document.querySelector(".right-content").innerHTML = right_content;

    //nếu ấn lưu ví
    document.querySelector(".save-money").onclick = () => {
      let result = handle_save_data_money(index_user_status_login);
      if(result){
        create_notification_user("Cập nhật ví thành công");
        document.querySelector(".container-profile-user").remove();
        show_profile_user();
      }
    };
  }
  
}