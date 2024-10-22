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
      <label for="remember-user-account">
        <p>Ghi nhớ mật khẩu</p>
      </label>
    </div>
    <div class="header__form-group">
      <input type="submit" value="Đăng nhập" />
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
    />
  </div>
  <div class="header__form-group">
    <label for="email">Nhập email</label>
    <input type="email" id="email" placeholder="Nhập email" />
  </div>
  <div class="header__form-group">
    <label for="first-password">
      <p>Nhập mật khẩu</p>
    </label>
    <input
      type="first-password"
      id="first-password"
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
    <input type="submit" value="Đăng ký" />
  </div>
</form>
</div>`,
};

function updateForm(formKey) {
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
    }
  });
