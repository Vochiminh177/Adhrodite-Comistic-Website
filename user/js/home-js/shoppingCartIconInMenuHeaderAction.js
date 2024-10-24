import { removeAllStyleTags, formatVietNamMoney } from "../common-js/common.js";
import {
  productItemAddedToShoppingCart as currentProductItemAdded,
  abc,
} from "../common-js/database.js";
import { def } from "./test.js";

// Hàm cập nhật lại style
function updateStyleTags() {
  // Xoá các thẻ style đã tồn tại từ trước đó
  removeAllStyleTags();
  // Đặt lại style cho navBarStyle
  const navbarStyle = document.createElement("style");
  navbarStyle.className = "navbar-style";
  navbarStyle.innerHTML = `
      .header-navbar__action {
        color: #dbd7d7;
        text-shadow: none;
      }
      .header-navbar__action#home {
        color: #dbd7d7;
        text-shadow: none;
      }
      .header-navbar__action#home:hover {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
      .header-navbar__action:hover {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
    `;
  document.head.appendChild(navbarStyle);
}

// Hàm tính tổng số tiền của các sản phẩm hiện có trong currentProductItemAdded
function calTotalPrice() {
  let totalPrice = 0;
  currentProductItemAdded.forEach((productItem) => {
    if (productItem.quantity >= 1)
      totalPrice += productItem.price * productItem.quantity;
  });
  return totalPrice;
}

// Hàm cập nhật thông tin danh sách sản phẩm trong Giỏ hàng
function getShoppingCartListInfo() {}

