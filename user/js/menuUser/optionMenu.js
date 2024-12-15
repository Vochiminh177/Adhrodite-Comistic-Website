import {
  handleChangePassword,
  handleSaveDateInformation,
} from "./handleOptionMenu.js";
import { updateMainContent } from "../home-js/changeMainContent.js";

//hàm tạo thông báo
let idTimeout = null;
export function create_notification_user(mess) {
  const notification = document.getElementById("empty-notification");
  notification.className = "active";
  notification.innerHTML = mess;

  function removeNoti(){
    notification.innerHTML = "";
    notification.className = "";
    idTimeout = null;
  }

  if(idTimeout) clearTimeout(idTimeout);
  idTimeout = setTimeout(removeNoti, 2000);
}

//-----------------------------------OPTION USER----------------------------------------
// Hàm đăng xuất
export function signOutUser() {
  let indexCurrentUserLogin = -1;
  localStorage.setItem(
    "indexCurrentUserLogin",
    JSON.stringify(indexCurrentUserLogin)
  );
  document.querySelector(".header__admin-icon").style.visibility = "hidden";
  create_notification_user("Đăng xuất thành công!");
  updateMainContent("home");
}

// Hàm đổi mật khẩu
export function changePassword() {
  let ele = document.createElement("div");
  ele.className = "container-change-password-user";
  ele.innerHTML = `
      <div class="form-change-password">
        <div class="content-change-password">
          <button class="exit-form-change-password-user">&times;</button>
          <p>Đổi mật khẩu</p>
          <div class="old-password-change">
            <label for="old-password-change"></label>
            <input type="text" id="old-password-change" placeholder="Nhập mật khẩu cũ">
          </div>
          <div class="new-password-change">
            <label for="new-password-change"></label>
            <input type="text" id="new-password-change" placeholder="Nhập mật khẩu mới">
          </div>
          <button class="btn-save-change-password">Lưu thay đổi</button>
        </div>
      </div>
      <div class="overlay-change-password"></div>
    `;
  document.body.appendChild(ele);

  document.querySelector(".exit-form-change-password-user").onclick = () => {
    ele.remove();
  };
  document.querySelector(".overlay-change-password").onclick = () => {
    ele.remove();
  };

  document.querySelector(".btn-save-change-password").onclick = () => {
    let result = handleChangePassword();
    if (result) {
      create_notification_user("Đổi mật khẩu thành công!");
      ele.remove();
    }
  };
}

// Hàm hiện form khi ấn thông tin cá nhân trong menu-user
export function showFormInformation(userList, indexCurrentUserLogin) {
  let formInformationUser = `
        <div class="form-user">
          <button class="exit-form-information-user">&times;</button>
          <h2>Thông Tin Cá Nhân</h2>
          <div class="two-input">

            <input type="text" class="first-name" value="${
              userList[indexCurrentUserLogin].first_name
                ? userList[indexCurrentUserLogin].first_name
                : ""
            }" placeholder="Nhập họ">
            <input type="text" class="last-name" value="${
              userList[indexCurrentUserLogin].last_name
                ? userList[indexCurrentUserLogin].last_name
                : ""
            }" placeholder="Nhập tên">

          </div>
          <div class="one-input">
            <input type="text" class="phone" value="${
              userList[indexCurrentUserLogin].phone
                ? userList[indexCurrentUserLogin].phone
                : ""
            }" placeholder="Nhập số điện thoại">
          </div>
          <div class="one-input">
            <input type="text" class="email" value="${
              userList[indexCurrentUserLogin].email
                ? userList[indexCurrentUserLogin].email
                : ""
            }" placeholder="Nhập email">
          </div>
          <div class="one-input">
            <input type="text" class="address" value="${
              userList[indexCurrentUserLogin].address
                ? userList[indexCurrentUserLogin].address
                : ""
            }" placeholder="Nhập địa chỉ">
          </div>
          <div class="one-input-btn">
            <a class="save-information">Lưu thông tin</a>
          </div>
        </div>
        <div class="overlay-user"></div>
    `;
  let ele = document.createElement("div");
  ele.className = "container-formInformation-user";
  ele.innerHTML = formInformationUser;
  document.body.appendChild(ele);

  document.querySelector(".exit-form-information-user").onclick = () => {
    ele.remove();
  };
  document.querySelector(".overlay-user").onclick = () => {
    ele.remove();
  };

  document.querySelector(".form-user .save-information").onclick = (e) => {
    e.preventDefault();
    let result = handleSaveDateInformation(indexCurrentUserLogin);
    if (result) {
      create_notification_user("Lưu thành công!");
    }
  };
}

