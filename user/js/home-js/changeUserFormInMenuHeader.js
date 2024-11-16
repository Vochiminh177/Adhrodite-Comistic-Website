import { updateMainContent } from "./changeMainContent.js";
import {
  handleSignUp,
  handleSignIn,
  handleChangePassword,
  handleSaveDateInformation,
} from "../userUpdate/handleUserUpdate.js";
import { updateStyleTags } from "./shoppingCartIconInMenuHeaderAction.js";
import { getShoppingCartInfo } from "./getShoppingCart.js";
import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";

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
  document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
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
    if (result) {
      create_notification_user("Đổi mật khẩu thành công!");
    }
  };
}

//hàm hiện form khi ấn thông tin cá nhân trong menu-user
function handle_showInformation(userList, userStatusLoginIndex) {
  document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
  let formInformationUser = `
      <div class="form-user">
        <button class="exit-form-information-user">X</button>
        <h2>Thông Tin Cá Nhân</h2>
        <div class="two-input">
          <input type="text" class="first-name" placeholder="Nhập họ" value="${userList[userStatusLoginIndex].firstName}">
          <input type="text" class="last-name" placeholder="Nhập tên" value="${userList[userStatusLoginIndex].lastName}">
        </div>
        <div class="one-input">
          <input type="text" class="phone" placeholder="Nhập số điện thoại" value="${userList[userStatusLoginIndex].phone}">
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
      </div>
  `;
  let ele = document.createElement("div");
  ele.className = "container-formInformation-user";
  ele.innerHTML = formInformationUser;
  document.body.appendChild(ele);

  document.querySelector(".form-user .save-information").onclick = () => {
    let result = handleSaveDateInformation(userStatusLoginIndex);
    if (result) {
      create_notification_user("Lưu thành công!");
    }
  };

  document.querySelector(".exit-form-information-user").onclick = () => {
    document.querySelector(".container-formInformation-user").remove();
  };
}

//hàm lịch sử mua hàng
function showOrderHistory() {
  if (document.querySelector(".header__user-menu"))
    document.querySelector(".header__user-menu").remove(); //xóa header__user-menu
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let indexUserStatusLogin;
  userList.forEach((obj, index) => {
    if (obj.statusLogin) {
      indexUserStatusLogin = index;
    }
  });

  // Hàm tạo một orderHistoryItem
  function createOrderHistoryItemWithHtml(ele, i, indexInArray) {
    // Figure - OrderHistory Image
    let imageImg = document.createElement("img");
    imageImg.src = `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].src}`;
    imageImg.alt = "";
    imageImg.className = "shopping-cart__image ";
    let figure = document.createElement("figure");
    figure.appendChild(imageImg);

    // ordersHistory Name - ordersHistory Details
    let nameH3 = document.createElement("h3");
    nameH3.className = "shopping-cart__name";
    nameH3.textContent = `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].name}`;
    let detailsP = document.createElement("p");
    detailsP.className = "shopping-cart__details";
    detailsP.textContent = `
        ${
          userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
            indexInArray
          ].id
        } /
        ${
          userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
            indexInArray
          ].category
        } /
        ${formatVietNamMoney(
          userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
            indexInArray
          ].price
        )}đ
      `;
    // Shopping-Cart Column
    let columnDiv = document.createElement("div");
    columnDiv.className = "shopping-cart__column";
    columnDiv.appendChild(nameH3);
    columnDiv.appendChild(detailsP);

    //Shopping-Cart Quantity
    let numberInput = document.createElement("input");
    numberInput.disabled = "true";
    numberInput.type = "number";
    numberInput.className = "shopping-cart__number remove-arrow";
    numberInput.setAttribute(
      "value",
      `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].quantity}`
    );

    let quantityDiv = document.createElement("div");
    quantityDiv.className = "shopping-cart__quantity";
    quantityDiv.appendChild(numberInput);

    // Shopping-Cart Product Total Price
    let productTotalPriceP = document.createElement("p");
    productTotalPriceP.className = "shopping-cart__product-total-price";
    productTotalPriceP.innerHTML = `${formatVietNamMoney(
      userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray]
        .price *
        userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
          indexInArray
        ].quantity
    )}<u>đ</u>`;

    // Shopping-Cart Trash
    let trashA = document.createElement("button");
    trashA.href = "#!";
    trashA.className = "shopping-cart__trash";
    trashA.setAttribute("data-shopping-cart-item-action", "trash");
    trashA.innerHTML = `
        <i class="fa-solid fa-trash-can"></i>
      `;

    // Shopping-Cart Item
    let itemDiv = document.createElement("div");
    itemDiv.className = "shopping-cart__item";
    itemDiv.setAttribute("data-shopping-cart-item", indexInArray + 1);
    itemDiv.appendChild(figure);
    itemDiv.appendChild(columnDiv);
    itemDiv.appendChild(quantityDiv);
    itemDiv.appendChild(productTotalPriceP);
    itemDiv.appendChild(trashA);

    ele.appendChild(itemDiv);
  }

  // Shopping-Cart Title
  let titleH2 = document.createElement("h2");
  titleH2.className = "shopping-cart__title";
  titleH2.textContent = "LỊCH SỬ MUA HÀNG";

  // Shopping-Cart List
  let listDiv = document.createElement("div");
  listDiv.className = "shopping-cart__list";

  /* Shopping-Cart Item / Shopping-Cart Inform (tuỳ thuộc vào số lượng
    sản phẩm trong mảng currentProductItemAdded) */
  if (userList[indexUserStatusLogin].ordersHistory.length >= 1) {
    const ordersHistoryLength =
      userList[indexUserStatusLogin].ordersHistory.length;
    // Shopping-Cart Item
    for (let i = 0; i < ordersHistoryLength; i++) {
      let ele = document.createElement("div");
      ele.className = "order-date";
      let orderDate = document.createElement("p");
      orderDate.textContent =
        userList[indexUserStatusLogin].ordersHistory[i].orderDate;
      ele.appendChild(orderDate);
      userList[indexUserStatusLogin].ordersHistory[i].orderProduct.forEach(
        (obj, index) => {
          createOrderHistoryItemWithHtml(ele, i, index);
        }
      );
      listDiv.appendChild(ele);
    }

    setTimeout(() => {
      deleteProductInOrderHistory(userList, indexUserStatusLogin);
    }, 10);
  } else {
    // Shopping-Cart Inform
    let informP = document.createElement("p");
    informP.className = "shopping-cart__inform";
    informP.textContent = "BẠN CHƯA MUA SẢN PHẨM NÀO";
    listDiv.appendChild(informP);
  }

  // Shopping-Cart Body
  let bodyDiv = document.createElement("div");
  bodyDiv.className = "shopping-cart__body";
  bodyDiv.appendChild(listDiv);

  // Shopping-Cart Content
  let contentDiv = document.createElement("div");
  contentDiv.className = "shopping-cart__content";
  contentDiv.appendChild(titleH2);
  contentDiv.appendChild(bodyDiv);
  // contentDiv.appendChild(paymentDiv);

  // Body Shopping-Cart
  let bodyordersHistoryDiv = document.createElement("div");
  bodyordersHistoryDiv.className = "body__shopping-cart";
  bodyordersHistoryDiv.appendChild(contentDiv);

  // Tạo một thẻ bao bọc bên ngoài để có trích xuất mã html của bodyordersHistoryDiv
  let bodyordersHistoryHtml = document.createElement("div");
  bodyordersHistoryHtml.appendChild(bodyordersHistoryDiv);

  // Cập nhật Shopping Cart vào Main Content
  const mainContentDiv = document.getElementById("main-content");
  mainContentDiv.innerHTML = `${bodyordersHistoryHtml.innerHTML}`;

  // Cập nhật lại thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
  // updateOrdersHistoryAfterActionsFromUser(userList, index_user_status_login);
}