// Hàm cập nhật thông tin Giỏ hàng
function getShoppingCartInfo() {
  // Hàm tạo một shoppingCartItem
  function createShoppingCartItemWithHtml(listDiv, indexInArray) {
    // Figure - Shopping-Cart Image
    let imageImg = document.createElement("img");
    imageImg.src = `${currentProductItemAdded[indexInArray].src}`;
    imageImg.alt = "";
    imageImg.className = "shopping-cart__image ";
    let figure = document.createElement("figure");
    figure.appendChild(imageImg);

    // Shopping-Cart Name - Shopping-Cart Details
    let nameH3 = document.createElement("h3");
    nameH3.className = "shopping-cart__name";
    nameH3.textContent = `${currentProductItemAdded[indexInArray].name}`;
    let detailsP = document.createElement("p");
    detailsP.className = "shopping-cart__details";
    detailsP.textContent = `
      ${currentProductItemAdded[indexInArray].id} /
      ${currentProductItemAdded[indexInArray].category} /
      ${formatVietNamMoney(currentProductItemAdded[indexInArray].price)}đ
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
    let numberSpan = document.createElement("span");
    numberSpan.className = "shopping-cart__number";
    numberSpan.textContent = `${currentProductItemAdded[indexInArray].quantity}`;
    let decrementA = document.createElement("a");
    decrementA.href = "#!";
    decrementA.className = "shopping-cart__operator";
    decrementA.setAttribute("data-shopping-cart-item-action", "decrement");
    decrementA.textContent = "-";
    // Shopping-Cart Quantity
    let quantityDiv = document.createElement("div");
    quantityDiv.className = "shopping-cart__quantity";
    quantityDiv.appendChild(incrementA);
    quantityDiv.appendChild(numberSpan);
    quantityDiv.appendChild(decrementA);

    // Shopping-Cart Product Total Price
    let productTotalPriceP = document.createElement("p");
    productTotalPriceP.className = "shopping-cart__product-total-price";
    productTotalPriceP.innerHTML = `${formatVietNamMoney(
      currentProductItemAdded[indexInArray].price *
        currentProductItemAdded[indexInArray].quantity
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

  // Cập nhật lại style khi nhấn vào xem giỏ hàng
  // updateStyleTags();

  // Shopping-Cart Title
  let titleH2 = document.createElement("h2");
  titleH2.className = "shopping-cart__title";
  titleH2.textContent = "GIỎ HÀNG";

  // Shopping-Cart List
  let listDiv = document.createElement("div");
  listDiv.className = "shopping-cart__list";

  /* Shopping-Cart Item / Shopping-Cart Inform (tuỳ thuộc vào số lượng
  sản phẩm trong mảng currentProductItemAdded) */
  if (currentProductItemAdded.length >= 1) {
    // Shopping-Cart Item
    for (let i = 0; i < currentProductItemAdded.length; i++) {
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
    calTotalPrice()
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
}

// Biến chỉ số lượng sản phẩm ban đầu trong Giỏ hàng
let numbersOfProductItem = currentProductItemAdded.length;
// Biến chỉ số lượng sản phẩm đã được xoá trong Giỏ hàng
let numbersOfProductItemRemoved = 0;

// Sự kiện khi người dùng nhấn vào icon giỏ hàng trên Header
export function showShoppingCartFormInMenuHeader() {
  document
    .getElementById("shopping-cart-click")
    .addEventListener("click", function () {
      // Cập nhật thông tin sản phẩm trong Giỏ hàng
      getShoppingCartInfo();

      //
      document
        .querySelector(".shopping-cart__list")
        .addEventListener("click", function (event) {
          // Loại bỏ giá trị mặc định
          event.preventDefault();

          // Biến để lấy ra từ khoá của hành động mà người dùng đã thực hiện
          const shoppingCartItemActionKey = event.target.getAttribute(
            "data-shopping-cart-item-action"
          );
          if (shoppingCartItemActionKey) {
            // Biến chỉ sản phẩm đã có hành động từ người dùng
            let productItem = event.target.closest(".shopping-cart__item");
            let productItemKey = productItem.getAttribute(
              "data-shopping-cart-item"
            );

            // Nếu từ khoá là "trash" (xoá sản phẩm khỏi Giỏ hàng)
            if (shoppingCartItemActionKey === "trash") {
              // Loại bỏ sản phẩm khỏi currentProductItemAdded
              currentProductItemAdded.splice(productItemKey - 1, 1, {});
              // function findStartIndex() {
              //   let index = currentProductItemAdded.length();
              //   for (let i = 0; i < currentProductItemAdded.length(); i++) {
              //     if (Math.abs(productItemKey - 1 - i) < index) index = i;
              //     console.log(i);
              //   }
              //   return index;
              // }
              // currentProductItemAdded.splice(findStartIndex, 1);
              productItem.remove();
              numbersOfProductItemRemoved++;
            }
            // Nếu từ khoá là "increment" / "decrement"
            else {
              // Biến chỉ số lượng sản phẩm hiện tại
              let currentNumber = event.target.parentElement.querySelector(
                ".shopping-cart__number"
              );
              // Biến chỉ số tiền của một sản phẩm hiện tại
              let currentProductTotalPrice =
                event.target.parentElement.parentElement.querySelector(
                  ".shopping-cart__product-total-price"
                );

              // Nếu từ khoả là "increment" (tăng sản phẩm)
              if (
                shoppingCartItemActionKey === "increment" &&
                parseInt(currentNumber.textContent) >= 1
              ) {
                currentNumber.textContent = `${
                  parseInt(currentNumber.textContent) + 1
                }`;
              }
              // Nếu từ khoá là "decrement" (giảm sản phẩm)
              else if (
                shoppingCartItemActionKey === "decrement" &&
                parseInt(currentNumber.textContent) >= 2
              ) {
                currentNumber.textContent = `${
                  parseInt(currentNumber.textContent) - 1
                }`;
              }
              // Gán lại số lượng sản phẩm được thêm vào Giỏ hàng
              currentProductItemAdded[productItemKey - 1].quantity = parseInt(
                currentNumber.textContent
              );
              // Tính lại tổng số tiền cho một sản phẩm
              currentProductTotalPrice.innerHTML = `${formatVietNamMoney(
                currentProductItemAdded[productItemKey - 1].price *
                  currentProductItemAdded[productItemKey - 1].quantity
              )}<u>đ</u>`;
            }

            // Biến chỉ giá tiền của tổng sản phẩm trong giỏ hàng
            let totalPrice = document.querySelector(
              ".shopping-cart__total-price"
            );
            totalPrice.innerHTML = `${formatVietNamMoney(
              calTotalPrice()
            )}<u>đ</u>`;
          }

          // Nếu số sản phẩm bị xoá bằng với số sản phẩm ban đầu trong Giỏ hàng
          if (numbersOfProductItemRemoved === numbersOfProductItem) {
            // Xử lý chưa triệt để
            while (currentProductItemAdded.length > 0) {
              currentProductItemAdded.pop();
            }
            getShoppingCartInfo();
          }
        });
    });
}
