import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { productItemAddedToShoppingCart} from "../../../database/database.js";
import { getPaymentInformationInfo } from "./getPaymentInformation.js";

// Hàm trở về trang Giỏ hàng khi người dùng ấn vào "Giỏ hàng" ở trang Thông tin hoá đơn
export function comebackShoppingCart(userList, index_user_status_login) {
  updateShoppingCart(userList, index_user_status_login);
}

// Hàm cập nhật các sản phẩm đã được thêm vào Giỏ hàng trong mảng (loại bỏ {})
function updateProductItemAddedInArray() {
  for (let i = 0; i < productItemAddedToShoppingCart.length; i++) {
    if (Object.entries(productItemAddedToShoppingCart[i]).length == 0) {
      productItemAddedToShoppingCart.splice(i, 1);
      i--;
    }
  }
}

// Hàm cập nhật thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
// function updateShoppingCartAfterActionsFromUser(userList, index_user_status_login) {
//   // Biến chỉ số lượng sản phẩm ban đầu trong Giỏ hàng
//   let numbersOfProductItem = userList[index_user_status_login].shoppingCart.length;
//   // Biến chỉ số lượng sản phẩm đã được xoá trong Giỏ hàng
//   let numbersOfProductItemRemoved = 0;

//   let productItem = document.querySelector(".shopping-cart__item");
//   let productItemKey = productItem.getAttribute("data-shopping-cart-item");

//   // Tạo sự kiện khi người dùng muốn tăng giảm số lượng (nhấn nút) hoặc xoá sản phẩm
//   document
//     .querySelector(".shopping-cart__list")
//     .addEventListener("click", function (event) {
//       // Loại bỏ giá trị mặc định
//       event.preventDefault();

//       // Biến để lấy ra từ khoá của hành động mà người dùng đã thực hiện
//       const shoppingCartItemActionKey = event.target.getAttribute(
//         "data-shopping-cart-item-action"
//       );
//       if (shoppingCartItemActionKey) {
//         // Biến chỉ sản phẩm đã có hành động từ người dùng
//         let productItem = event.target.closest(".shopping-cart__item");
//         let productItemKey = productItem.getAttribute(
//           "data-shopping-cart-item"
//         );

//         // Nếu từ khoá là "trash" (xoá sản phẩm khỏi Giỏ hàng)
//         if (shoppingCartItemActionKey === "trash") {
//           // Loại bỏ sản phẩm khỏi currentProductItemAdded
//           // userList[index_user_status_login].shoppingCart.splice(productItemKey - 1, 1, {});
//           userList[index_user_status_login].shoppingCart.splice(productItemKey - 1, 1);
//           productItem.remove();
//           numbersOfProductItemRemoved++;
//           console.log(userList[index_user_status_login].shoppingCart);
//         }
//         // Nếu từ khoá là "increment" / "decrement"
//         else {
//           // Biến chỉ số lượng sản phẩm hiện tại
//           let currentNumber = event.target.parentElement.querySelector(
//             ".shopping-cart__number"
//           );

//           // Biến chỉ số tiền của một sản phẩm hiện tại
//           let currentProductTotalPrice =
//             event.target.parentElement.parentElement.querySelector(
//               ".shopping-cart__product-total-price"
//             );

//           // Nếu từ khoá là "input" (nhập số lượng trực tiếp)
//           if (shoppingCartItemActionKey === "input") {
//             currentNumber.addEventListener("change", function () {
//               if (currentNumber.value <= 0) {
//                 // window.alert("Không cho phép nhập sản phẩm dưới 1");
//                 userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity = 1;
//               } else {
//                 userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity = parseInt(
//                   currentNumber.value
//                 );
//               }
//             });
//           }
//           // Nếu từ khoả là "increment" (tăng sản phẩm)
//           else if (
//             shoppingCartItemActionKey === "increment" &&
//             parseInt(currentNumber.value) >= 1
//           ) {
//             userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity++;
//           }
//           // Nếu từ khoá là "decrement" (giảm sản phẩm)
//           else if (
//             shoppingCartItemActionKey === "decrement" &&
//             parseInt(currentNumber.value) >= 2
//           ) {
//             userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity--;
//           }
//           // Gán lại số lượng sản phẩm được thêm vào Giỏ hàng
//           currentNumber.value = `${
//             userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity
//           }`;
//           // Tính lại tổng số tiền cho một sản phẩm
//           currentProductTotalPrice.innerHTML = `${formatVietNamMoney(
//             userList[index_user_status_login].shoppingCart[productItemKey - 1].price *
//               userList[index_user_status_login].shoppingCart[productItemKey - 1].quantity
//           )}<u>đ</u>`;
//         }

