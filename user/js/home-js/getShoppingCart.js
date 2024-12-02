import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { getPaymentInformationInfo } from "./getPayment.js";

// Hàm trở về trang Giỏ hàng khi người dùng ấn vào "Giỏ hàng" ở trang Thông tin hoá đơn
export function comebackShoppingCart(userList, indexCurrentUserLogin) {
  updateShoppingCart(userList, indexCurrentUserLogin);
}

// Hàm cập nhật thông tin của Giỏ hàng sau khi người dùng thực hiển một vài chỉnh sửa
function updateShoppingCartAfterActionsFromUser(
  userList,
  indexCurrentUserLogin
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
          action.onclick = (e) => {
            e.preventDefault();
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 1) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity + 1;
              userList[indexCurrentUserLogin].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, indexCurrentUserLogin);
            }
          };
        }
        // Nếu nhấn -
        if (
          action.getAttribute("data-shopping-cart-item-action") == "decrement"
        ) {
          action.onclick = (e) => {
            e.preventDefault();
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 2) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity - 1;
              userList[indexCurrentUserLogin].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, indexCurrentUserLogin);
            }
          };
        }
        // Nếu loại bỏ
        if (action.getAttribute("data-shopping-cart-item-action") == "trash") {
          action.onclick = (e) => {
            e.preventDefault();
            userList[indexCurrentUserLogin].shoppingCart.splice(index, 1);
            localStorage.setItem("userList", JSON.stringify(userList));
            updateShoppingCart(userList, indexCurrentUserLogin);
          };
        }
        // Nếu điền trực tiếp số lượng input
        if (action.getAttribute("data-shopping-cart-item-action") == "input") {
          action.onchange = (e) => {
            e.preventDefault();
            let currentQuantity = parseInt(
              product.querySelector(".shopping-cart__number").value
            );
            if (currentQuantity >= 1) {
              product.querySelector(".shopping-cart__number").value =
                currentQuantity;
              userList[indexCurrentUserLogin].shoppingCart[index].quantity =
                product.querySelector(".shopping-cart__number").value;
              localStorage.setItem("userList", JSON.stringify(userList));
              updateShoppingCart(userList, indexCurrentUserLogin);
            }
          };
        }
      });
    });
}

// Hàm xoá tất cả sản phẩm hiện có trong Giỏ hàng
function removeAllProductInShoppingCart(userList, indexCurrentUserLogin) {
  document
    .querySelector(".shopping-cart__trash-all-button")
    .addEventListener("click", function () {
      userList[indexCurrentUserLogin].shoppingCart = [];
      localStorage.setItem("userList", JSON.stringify(userList));
      updateShoppingCart(userList, indexCurrentUserLogin);
    });
}

