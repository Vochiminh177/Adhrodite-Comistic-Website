import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { generateFilter } from "../products-js/generateFilter.js";
import { getPaymentInformationInfo } from "./getPayment.js";
import { updateStyleTags } from "./shoppingCartIconInMenuHeaderAction.js";

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
              ${shoppingCartFromUser.id} / ${
          shoppingCartFromUser.category
        } / ${formatVietNamMoney(shoppingCartFromUser.price)}đ
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

  // Danh sách sản phẩm đã đặt hàng nằm ở dưới giỏ hàng
  function orderedProduct() {
    if (userList[userStatusLoginIndex].ordersHistory.length == 0) {
      let eleP = document.createElement("p");
      eleP.textContent = "BẠN CHƯA ĐẶT SẢN PHẨM NÀO! ĐẶT NHANH ĐI!";
      return eleP.outerHTML;
    }

    let eleOrder = document.createElement("div");
    for (
      let i = 0;
      i < userList[userStatusLoginIndex].ordersHistory.length;
      i++
    ) {
      eleOrder.innerHTML += `
          <div id="order-item">
            <p id="order-date-history">Ngày đặt hàng: ${userList[userStatusLoginIndex].ordersHistory[i].orderDate}</p>
            <p id="order-status-history">Tình trạng đơn hàng: ${userList[userStatusLoginIndex].ordersHistory[i].orderStatus}</p>
            <p id="totalPrice-history">Tổng giá trị đơn hàng: ${userList[userStatusLoginIndex].ordersHistory[i].orderTotalPrice}</p>
            <a href="" id="detail-ordered">Chi tiết</a>
            <a href="" id="delete-ordered">Hủy đơn hàng</a>
          </div>
        `;
    }
    return eleOrder.innerHTML;
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
          <div class="order-cart__list">
            <p id="ordered">ĐƠN HÀNG ĐÃ ĐẶT</p>
            ${orderedProduct()}
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

  //gán sự kiện cho nút xem chi tiết sản phẩm đã đặt hàng
  if (document.querySelectorAll("#order-item a").length > 0) {
    detailOrderProduct(userList, userStatusLoginIndex);
  }
}

// Hàm hiển thị thông tin của Giỏ hàng
export function getShoppingCartInfo() {
  // Đưa về đầu trang
  window.scroll(0, 0);

  // Tạo thông tin của Giỏ hàng bằng các thẻ html
  updateShoppingCart();
}

function detailOrderProduct(userList, userStatusLoginIndex) {
  document
    .querySelectorAll("#order-item #detail-ordered")
    .forEach((obj, indexOrdersHistory) => {
      obj.onclick = (e) => {
        e.preventDefault();
        function showDetailOrder() {
          function showListDetailProduct() {
            let ele = document.createElement("div");
            ele.className = "list-order-product";
            for (
              let i = 0;
              i <
              userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory]
                .orderProduct.length;
              i++
            ) {
              ele.innerHTML += `
              <div class="order-product-item">
                <div class="content-product-ordered">
                  <p id="name-product-ordered">Tên: ${userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory].orderProduct[i].name}</p>
                  <p id="category-product-ordered">Danh mục: ${userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory].orderProduct[i].category}</p>
                  <p id="price-product-ordered">Giá: ${userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory].orderProduct[i].price}</p>
                  <p id="quantity-product-ordered">Số lượng: ${userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory].orderProduct[i].quantity}</p>

                </div>
                <img style="width: 100px;  height:100px;" src=${userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory].orderProduct[i].src}>
              </div>
            `;
            }
            return ele.outerHTML;
          }

          let container = document.createElement("div");
          container.className = "container-detail-order";
          container.innerHTML = `
          <div class="form-detail-order">
            <button class="exit-form-detail-ordered-product">&times;</button>
            <h2>CHI TIẾT ĐƠN HÀNG</h2>
            <h2>TÌNH TRẠNG: ${
              userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory]
                .orderStatus
            }</h2>
            ${showListDetailProduct()}
          </div>
        `;
          document.body.appendChild(container);
          document.querySelector(".exit-form-detail-ordered-product").onclick =
            () => {
              document.querySelector(".container-detail-order").remove();
            };
        }
        showDetailOrder();
      };
    });

  document
    .querySelectorAll("#order-item #delete-ordered")
    .forEach((obj, indexOrdersHistory) => {
      if (
        userList[userStatusLoginIndex].ordersHistory[indexOrdersHistory]
          .orderStatus != "Pending"
      ) {
        obj.style.backgroundColor = "greenyellow";
        obj.onclick = (e) => {
          e.preventDefault();
        };
      } else {
        obj.onclick = (e) => {
          e.preventDefault();
          function handleDelete() {
            function questionDelete() {
              let ele = document.createElement("div");
              ele.className = "container-question";
              ele.innerHTML = `
              <div class="form-question">
                <button class="exit-form-detail-ordered-product">&times;</button>
                <p>Bạn có chắc muốn hủy ?</p>
                <a href="" class="yes">Có</a>
                <a href="" class="no">Không</a>
              </div>
            `;
              document.body.appendChild(ele);
              document.querySelector(".form-question .yes").onclick = (e) => {
                e.preventDefault();
                userList[userStatusLoginIndex].ordersHistory.splice(
                  indexOrdersHistory,
                  1
                );
                localStorage.setItem("userList", JSON.stringify(userList));
                ele.remove();
                create_notification_user("Hủy đơn hàng thành công");
                // updateStyleTags();
                // Hiển thị thông tin sản phẩm của Giỏ hàng
                getShoppingCartInfo();
              };
              document.querySelector(".form-question .no").onclick = (e) => {
                e.preventDefault();
                ele.remove();
              };
            }
            questionDelete();
          }
          handleDelete();
        };
      }
    });
}