//         // Biến chỉ giá tiền của tổng sản phẩm trong giỏ hàng
//         let totalPrice = document.querySelector(".shopping-cart__total-price");
//         totalPrice.innerHTML = `${formatVietNamMoney(
//           calTotalProductItemPriceInShoppingCart(userList, index_user_status_login)
//         )}<u>đ</u>`;
//       }
      
//       // Nếu số sản phẩm bị xoá bằng với số sản phẩm ban đầu trong Giỏ hàng
//       if (numbersOfProductItemRemoved === numbersOfProductItem) {
//         // Cập nhật lại giỏ hàng
//         updateProductItemAddedInArray();

//         // Cập nhật lại thông tin các sản phẩm trong giỏ hàng
//         updateShoppingCart();
//       }

//       localStorage.setItem("userList", JSON.stringify(userList));
//     });
// }

//hiệu làm lại hàm cập nhật thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
function updateShoppingCartAfterActionsFromUser(userList, index_user_status_login){
  document.querySelectorAll(".shopping-cart__item").forEach((obj_product, index_product) => { //từng vị trí của sản phẩm
    let array_shopping_product = obj_product.querySelectorAll("[data-shopping-cart-item-action]");
    array_shopping_product.forEach((obj_input) => {
      if(obj_input.getAttribute("data-shopping-cart-item-action") == "increment"){ // nếu nhấn +
        obj_input.onclick = () => {
          obj_product.querySelector(".remove-arrow").value = parseInt(obj_product.querySelector(".remove-arrow").value) + 1;
          userList[index_user_status_login].shoppingCart[index_product].quantity = obj_product.querySelector(".remove-arrow").value;
          localStorage.setItem("userList", JSON.stringify(userList));
          updateShoppingCart();
        }
      }
      if(obj_input.getAttribute("data-shopping-cart-item-action") == "decrement"){ // nếu nhấn -
        obj_input.onclick = () => {
          obj_product.querySelector(".remove-arrow").value = parseInt(obj_product.querySelector(".remove-arrow").value) - 1;
          userList[index_user_status_login].shoppingCart[index_product].quantity = obj_product.querySelector(".remove-arrow").value; 
          localStorage.setItem("userList", JSON.stringify(userList));
          updateShoppingCart();
        }
      }
      if(obj_input.getAttribute("data-shopping-cart-item-action") == "trash"){ //nếu loại bỏ
        obj_input.onclick = () => {
          userList[index_user_status_login].shoppingCart.splice(index_product, 1);
          localStorage.setItem("userList", JSON.stringify(userList));
          updateShoppingCart();
        }
      }
      if(obj_input.getAttribute("data-shopping-cart-item-action") == "input"){ //nếu điền trực tiếp số lượng input
        obj_input.onchange = () => {
          userList[index_user_status_login].shoppingCart[index_product].quantity = obj_product.querySelector(".remove-arrow").value;
          updateShoppingCart();
          localStorage.setItem("userList", JSON.stringify(userList));
        }
      }
    });  
  });
}