// Hàm xem chi tiết một đơn hàng trong Lịch sử mua hàng
function showOrderItemInfo(userList, indexCurrentUserLoginrsHistory) {
  // Lấy ra Lịch sử mua hàng của người dùng hiện tại
  let orderList = JSON.parse(localStorage.getItem("orderList"));
  let ordersHistory = [];
  orderList.forEach((order) => {
    if (order.customerId == userList[indexCurrentUserLoginrsHistory].id) {
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

          // Hiển thị chi tiết đơn hàng
          function createProductItemInOrderHistoryItem() {
            const orderProduct = ordersHistory[ordersHistory.length - 1 - index].orderProduct; //ordersHistory.length - 1 - index là vị trí thực tế của sản phẩm trong ls với mảng ordersHistory
            let items = "";
            for (let i = 0; i < orderProduct.length; i++) {
              if (i === orderProduct.length - 1) {
                items += `${orderProduct[i].id} - ${orderProduct[i].name} - ${
                  orderProduct[i].quantity
                } - ${formatVietNamMoney(orderProduct[i].price)}đ`;
              } else {
                items += `${orderProduct[i].id} - ${orderProduct[i].name} - ${
                  orderProduct[i].quantity
                } - ${formatVietNamMoney(orderProduct[i].price)}đ, `;
              }
            }
            return items;
          }
           //obj để hiển thị tiếng việt tình trạng đơn hàng
          let dataOrderStatus = {
            pending: "Đang chờ xử lý",
            shipped: "Đã giao",
            accepted: "Đã xác nhận",
            canceled: "Đã hủy"
          };
          let method = ordersHistory[ordersHistory.length - 1 - index].orderMethod;
          if(typeof(ordersHistory[ordersHistory.length - 1 - index].orderMethod) === "object"){
            method = ordersHistory[ordersHistory.length - 1 - index].orderMethod.name + "_Loại: " + ordersHistory[ordersHistory.length - 1 - index].orderMethod.type + "_Mã thẻ: " + ordersHistory[ordersHistory.length - 1 - index].orderMethod.code;
          }
          const orderHistoryInfoForm = `
          <div class="order-history-info__overlay"></div>
          <div class="order-history-info__content">
            <button class="order-history-info__exit-button">x</button>
            <h2 class="order-history-info__title">CHI TIẾT ĐƠN HÀNG</h2>
            <p class="order-history-info__order-id detail"><b>Mã đơn hàng:</b> ${
              ordersHistory[ordersHistory.length - 1 - index].orderId
            }</p>
            <p class="order-history-info__customer-id detail"><b>Mã khách hàng:</b> ${
              ordersHistory[ordersHistory.length - 1 - index].customerId
            }</p>
            <p class="order-history-info__order-date detail"><b>Thời gian đặt hàng:</b> ${
              ordersHistory[ordersHistory.length - 1 - index].orderDate
            }</p>
            <p class="order-history-info__order-status detail"><b>Tình trạng:</b> ${
              dataOrderStatus[ordersHistory[ordersHistory.length - 1 - index].orderStatus]
            }</p>
            <p class="order-history-info__order-address-to-ship detail"><b>Địa chỉ giao hàng:</b> ${
              ordersHistory[ordersHistory.length - 1 - index].orderAddressToShip
            }</p>
            <p class="order-history-info__order-ship-method detail"><b>Phương thức vận chuyển:</b> Giao hàng tận nơi</p>
            <p class="order-history-info__order-pay-method detail"><b>Phương thức thanh toán:</b> ${
              method
            }</p>
            <p class="order-history-info__order-product detail"><b>Danh sách sản phẩm đã đặt:</b> ${createProductItemInOrderHistoryItem()}</p>
            <p class="order-history-info__order-total-price detail"><b>Tổng số tiền thanh toán:</b> ${formatVietNamMoney(
              ordersHistory[ordersHistory.length - 1 - index].orderTotalPrice
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
      if (ordersHistory[ordersHistory.length - 1 - index].orderStatus != "pending") { //ordersHistory.length - 1 - index là vị trí thực tế của sản phẩm trong ls với mảng ordersHistory
        obj.style.backgroundColor = "#ccc";
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
              const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
              let productList = JSON.parse(localStorage.getItem("productList"));

              //hoàn số lượng của sản phẩm của shop (admin) - hiệu
              ordersHistory[ordersHistory.length - 1 - index].orderProduct.forEach((objOrderProduct) => {
                //objOrderProduct là từng sản phẩm của đơn hàng đang làm việc
                let index = productList.findIndex((objProductShop) => {
                  //objProdcutShop là từng sản phẩm của shop
                  return objProductShop.id === objOrderProduct.id;
                });
                productList[index].quantity += objOrderProduct.quantity;
                productList[index].discountQuantity += objOrderProduct.discountQuantity;
                localStorage.setItem("productList", JSON.stringify(productList));
              });
              
              // Tìm đơn hàng có ID cần xoá trên local
              let removeIndex = orderList.findIndex((order) => {
                return order.orderId === ordersHistory[ordersHistory.length - 1 - index].orderId;
              });
              // Array method findIndex: return first_index, otherwise -1
              // Xoá và cập nhật lại đơn hàng lên local
              if (removeIndex !== -1) {
                orderList[removeIndex].isDelete = true;
                orderList[removeIndex].orderStatus = "canceled";
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
            document.querySelector(".form-question .exit-form-detail-ordered-product").onclick = () => {
              document.querySelector(".container-question").remove();
            };
          }
          handleDelete();
        };
      }
    });
}

function updateShoppingCart(userList, indexCurrentUserLogin) {
  let totalPriceBottomLeftBody = 0;
  // Các sản phẩm đã được thêm vào Giỏ hàng tạo bởi HTML
  function createShoppingCartItems() {
    let productList = JSON.parse(localStorage.getItem("productList"));
    let items = "";
    if (userList[indexCurrentUserLogin].shoppingCart.length >= 1) {
      // Shopping-Cart Item

      //chứa các sản phẩm của shop, để lấy discountPercent, giảm giá....
      let productShoppingCartList = [];
      for (let i = 0; i < userList[indexCurrentUserLogin].shoppingCart.length; i++) {
        const shoppingCartFromUser = userList[indexCurrentUserLogin].shoppingCart[i];
        productShoppingCartList.push(productList.find((obj) => {
          return obj.id === shoppingCartFromUser.id; 
        }))
      }
      for (
        let i = 0;
        i < userList[indexCurrentUserLogin].shoppingCart.length;
        i++
      ) {
        const shoppingCartFromUser = userList[indexCurrentUserLogin].shoppingCart[i];
        let price=0;
        for(let k=0; k<shoppingCartFromUser.quantity; k++){
          productShoppingCartList[i].discountQuantity -= 1;
          if(productShoppingCartList[i].discountQuantity>=0){
            price += productShoppingCartList[i].price * (100 - productShoppingCartList[i].discountPercent) / 100;
          }
          else{
            price += productShoppingCartList[i].price;
          }
        }

        totalPriceBottomLeftBody += price; //dòng 452, hiện tổng tiền
        let newPrice = productShoppingCartList[i].price;
        if(productShoppingCartList[i].discountQuantity>=0){
          newPrice = productShoppingCartList[i].price * (100 - productShoppingCartList[i].discountPercent) / 100;
        }

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
            <div class="shopping-cart__info">
              <div class="shopping-cart__column">
                <h3 class="shopping-cart__name">
                  ${shoppingCartFromUser.name}
                </h3>
                <p class="shopping-cart__details">
                ${shoppingCartFromUser.id} / ${
            shoppingCartFromUser.category
          } / ${newPrice}đ
                </p>
              </div>
              <div class="shopping-cart__detail">
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
                    price
                  )}<u>đ</u>
                </p>
                <button
                  class="shopping-cart__trash"
                  data-shopping-cart-item-action="trash"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }
    } else {
      // Shopping-Cart Inform
      items = `<p class="shopping-cart__inform">KHÔNG CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG</p>`;
    }
    return items;
  }

  // Danh sách sản phẩm đã đặt hàng nằm ở dưới chữ thanh toán
  function createOrderHistoryItems() {
    //obj để hiển thị tiếng việt tình trạng đơn hàng
    let dataOrderStatus = {
      pending: "Đang chờ xử lý",
      shipped: "Đã giao",
      accepted: "Đã xác nhận",
      canceled: "Đã hủy"
    };
    // Lấy lịch sử đơn hàng của user từ danh sách đơn hàng
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const ordersHistory = [];
    orderList.forEach((order) => {
      if (order.customerId === userList[indexCurrentUserLogin].id) {
        ordersHistory.push(order);
      }
    });

    let items = "";
    if (ordersHistory.length >= 1) {
      for (let i = ordersHistory.length - 1; i >= 0; i--) {
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
                dataOrderStatus[ordersHistory[i].orderStatus]
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
      // document.querySelectorAll(".order-history__item .order-history__trash-button").forEach((obj) => {
      //   if(obj.orderStatus != "pending"){
      //     obj.style.backgroundColor = "#ccc";
      //   }
      // })
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
                totalPriceBottomLeftBody
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
  updateShoppingCartAfterActionsFromUser(userList, indexCurrentUserLogin);

  // Xoá tất cả sản phẩm trong Giỏ hàng khi người dùng nhấn "Xoá tất cả"
  removeAllProductInShoppingCart(userList, indexCurrentUserLogin);

  // Tạo mẫu thông tin để thanh toán khi người dùng nhấn vào "Thanh toán"
  getPaymentInformationInfo(userList, indexCurrentUserLogin);

  // Gán sự kiện cho nút xem chi tiết sản phẩm đã đặt hàng
  if (
    document.querySelectorAll(".order-history__show-info-button").length > 0
  ) {
    showOrderItemInfo(userList, indexCurrentUserLogin);
  }
}

// Hàm hiển thị thông tin của Giỏ hàng
export function getShoppingCartInfo() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"))

  // Đưa về đầu trang
  window.scroll(0, 0);

  // Tạo thông tin của Giỏ hàng bằng các thẻ html
  updateShoppingCart(userList, indexCurrentUserLogin);
}
