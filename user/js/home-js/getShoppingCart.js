import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { getPaymentInformationInfo } from "./getPayment.js";

// Hàm trở về trang Giỏ hàng khi người dùng ấn vào "Giỏ hàng" ở trang Thông tin hoá đơn
export function comebackShoppingCart(userList, userStatusLoginIndex) {
  updateShoppingCart(userList, userStatusLoginIndex);
}

// Hàm cập nhật thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
function updateShoppingCartAfterActionsFromUser(
  userList,
  userStatusLoginIndex
) {
  document
    .querySelectorAll(".shopping-cart__item")
    .forEach((product, index) => {
      //từng vị trí của sản phẩm
      let productsInShoppingCart = product.querySelectorAll(
        "[data-shopping-cart-item-action]"
      );
      productsInShoppingCart.forEach((action) => {
        // Nếu nhấn +
        if (
          action.getAttribute("data-shopping-cart-item-action") == "increment"
        ) {
          action.onclick = () => {
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 1) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity + 1;
              userList[userStatusLoginIndex].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, userStatusLoginIndex);
            }
          };
        }
        // Nếu nhấn -
        if (
          action.getAttribute("data-shopping-cart-item-action") == "decrement"
        ) {
          action.onclick = () => {
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 2) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity - 1;
              userList[userStatusLoginIndex].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, userStatusLoginIndex);
            }
          };
        }
        // Nếu loại bỏ
        if (action.getAttribute("data-shopping-cart-item-action") == "trash") {
          action.onclick = () => {
            userList[userStatusLoginIndex].shoppingCart.splice(index, 1);
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart(userList, userStatusLoginIndex);
          };
        }
        // Nếu điền trực tiếp số lượng input
        if (action.getAttribute("data-shopping-cart-item-action") == "input") {
          action.onchange = () => {
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 1) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity + 1;
              userList[userStatusLoginIndex].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, userStatusLoginIndex);
            }
          };
        }
      });
    });
}

// Hàm xoá tất cả sản phẩm hiện có trong Giỏ hàng
function removeAllProductInShoppingCart(userList, userStatusLoginIndex) {
  document
    .querySelector(".shopping-cart__trash-all-button")
    .addEventListener("click", function () {
      userList[userStatusLoginIndex].shoppingCart = [];
      localStorage.setItem("userList", JSON.stringify(userList));
      updateShoppingCart(userList, userStatusLoginIndex);
    });
}