//hàm show menu profile
export function showUserMenu() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let userStatusLoginIndex = -1;
  userList.forEach((obj, index) => {
    if (obj.statusLogin == true) {
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
            <a href="" class="header__user-menu-action private-info">
              <p>Thông tin cá nhân</p>
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

    document.querySelector(".private-info").onclick = (e) => {
      e.preventDefault();
      if (document.querySelector(".container-formInformation-user")) {
        document.querySelector(".container-formInformation-user").remove();
      } else {
        handle_showInformation(userList, userStatusLoginIndex);
      }
    };

    document.querySelector(".change-password").onclick = (e) => {
      e.preventDefault();
      if (!document.querySelector(".container-change-password-user")) {
        changePassword();
      } else document.querySelector(".container-change-password-user").remove();
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

    document.querySelector(".info").onclick = (e) => {
      e.preventDefault();
      // Kéo lên đầu trang mỗi lần chuyển trang
      window.scrollTo(0, 0);

      showOrderHistory();
    };
  }
  //nếu click mà đang hiện form thì xóa form
  else {
    document.querySelector(".header__user-menu").remove(); //tắt header__user-menu
  }
}

//hàm xóa bỏ sản phẩm đã đặt hàng của user
function deleteProductInOrderHistory(userList, indexUserStatusLogin) {
  let arrayOrderDateDiv = document.querySelectorAll(".order-date");
  console.log(arrayOrderDateDiv);
  arrayOrderDateDiv.forEach((objOrderDateDiv, indexOrderDateDiv) => {
    let arrayItemDiv = objOrderDateDiv.querySelectorAll(".shopping-cart__item");
    console.log(arrayItemDiv);
    arrayItemDiv.forEach((objItemDiv, indexItemDiv) => {
      objItemDiv.querySelector("button").onclick = () => {
        userList[indexUserStatusLogin].ordersHistory[
          indexOrderDateDiv
        ].orderProduct.splice(indexItemDiv, 1); // xóa sản phẩm đã chọn
        if (
          userList[indexUserStatusLogin].ordersHistory[indexOrderDateDiv]
            .orderProduct.length == 0
        ) {
          //nếu xóa hết sản phẩm của lần mua đó thì xóa lần mua đó
          userList[indexUserStatusLogin].ordersHistory.splice(
            indexOrderDateDiv,
            1
          );
        }
        localStorage.setItem("userList", JSON.stringify(userList));
        showOrderHistory(); //gọi lại hàm để in ra
      };
    });
  });
}
