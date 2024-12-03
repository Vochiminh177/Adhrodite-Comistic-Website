import { productItemArray } from "../../../database/database.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { calTotalProductItemPriceInShoppingCart } from "../common-js/common.js";
import {
  updateHeaderAndFooter,
  updateNavbarStyle,
  formatVietNamMoney,
  calTotalProductItemPrice,
} from "../common-js/common.js";
import { updateMainContent } from "./changeMainContent.js";

// hàm kiểm tra sản phẩm nào không đặt được, tô đỏ sản phẩm đó
function error_orderProduct(id_product) {
  let array_products__item = document.querySelectorAll(
    ".payment-information-products__item"
  );
  array_products__item.forEach((obj) => {
    let array_details = obj.querySelector(
      ".payment-information-products__details"
    ).textContent;
    let array_string = array_details.split("/");
    let id = array_string[0].trim();

    if (id === id_product) {
      if (!obj.querySelector(".payment-information-products__column hr")) {
        obj.querySelector("h3").style.color = "red";
        obj.querySelector("p").style.color = "red";
        let ele = document.createElement("hr");
        ele.style.border = "2px solid red";
        obj
          .querySelector(".payment-information-products__column")
          .appendChild(ele);
      }
    }
  });
}

//hàm kiểm tra thông tin thanh toán
function handle_order_information(userList, indexCurrentUserLogin) {
  if (
    !userList[indexCurrentUserLogin].first_name ||
    !userList[indexCurrentUserLogin].last_name
  ) {
    create_notification_user("Bạn cần bổ sung tên!");
    return false;
  }
  if (!userList[indexCurrentUserLogin].phone) {
    create_notification_user("Bạn cần bổ sung số điện thoại");
    return false;
  }
  if (!userList[indexCurrentUserLogin].address) {
    create_notification_user("Bạn cần bổ sung địa chỉ");
    return false;
  }
  if (
    document.querySelector(".payment-information-info__address").placeholder ===
    ""
  ) {
    create_notification_user("Bạn cần bổ sung địa chỉ giao hàng");
    return false;
  }

  if (document.querySelector("#credit-card").checked) {
    if (document.querySelector("#card-id").value === "") {
      create_notification_user("Bạn cần nhập số thẻ");
      return false;
    }
  }

  return true;
}