// Hàm tạo thông tin của Giỏ hàng bằng các thẻ html
function updateShoppingCart() {
  console.log(123);
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let index_user_status_login;
  userList.forEach((obj, index) => {
    if(obj.status_login){
      index_user_status_login = index;
    }
  });

  // Hàm tạo một shoppingCartItem
  function createShoppingCartItemWithHtml(listDiv, indexInArray) {
    // Figure - Shopping-Cart Image
    let imageImg = document.createElement("img");
    imageImg.src = `${userList[index_user_status_login].shoppingCart[indexInArray].src}`;
    imageImg.alt = "";
    imageImg.className = "shopping-cart__image ";
    let figure = document.createElement("figure");
    figure.appendChild(imageImg);

    // Shopping-Cart Name - Shopping-Cart Details
    let nameH3 = document.createElement("h3");
    nameH3.className = "shopping-cart__name";
    nameH3.textContent = `${userList[index_user_status_login].shoppingCart[indexInArray].name}`;
    let detailsP = document.createElement("p");
    detailsP.className = "shopping-cart__details";
    detailsP.textContent = `
        ${userList[index_user_status_login].shoppingCart[indexInArray].id} /
        ${userList[index_user_status_login].shoppingCart[indexInArray].category} /
        ${formatVietNamMoney(userList[index_user_status_login].shoppingCart[indexInArray].price)}đ
      `;
    // Shopping-Cart Column
    let columnDiv = document.createElement("div");
    columnDiv.className = "shopping-cart__column";
    columnDiv.appendChild(nameH3);
    columnDiv.appendChild(detailsP);

    // Shopping-Cart Operator (Increment/Decrement) - Shopping-Cart Quantity
    let incrementA = document.createElement("a");
    incrementA.href = "#!";
    incrementA.className = "shopping-cart__operator";
    incrementA.setAttribute("data-shopping-cart-item-action", "increment");
    incrementA.textContent = "+";
    let numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.className = "shopping-cart__number remove-arrow";
    numberInput.setAttribute(
      "value",
      `${userList[index_user_status_login].shoppingCart[indexInArray].quantity}`
    );
    numberInput.setAttribute("data-shopping-cart-item-action", "input");
    let decrementA = document.createElement("a");
    decrementA.href = "#!";
    decrementA.className = "shopping-cart__operator";
    decrementA.setAttribute("data-shopping-cart-item-action", "decrement");
    decrementA.textContent = "-";
    // Shopping-Cart Quantity
    let quantityDiv = document.createElement("div");
    quantityDiv.className = "shopping-cart__quantity";
    quantityDiv.appendChild(incrementA);
    quantityDiv.appendChild(numberInput);
    quantityDiv.appendChild(decrementA);

    // Shopping-Cart Product Total Price
    let productTotalPriceP = document.createElement("p");
    productTotalPriceP.className = "shopping-cart__product-total-price";
    productTotalPriceP.innerHTML = `${formatVietNamMoney(
      userList[index_user_status_login].shoppingCart[indexInArray].price *
      userList[index_user_status_login].shoppingCart[indexInArray].quantity
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

    listDiv.appendChild(itemDiv);
  }

  // Shopping-Cart Title
  let titleH2 = document.createElement("h2");
  titleH2.className = "shopping-cart__title";
  titleH2.textContent = "GIỎ HÀNG";

  // Shopping-Cart List
  let listDiv = document.createElement("div");
  listDiv.className = "shopping-cart__list";

  /* Shopping-Cart Item / Shopping-Cart Inform (tuỳ thuộc vào số lượng
    sản phẩm trong mảng currentProductItemAdded) */
  if (userList[index_user_status_login].shoppingCart.length >= 1) {
    // Shopping-Cart Item
    for (let i = 0; i < userList[index_user_status_login].shoppingCart.length; i++) {
      createShoppingCartItemWithHtml(listDiv, i);
    }
  } else {
    // Shopping-Cart Inform
    let informP = document.createElement("p");
    informP.className = "shopping-cart__inform";
    informP.textContent = "KHÔNG CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG";
    listDiv.appendChild(informP);
  }

  // Shopping-Cart Body
  let bodyDiv = document.createElement("div");
  bodyDiv.className = "shopping-cart__body";
  bodyDiv.appendChild(listDiv);

  // Shopping-Cart Payment-Info
  let paymentInfoP = document.createElement("p");
  paymentInfoP.className = "shopping-cart__payment-info";
  paymentInfoP.innerHTML = `Tổng số tiền: <b class="shopping-cart__total-price">${formatVietNamMoney(
    calTotalProductItemPriceInShoppingCart(userList, index_user_status_login)
  )}<u>đ</u></b>`;
  // Shopping-Cart Payment-Button
  let paymentButton = document.createElement("button");
  paymentButton.className = "shopping-cart__payment-button";
  paymentButton.textContent = "Thanh toán";
  // Shopping-Cart Payment
  let paymentDiv = document.createElement("div");
  paymentDiv.className = "shopping-cart__payment";
  paymentDiv.appendChild(paymentInfoP);
  paymentDiv.appendChild(paymentButton);

  // Shopping-Cart Content
  let contentDiv = document.createElement("div");
  contentDiv.className = "shopping-cart__content";
  contentDiv.appendChild(titleH2);
  contentDiv.appendChild(bodyDiv);
  contentDiv.appendChild(paymentDiv);

  // Body Shopping-Cart
  let bodyShoppingCartDiv = document.createElement("div");
  bodyShoppingCartDiv.className = "body__shopping-cart";
  bodyShoppingCartDiv.appendChild(contentDiv);

  // Tạo một thẻ bao bọc bên ngoài để có trích xuất mã html của bodyShoppingCartDiv
  let bodyShoppingCartHtml = document.createElement("div");
  bodyShoppingCartHtml.appendChild(bodyShoppingCartDiv);

  // Cập nhật Shopping Cart vào Main Content
  const mainContentDiv = document.getElementById("main-content");
  mainContentDiv.innerHTML = `${bodyShoppingCartHtml.innerHTML}`;

  // Cập nhật lại thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
  updateShoppingCartAfterActionsFromUser(userList, index_user_status_login);

  // Tạo mẫu thông tin để thanh toán khi người dùng nhấn vào "Thanh toán"
  getPaymentInformationInfo();
}

// Hàm hiển thị thông tin của Giỏ hàng
export function getShoppingCartInfo() {
  // Cập nhật lại các sản phẩm đã được thêm vào Giỏ hàng trong mảng
  // updateProductItemAddedInArray();

  // Tạo thông tin của Giỏ hàng bằng các thẻ html
  updateShoppingCart();
}