// //hàm lịch sử mua hàng
// export function showOrderHistory() {
//     let userList = JSON.parse(localStorage.getItem("userList")) || [];
//     let indexUserStatusLogin;
//     userList.forEach((obj, index) => {
//         if (obj.statusLogin) {
//             indexUserStatusLogin = index;
//         }
//     });

//     // Hàm tạo một orderHistoryItem
//     function createOrderHistoryItemWithHtml(ele, i, indexInArray) {
//         // Figure - OrderHistory Image
//         let imageImg = document.createElement("img");
//         imageImg.src = `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].src}`;
//         imageImg.alt = "";
//         imageImg.className = "shopping-cart__image ";
//         let figure = document.createElement("figure");
//         figure.appendChild(imageImg);

//         // ordersHistory Name - ordersHistory Details
//         let nameH3 = document.createElement("h3");
//         nameH3.className = "shopping-cart__name";
//         nameH3.textContent = `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].name}`;
//         let detailsP = document.createElement("p");
//         detailsP.className = "shopping-cart__details";
//         detailsP.textContent = `
//           ${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
//                 indexInArray
//             ].id
//             } /
//           ${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
//                 indexInArray
//             ].category
//             } /
//           ${formatVietNamMoney(
//                 userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
//                     indexInArray
//                 ].price
//             )}đ
//         `;
//         // Shopping-Cart Column
//         let columnDiv = document.createElement("div");
//         columnDiv.className = "shopping-cart__column";
//         columnDiv.appendChild(nameH3);
//         columnDiv.appendChild(detailsP);

//         //Shopping-Cart Quantity
//         let numberInput = document.createElement("input");
//         numberInput.disabled = "true";
//         numberInput.type = "number";
//         numberInput.className = "shopping-cart__number remove-arrow";
//         numberInput.setAttribute(
//             "value",
//             `${userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray].quantity}`
//         );

//         let quantityDiv = document.createElement("div");
//         quantityDiv.className = "shopping-cart__quantity";
//         quantityDiv.appendChild(numberInput);

//         // Shopping-Cart Product Total Price
//         let productTotalPriceP = document.createElement("p");
//         productTotalPriceP.className = "shopping-cart__product-total-price";
//         productTotalPriceP.innerHTML = `${formatVietNamMoney(
//             userList[indexUserStatusLogin].ordersHistory[i].orderProduct[indexInArray]
//                 .price *
//             userList[indexUserStatusLogin].ordersHistory[i].orderProduct[
//                 indexInArray
//             ].quantity
//         )}<u>đ</u>`;

//         // Shopping-Cart Trash
//         let trashA = document.createElement("button");
//         trashA.href = "#!";
//         trashA.className = "shopping-cart__trash";
//         trashA.setAttribute("data-shopping-cart-item-action", "trash");
//         trashA.innerHTML = `
//           <i class="fa-solid fa-trash-can"></i>
//         `;

//         // Shopping-Cart Item
//         let itemDiv = document.createElement("div");
//         itemDiv.className = "shopping-cart__item";
//         itemDiv.setAttribute("data-shopping-cart-item", indexInArray + 1);
//         itemDiv.appendChild(figure);
//         itemDiv.appendChild(columnDiv);
//         itemDiv.appendChild(quantityDiv);
//         itemDiv.appendChild(productTotalPriceP);
//         itemDiv.appendChild(trashA);

//         ele.appendChild(itemDiv);
//     }

//     // Shopping-Cart Title
//     let titleH2 = document.createElement("h2");
//     titleH2.className = "shopping-cart__title";
//     titleH2.textContent = "LỊCH SỬ MUA HÀNG";

//     // Shopping-Cart List
//     let listDiv = document.createElement("div");
//     listDiv.className = "shopping-cart__list";