// hàm kiểm tra có đặt hàng thành công hay không
function handle_order_product(
  userList,
  indexCurrentUserLogin,
  productList,
  array_orderProduct
) {
  let check_quantity = true;
  array_orderProduct.forEach((obj_orderProduct) => {
    let check = true;
    // kiểm tra số lượng sản phẩm so với hàng tồn của admin, tránh trường hợp admin hết hàng
    let index = productList.findIndex((obj_product_in_shop) => {
      return obj_orderProduct.id === obj_product_in_shop.id;
    });

    let soLuongConLai = productList[index].quantity - obj_orderProduct.quantity;

    //nếu hàng đặt nhiều hơn hàng tồn kho
    if (soLuongConLai < 0) {
      error_orderProduct(obj_orderProduct.id);
      create_notification_user("Vui lòng xem lại số lượng đơn hàng!");
      check = false;
    }
    //ngược lại, nếu đặt được, cập nhật số lượng sản phẩm ở phía admin
    else {
      productList[index].quantity = soLuongConLai;
    }

    if (!check) check_quantity = false;
  });

  if (!check_quantity) {
    return false;
  }

  //cập nhật lại discountQuantity của sản pảm của shop
  array_orderProduct.forEach((obj) => {
    let index = productList.findIndex((obj_product_in_shop) => {
      return obj.id === obj_product_in_shop.id;
    });

    if (obj.quantity >= obj.discountQuantity) {
      productList[index].discountQuantity = 0;
    } else {
      productList[index].discountQuantity -= obj.quantity;
    }
  });

  //nếu người dùng đặt hàng thành công
  create_notification_user("Đặt hàng thành công!");
  //cập nhật discountQuantity cho sản phẩm

  //tạo dữ liệu để push vào mảng đơn hàng chờ xử lí

  //tạo thời gian đặt hàng
  // getMonth bắt đầu từ [0, 11]
  let date_order = new Date();
  date_order =
    date_order.getHours().toString() +
    ":" +
    date_order.getMinutes().toString() +
    ":" +
    date_order.getSeconds().toString() +
    " " +
    date_order.getDate().toString() +
    "/" +
    (date_order.getMonth() + 1).toString() +
    "/" +
    date_order.getFullYear().toString();

  //phương thức thanh toán
  let purchase_method;
  let payment_information_info__form_group = document.querySelectorAll(
    ".payment-information-info__form-group"
  );
  payment_information_info__form_group.forEach((obj) => {
    if (obj.querySelector("input[type=radio]")) {
      if (obj.querySelector("input[type=radio]").checked) {
        purchase_method = obj.querySelector("label").textContent.trim();
        if (purchase_method === "Thanh toán qua thẻ") {
          let type;
          document
            .querySelectorAll(
              ".payment-information-info__cards .payment-information-info__card input"
            )
            .forEach((obj) => {
              if (obj.checked) {
                console.log(obj);
                type = obj.id;
              }
            });
          purchase_method = {
            name: "Thanh toán qua thẻ",
            type: type,
            code: document.querySelector("#card-id").value,
          };
        }
      }
    }
  });

  //address để ship
  let address = document.querySelector(
    ".payment-information-info__address"
  ).placeholder;

  const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
  const id_order = orderList.length + 1;

  let totalPrice = document.querySelector("#temp-price").textContent;
  totalPrice = totalPrice.replaceAll("đ","");
  totalPrice = totalPrice.replaceAll(".","");

  let data = {
    isDelete: false,
    customerId: userList[indexCurrentUserLogin].id,
    orderId: id_order,
    orderDate: date_order,
    orderAddressToShip: address,
    orderStatus: "pending",
    orderMethod: purchase_method,
    orderTotalPrice:
      (parseInt(totalPrice) + 18000),
    orderProduct: userList[indexCurrentUserLogin].shoppingCart,
  };

  orderList.push(data);
  userList[indexCurrentUserLogin].shoppingCart = [];
  localStorage.setItem("userList", JSON.stringify(userList));

  localStorage.setItem("orderList", JSON.stringify(orderList));
  localStorage.setItem("productList", JSON.stringify(productList));

  return true;
}

// Hàm trở lại Trang chủ
function comebackHomePage() {
  document
    .querySelector(".bill__comeback-button")
    .addEventListener("click", function () {
      // Hiển thị lại header và footer
      updateHeaderAndFooter("on");

      // Cập nhật lại style cho navbar header
      updateNavbarStyle();

      // Trở về Trang chủ
      updateMainContent("home");
    });
}