// Hàm xem chi tiết một đơn hàng trong Lịch sử mua hàng
function showOrderItemInfo(userList, userStatusLoginIndexrsHistory) {
  // Lấy ra Lịch sử mua hàng của người dùng hiện tại
  let orderList = JSON.parse(localStorage.getItem("orderList"));
  let ordersHistory = [];
  orderList.forEach((order) => {
    if (order.customerId == userList[userStatusLoginIndexrsHistory].id) {
      ordersHistory.push(order);
    }
  });

  // Nếu nhấn vào nút "Chi tiết" của một đơn hàng trong Lịch sử mua hàng
  document
    .querySelectorAll(".order-history__show-info-button")
    .forEach((obj, index) => {
      obj.onclick = (event) => {
        event.preventDefault();
        function showOrderDetail() {
          //   function createProductItemInOrderHistoryItem() {
          //     let ele = document.createElement("div");
          //     ele.className = "list-order-product";
          //     for (let i = 0; i < ordersHistory[index].orderProduct.length; i++) {
          //       ele.innerHTML += `
          //       <div class="order-product-item">
          //         <div class="content-product-ordered">
          //           <p id="name-product-ordered">Tên: ${ordersHistory[index].orderProduct[i].name}</p>
          //           <p id="category-product-ordered">Danh mục: ${ordersHistory[index].orderProduct[i].category}</p>
          //           <p id="price-product-ordered">Giá: ${ordersHistory[index].orderProduct[i].price}</p>
          //           <p id="quantity-product-ordered">Số lượng: ${ordersHistory[index].orderProduct[i].quantity}</p>

          //         </div>
          //         <img style="width: 100px;  height:100px;" src=${ordersHistory[index].orderProduct[i].src}>
          //       </div>
          //     `;
          //     }
          //     return ele.outerHTML;
          //   }
          //   let container = document.createElement("div");
          //   container.className = "container-detail-order";
          //   container.innerHTML = `
          //   <div class="form-detail-order">
          //     <h2>CHI TIẾT ĐƠN HÀNG</h2>
          //     <p>Tình trạng: ${ordersHistory[index].orderStatus}</p>
          //     <p>Ngày đặt: ${ordersHistory[index].orderDate}</p>
          //     <p>Mã đơn hàng: ${ordersHistory[index].orderId}</p>
          //     <p>Địa chỉ: ${ordersHistory[index].orderAddressToShip}</p>
          //     <p>Phương thức thanh toán: ${ordersHistory[index].orderMethod}</p>
          //     <p>Danh sách sản phẩm đã mua:</p>
          //     ${createProductItemInOrderHistoryItem()}
          //   </div>
          // `;

          // Hiển thị chi tiết đơn hàng
          function createProductItemInOrderHistoryItem() {
            const orderProduct = ordersHistory[index].orderProduct;
            let items = "";
            for (let i = 0; i < orderProduct.length; i++) {
              if (i === orderProduct.length - 1) {
                items += `${orderProduct[i].id} - ${orderProduct[i].name} - ${orderProduct[i].quantity} - ${orderProduct[i].price}`;
              } else {
                items += `${orderProduct[i].id} - ${orderProduct[i].name} - ${orderProduct[i].quantity} - ${orderProduct[i].price}, `;
              }
            }
            return items;
          }
          const orderHistoryInfoForm = `
          <div class="order-history-info__overlay"></div>
          <div class="order-history-info__content">
            <button class="order-history-info__exit-button">x</button>
            <h2 class="order-history-info__title">CHI TIẾT ĐƠN HÀNG</h2>
            <p class="order-history-info__order-id detail"><b>Mã đơn hàng:</b> ${
              ordersHistory[index].orderId
            }</p>
            <p class="order-history-info__customer-id detail"><b>Mã khách hàng:</b> ${
              ordersHistory[index].customerId
            }</p>
            <p class="order-history-info__order-date detail"><b>Thời gian đặt hàng:</b> ${
              ordersHistory[index].orderDate
            }</p>
            <p class="order-history-info__order-status detail"><b>Tình trạng:</b> ${
              ordersHistory[index].orderStatus
            }</p>
            <p class="order-history-info__order-address-to-ship detail"><b>Địa chỉ giao hàng:</b> ${
              ordersHistory[index].orderAddressToShip
            }</p>
            <p class="order-history-info__order-ship-method detail"><b>Phương thức vận chuyển:</b> Giao hàng tận nơi</p>
            <p class="order-history-info__order-pay-method detail"><b>Phương thức thanh toán:</b> ${
              ordersHistory[index].orderMethod
            }</p>
            <p class="order-history-info__order-product detail"><b>Danh sách sản phẩm đã đặt:</b> ${createProductItemInOrderHistoryItem()}</p>
            <p class="order-history-info__order-total-price detail"><b>Tổng số tiền thanh toán:</b> ${formatVietNamMoney(
              ordersHistory[index].orderTotalPrice
            )}đ</p>
          </div>
        `;
          let orderHistoryInfoContainer = document.createElement("div");
          orderHistoryInfoContainer.className = "order-history-info__container";
          orderHistoryInfoContainer.innerHTML = orderHistoryInfoForm;
          document.body.appendChild(orderHistoryInfoContainer);

          // Nếu nhấn vào nút 'X'
          document
            .querySelector(".order-history-info__exit-button")
            .addEventListener("click", function () {
              orderHistoryInfoContainer.remove();
            });

          // Nếu nhấn vào bên ngoài khối hiển thị "Chi tiết đơn hàng"
          document
            .querySelector(".order-history-info__overlay")
            .addEventListener("click", function () {
              orderHistoryInfoContainer.remove();
            });
        }
        showOrderDetail();
      };
    });

  // Quy chưa sửa lại chỗ này (chủ yếu là class và css ấy)
  // Nếu nhấn vào nút "Huỷ đơn hàng" của một đơn hàng trong Lịch sử mua hàng
  document
    .querySelectorAll(".order-history__trash-button")
    .forEach((obj, index) => {
      if (ordersHistory[index].orderStatus != "Pending") {
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
            }
            questionDelete();
            document.querySelector(".form-question .yes").onclick = (e) => {
              e.preventDefault();

              // code mới của Huy
              const orderList =
                JSON.parse(localStorage.getItem("orderList")) || [];
              let productList = JSON.parse(localStorage.getItem("productList"));

              //hoàn số lượng của sản phẩm của shop (admin)
              orderList.forEach((obj) => {
                //obj là từng đơn hàng
                obj.orderProduct.forEach((objOrderProduct) => {
                  //objOrderProduct là từng sản phẩm của obj
                  let index = productList.findIndex((objProductShop) => {
                    //objProdcutShop là từng sản phẩm của shop
                    return objProductShop.id === objOrderProduct.id;
                  });
                  productList[index].quantity += objOrderProduct.quantity;
                  localStorage.setItem(
                    "productList",
                    JSON.stringify(productList)
                  );
                });
              });

              // Tìm đơn hàng có ID cần xoá trên local
              let removeIndex = orderList.findIndex((order) => {
                return order.orderId === ordersHistory[index].orderId;
              });
              // Array method findIndex: return first_index, otherwise -1
              // Xoá và cập nhật lại đơn hàng lên local
              if (removeIndex !== -1) {
                orderList.splice(removeIndex, 1);
                localStorage.setItem("orderList", JSON.stringify(orderList));
              }

              document.querySelector(".container-question").remove();
              create_notification_user("Hủy đơn hàng thành công");
              // updateStyleTags();
              // Hiển thị thông tin sản phẩm của Giỏ hàng
              getShoppingCartInfo();
            };
            document.querySelector(".form-question .no").onclick = (e) => {
              e.preventDefault();
              document.querySelector(".container-question").remove();
            };
            document.querySelector(
              ".form-question .exit-form-detail-ordered-product"
            ).onclick = () => {
              document.querySelector(".container-question").remove();
            };
          }
          handleDelete();
        };
      }
    });
}