//     /* Shopping-Cart Item / Shopping-Cart Inform (tuỳ thuộc vào số lượng
//       sản phẩm trong mảng currentProductItemAdded) */
//     if (userList[indexUserStatusLogin].ordersHistory.length >= 1) {
//         const ordersHistoryLength =
//             userList[indexUserStatusLogin].ordersHistory.length;
//         // Shopping-Cart Item
//         for (let i = 0; i < ordersHistoryLength; i++) {
//             let ele = document.createElement("div");
//             ele.className = "order-date";
//             let orderDate = document.createElement("p");
//             orderDate.textContent = "Ngày đặt: " + userList[indexUserStatusLogin].ordersHistory[i].orderDate;
//             ele.appendChild(orderDate);
//             let orderStatus = document.createElement("p");
//             orderStatus.textContent = "Trạng thái: " + userList[indexUserStatusLogin].ordersHistory[i].orderStatus;
//             ele.appendChild(orderStatus);
//             userList[indexUserStatusLogin].ordersHistory[i].orderProduct.forEach(
//                 (obj, index) => {
//                     createOrderHistoryItemWithHtml(ele, i, index);
//                 }
//             );
//             listDiv.appendChild(ele);
//         }

//         setTimeout(() => {
//             deleteProductInOrderHistory(userList, indexUserStatusLogin);
//         }, 10);
//     } else {
//         // Shopping-Cart Inform
//         let informP = document.createElement("p");
//         informP.className = "shopping-cart__inform";
//         informP.textContent = "BẠN CHƯA MUA SẢN PHẨM NÀO";
//         listDiv.appendChild(informP);
//     }

//     // Shopping-Cart Body
//     let bodyDiv = document.createElement("div");
//     bodyDiv.className = "shopping-cart__body";
//     bodyDiv.appendChild(listDiv);

//     // Shopping-Cart Content
//     let contentDiv = document.createElement("div");
//     contentDiv.className = "shopping-cart__content";
//     contentDiv.appendChild(titleH2);
//     contentDiv.appendChild(bodyDiv);
//     // contentDiv.appendChild(paymentDiv);

//     // Body Shopping-Cart
//     let bodyordersHistoryDiv = document.createElement("div");
//     bodyordersHistoryDiv.className = "body__shopping-cart";
//     bodyordersHistoryDiv.appendChild(contentDiv);

//     // Tạo một thẻ bao bọc bên ngoài để có trích xuất mã html của bodyordersHistoryDiv
//     let bodyordersHistoryHtml = document.createElement("div");
//     bodyordersHistoryHtml.appendChild(bodyordersHistoryDiv);

//     // Cập nhật Shopping Cart vào Main Content
//     const mainContentDiv = document.getElementById("main-content");
//     mainContentDiv.innerHTML = `${bodyordersHistoryHtml.innerHTML}`;
// }

//hàm xóa bỏ sản phẩm đã đặt hàng của user
// function deleteProductInOrderHistory(userList, indexUserStatusLogin) {
//     let arrayOrderDateDiv = document.querySelectorAll(".order-date");

//     arrayOrderDateDiv.forEach((objOrderDateDiv, indexOrderDateDiv) => {
//         let arrayItemDiv = objOrderDateDiv.querySelectorAll(".shopping-cart__item");

//         arrayItemDiv.forEach((objItemDiv, indexItemDiv) => {
//             objItemDiv.querySelector("button").onclick = () => {
//                 userList[indexUserStatusLogin].ordersHistory[
//                     indexOrderDateDiv
//                 ].orderProduct.splice(indexItemDiv, 1); // xóa sản phẩm đã chọn
//                 if (
//                     userList[indexUserStatusLogin].ordersHistory[indexOrderDateDiv]
//                         .orderProduct.length == 0
//                 ) {
//                     //nếu xóa hết sản phẩm của lần mua đó thì xóa lần mua đó
//                     userList[indexUserStatusLogin].ordersHistory.splice(
//                         indexOrderDateDiv,
//                         1
//                     );
//                 }
//                 localStorage.setItem("userList", JSON.stringify(userList));
//                 showOrderHistory(); //gọi lại hàm để in ra
//                 create_notification_user("Xóa thành công!");
//             };
//         });
//     });
// }

//-------------------------------------------------------------------------------------------