// Hàm cập nhật thông tin hoá đơn
function updateBill(userList, indexCurrentUserLogin, array_orderProduct) {
  function createBillItems() {
    let items = "";
    for (let i = 0; i < array_orderProduct.length; i++) {
      items += `
        <tr>
          <td>${array_orderProduct[i].id}</td>
          <td align="left">${array_orderProduct[i].name}</td>
          <td>${array_orderProduct[i].quantity}</td>
          <td>${array_orderProduct[i].price}đ</td>
        </tr>
      `;
    }
    return items;
  }
  let orderList = JSON.parse(localStorage.getItem("orderList"));
  //giá tổng
  let totalPrice = 0;
  array_orderProduct.forEach((obj) => {
    totalPrice += obj.totalPrice;
  });
  //lấy phương thức nếu mã thẻ
  let method = orderList[orderList.length-1].orderMethod;
  let checkMethod = false; //phục vụ cho dòng 328
  console.log(typeof(method))
  if(typeof(method) === "object"){
    checkMethod = true;
  }
  const billForm = `
    <div class="body__bill">
      <!-- Comeback Homepage -->
      <button class="bill__comeback-button">
        <i
          class="fa-solid fa-chevron-left"
          style="pointer-events: none"
        ></i>
        Quay trở lại Trang chủ
      </button>
      <!-- Info Bill -->
      <div class="bill__info">
        <!-- Header -->
        <div class="bill__row">
          <div class="bill__column">
            <h2 class="bill__icon">APHRODITE</h2>
            <p class="bill__slogan">
              Làm đẹp không chỉ là một lựa chọn, mà là một phong cách sống.
            </p>
          </div>
          <div class="bill__column">
            <h3 class="bill__title">HOÁ ĐƠN</h3>
            <p class="bill__id">Mã hoá đơn: Bill${
              orderList[orderList.length - 1].orderId
            }</p>
            <p class="bill__date" id="date-bill">Thời gian: ${
              orderList[orderList.length - 1].orderDate
            }</p>
          </div>
        </div>
        <!-- Info -->
        <div class="bill__row">
          <div class="bill__user-info">
            <h3 class="bill__sub-title">KHÁCH HÀNG</h3>
            <p class="bill__detail">${
              userList[indexCurrentUserLogin].first_name
            } ${userList[indexCurrentUserLogin].last_name}</p>
            <p class="bill__detail">${userList[indexCurrentUserLogin].email}</p>
            <p class="bill__detail">${userList[indexCurrentUserLogin].phone}</p>
            <p class="bill__detail">${
              userList[indexCurrentUserLogin].address
            }</p>
          </div>
          <div class="bill__shop-info">
            <h3 class="bill__sub-title">CỬA HÀNG</h3>
            <p class="bill__detail">Shop APHRODITE</p>
            <p class="bill__detail">nhom1SGU@gmail.com</p>
            <p class="bill__detail">+84 0123456789</p>
          </div>
        </div>
        <!-- Products -->
        <div class="bill__products">
          <h3 class="bill__sub-title center">SẢN PHẨM</h3>
          <table class="bill__table">
            <thead>
              <tr>
                <th width="22%">Mã sản phẩm</th>
                <th width="40%">Tên sản phẩm</th>
                <th width="19%">Số lượng</th>
                <th width="19%">Giá</th>
              </tr>
            </thead>
            <tbody>${createBillItems()}</tbody>
          </table>
          <div class="bill__payment">
            <p class="bill__delivery-price">
              Phí vận chuyển: <span>18.000<u>đ</u></span>
            </p>
            <p class="bill__total-price">
              Tổng tiền: <span class="bill__price">${formatVietNamMoney(
                totalPrice + 18000
              )}<u>đ</u></span>
            </p>
          </div>
        </div>
        <!-- Payment Function -->
        <div class="bill__payment-function">
          <h3 class="bill__sub-title">PHƯƠNG THỨC THANH TOÁN</h3>
          <p class="bill__detail"> Loại phương thức: ${!checkMethod ? method : method.name + " Thể loại: " + method.type + " Mã số thẻ: " + method.code}</p>
        </div>
        <!-- Thankyou -->
        <div class="bill__thankyou">
          <p>Cảm ơn Quý khách đã tin tưởng lựa chọn APHRODITE!</p>
          <p>
            Chúng tôi hy vọng các sản phẩm mỹ phẩm sẽ mang lại cho bạn sự
            hài lòng và vẻ đẹp hoàn hảo. Rất mong được phục vụ bạn trong
            những lần mua sắm tiếp theo!
          </p>
        </div>
      </div>
    </div>
  `;

  const mainContentDiv = document.getElementById("main-content");
  mainContentDiv.innerHTML = billForm;

  // Thiết lập sự kiện trở về Trang chủ
  comebackHomePage();
}

export function getBillInfo(array_orderProduct) {
  document
    .querySelector(".payment-information-info__submit")
    .addEventListener("click", function () {
      let userList = JSON.parse(localStorage.getItem("userList"));
      let indexCurrentUserLogin = JSON.parse(
        localStorage.getItem("indexCurrentUserLogin")
      );
      let productList = JSON.parse(localStorage.getItem("productList"));

      // hàm kiểm tra thông tin thanh toán
      if (handle_order_information(userList, indexCurrentUserLogin)) {
        //hàm xử lí đơn người dùng đặt hàng
        //array_orderProduct được khai báo ở file getpayment-----------------
        let result = handle_order_product(
          userList,
          indexCurrentUserLogin,
          productList,
          array_orderProduct
        );

        // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
        // updateBill();
        if (result) {
          updateBill(userList, indexCurrentUserLogin, array_orderProduct);
        }
      }
    });
}