function updateShoppingCart(userList, userStatusLoginIndex) {
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
  function createOrderHistoryItems() {
    // Lấy lịch sử đơn hàng của user từ danh sách đơn hàng
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const ordersHistory = [];
    orderList.forEach((order) => {
      if (order.customerId === userList[userStatusLoginIndex].id) {
        ordersHistory.push(order);
      }
    });

    let items = "";
    if (ordersHistory.length >= 1) {
      for (let i = 0; i < ordersHistory.length; i++) {
        items += `
            <div class="order-history__item">
              <div class="order-history__column">
                <p class="order-history__id detail"><b>Mã đơn hàng:</b> ${
                  ordersHistory[i].orderId
                }</p>
                <p class="order-history__date detail"><b>Thời gian:</b> ${
                  ordersHistory[i].orderDate
                }</p>
              </div>
              <p class="order-history__status detail">${
                ordersHistory[i].orderStatus
              }</p>
              <p class="order-history__total-price detail">${formatVietNamMoney(
                ordersHistory[i].orderTotalPrice
              )}<u>đ</u></p>
              <div class="order-history__buttons">
                <button class="order-history__show-info-button">Chi tiết</button>
                <button class="order-history__trash-button">Huỷ đơn hàng</button>
              </div>
            </div>
          `;
      }
    } else {
      items = `<p class="order-history__inform">KHÔNG CÓ ĐƠN HÀNG NÀO ĐÃ ĐẶT</p>`;
    }
    return items;
  }

  // Thay đổi nội dung ở Body
  const shoppingCartForm = `
    <div class="body__shopping-cart">
      <div class="shopping-cart__content">
        <div class="shopping-cart__content-item">
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
            <div class="shopping-cart__buttons">
              <button class="shopping-cart__trash-all-button button-block">
                Xoá tất cả
              </button>
              <button class="shopping-cart__pay-button button-block">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <div class="shopping-cart__content-item">
          <h2 class="order-history__title">LỊCH SỬ MUA HÀNG</h2>
          <div class="order-history__body">
            <div class="order-history__list">
              ${createOrderHistoryItems()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  const mainContentDiv = document.getElementById("main-content");
  mainContentDiv.innerHTML = shoppingCartForm;

  // Cập nhật lại thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
  updateShoppingCartAfterActionsFromUser(userList, userStatusLoginIndex);

  // Xoá tất cả sản phẩm trong Giỏ hàng khi người dùng nhấn "Xoá tất cả"
  removeAllProductInShoppingCart(userList, userStatusLoginIndex);

  // Tạo mẫu thông tin để thanh toán khi người dùng nhấn vào "Thanh toán"
  getPaymentInformationInfo(userList, userStatusLoginIndex);

  // Gán sự kiện cho nút xem chi tiết sản phẩm đã đặt hàng
  if (
    document.querySelectorAll(".order-history__show-info-button").length > 0
  ) {
    showOrderItemInfo(userList, userStatusLoginIndex);
  }
}

// Hàm hiển thị thông tin của Giỏ hàng
export function getShoppingCartInfo() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let userStatusLoginIndex;
  userList.forEach((obj, index) => {
    if (obj.statusLogin) {
      userStatusLoginIndex = index;
    }
  });

  // Đưa về đầu trang
  window.scroll(0, 0);

  // Tạo thông tin của Giỏ hàng bằng các thẻ html
  updateShoppingCart(userList, userStatusLoginIndex);
}
