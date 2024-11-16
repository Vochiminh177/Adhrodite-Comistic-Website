import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { generateFilter } from "../products-js/generateFilter.js";
import { getPaymentInformationInfo } from "./getPaymentInformation.js";

// Hàm trở về trang Giỏ hàng khi người dùng ấn vào "Giỏ hàng" ở trang Thông tin hoá đơn
export function comebackShoppingCart(userList, userStatusLoginIndex) {
  updateShoppingCart(userList, userStatusLoginIndex);
  generateFilter();
}

//hiệu làm lại hàm cập nhật thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
function updateShoppingCartAfterActionsFromUser(
  userList,
  userStatusLoginIndex
) {
  document
    .querySelectorAll(".shopping-cart__item")
    .forEach((obj_product, index_product) => {
      //từng vị trí của sản phẩm
      let array_shopping_product = obj_product.querySelectorAll(
        "[data-shopping-cart-item-action]"
      );
      array_shopping_product.forEach((obj_input) => {
        if (
          obj_input.getAttribute("data-shopping-cart-item-action") ==
          "increment"
        ) {
          // nếu nhấn +
          obj_input.onclick = () => {
            obj_product.querySelector(".remove-arrow").value =
              parseInt(obj_product.querySelector(".remove-arrow").value) + 1;
            userList[userStatusLoginIndex].shoppingCart[
              index_product
            ].quantity = obj_product.querySelector(".remove-arrow").value;
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart();
          };
        }
        if (
          obj_input.getAttribute("data-shopping-cart-item-action") ==
          "decrement"
        ) {
          // nếu nhấn -
          obj_input.onclick = () => {
            obj_product.querySelector(".remove-arrow").value =
              parseInt(obj_product.querySelector(".remove-arrow").value) - 1;
            userList[userStatusLoginIndex].shoppingCart[
              index_product
            ].quantity = obj_product.querySelector(".remove-arrow").value;
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart();
          };
        }
        if (
          obj_input.getAttribute("data-shopping-cart-item-action") == "trash"
        ) {
          //nếu loại bỏ
          obj_input.onclick = () => {
            userList[userStatusLoginIndex].shoppingCart.splice(
              index_product,
              1
            );
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart();
          };
        }
        if (
          obj_input.getAttribute("data-shopping-cart-item-action") == "input"
        ) {
          //nếu điền trực tiếp số lượng input
          obj_input.onchange = () => {
            userList[userStatusLoginIndex].shoppingCart[
              index_product
            ].quantity = obj_product.querySelector(".remove-arrow").value;
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart();
          };
        }
      });
    });
}

function updateShoppingCart() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let userStatusLoginIndex;
  userList.forEach((obj, index) => {
    if (obj.statusLogin) {
      userStatusLoginIndex = index;
    }
  });

  // Các sản phẩm đã được thêm vào Giỏ hàng tạo bởi HTML
  function createShoppingCartItems() {
    let items = "";
    if (userList[userStatusLoginIndex].shoppingCart.length >= 1) {
      // Shopping-Cart Item
      for (
        let i = 0;
        i < userList[userStatusLoginIndex].shoppingCart.length;
        i++
      ) {
        const shoppingCartFromUser =
          userList[userStatusLoginIndex].shoppingCart[i];
        items += `
          <div
            class="shopping-cart__item"
            data-shopping-cart-item="${i + 1}"
          >
            <figure>
              <img
                src="${shoppingCartFromUser.src}"
                alt=""
                class="shopping-cart__image"
              />
            </figure>
            <div class="shopping-cart__column">
              <h3 class="shopping-cart__name">
                ${shoppingCartFromUser.name}
              </h3>
              <p class="shopping-cart__details">
              ${shoppingCartFromUser.id} / ${shoppingCartFromUser.category} / ${
          shoppingCartFromUser.price
        }
              </p>
            </div>
            <div class="shopping-cart__quantity">
              <a
                href="#!"
                class="shopping-cart__operator"
                data-shopping-cart-item-action="increment"
                >+</a
              ><input
                type="number"
                class="shopping-cart__number remove-arrow"
                value="${shoppingCartFromUser.quantity}"
                data-shopping-cart-item-action="input"
              /><a
                href="#!"
                class="shopping-cart__operator"
                data-shopping-cart-item-action="decrement"
                >-</a
              >
            </div>
            <p class="shopping-cart__product-total-price">
              ${formatVietNamMoney(
                shoppingCartFromUser.price * shoppingCartFromUser.quantity
              )}<u>đ</u>
            </p>
            <button
              class="shopping-cart__trash"
              data-shopping-cart-item-action="trash"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
      }
    } else {
      // Shopping-Cart Inform
      items = `<p class="shopping-cart__inform">KHÔNG CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG</p>`;
    }
    return items;
  }

  //
  const shoppingCartForm = `
    <div class="body__shopping-cart">
      <div class="shopping-cart__content">
        <h2 class="shopping-cart__title">GIỎ HÀNG</h2>
        <div class="shopping-cart__body">
          <div class="shopping-cart__list">
            ${createShoppingCartItems()}
          </div>
        </div>
        <div class="shopping-cart__payment">
          <p class="shopping-cart__payment-info">
            Tổng số tiền: <b class="shopping-cart__total-price">${formatVietNamMoney(
              calTotalProductItemPriceInShoppingCart(
                userList,
                userStatusLoginIndex
              )
            )}<u>đ</u></b>
          </p>
          <button class="shopping-cart__payment-button">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  `;

  //
  const mainContentDiv = document.getElementById("main-content");
  mainContentDiv.innerHTML = shoppingCartForm;

  // Cập nhật lại thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
  updateShoppingCartAfterActionsFromUser(userList, userStatusLoginIndex);

  // Tạo mẫu thông tin để thanh toán khi người dùng nhấn vào "Thanh toán"
  getPaymentInformationInfo();
}

// Hàm hiển thị thông tin của Giỏ hàng
export function getShoppingCartInfo() {
  // Đưa về đầu trang
  window.scroll(0, 0);

  // Tạo thông tin của Giỏ hàng bằng các thẻ html
  updateShoppingCart();
}
