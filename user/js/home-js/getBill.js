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

// // Hàm cập nhật thông tin hoá đơn
// function updateBill() {

// }

// export function getBillInfo(array_orderProduct, currentPage) {
//   document
//     .querySelector(".payment-information-info__submit")
//     .addEventListener("click", function () {
//       // lấy danh sách sản phẩm từ phía admin để đồng bộ, xử lí dữ liệu
//       let productList = JSON.parse(localStorage.getItem('productList')) || [];
//       if (productList.length == 0) {
//         productList = [...productItemArray];
//         localStorage.setItem("productList", JSON.stringify(productList));
//       }

//       //lấy danh sách user từ local để lấy vị trí người đang đăng nhập
//       let userList = JSON.parse(localStorage.getItem("userList"));
//       let index_user_status_login;
//       userList.forEach((obj, index) => {
//         if(obj.statusLogin){
//           index_user_status_login = index;
//         }
//       });

//       //hàm kiểm tra thông tin thanh toán
//       if(handle_order_information(userList, index_user_status_login)){
//         //hàm xử lí đơn người dùng đặt hàng
//         handle_order_product(userList, index_user_status_login, productList, array_orderProduct);

//         // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
//         updateBill();
//       }
//     });
// }

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
function handle_order_information(userList, index_user_status_login) {
  if (!userList[index_user_status_login].full_info) {
    create_notification_user("Bạn cần bổ sung thông tin!");
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
    create_notification_user("Chưa xây dựng dữ liệu");
    return false;
  }
  if (document.querySelector("#internet-banking").checked) {
    create_notification_user("Chưa xây dựng dữ liệu");
    return false;
  }

  return true;
}

// hàm kiểm tra có đặt hàng thành công hay không
function handle_order_product(
  userList,
  userStatusLoginIndex,
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

  //nếu người dùng đặt hàng thành công

  create_notification_user("Đặt hàng thành công!");
  //tạo dữ liệu để push vào mảng đơn hàng chờ xử lí
  //tạo id cho đơn hàng

  // while (
  //   userList[userStatusLoginIndex].ordersHistory.some((obj) => {
  //     return obj.orderId == id_order;
  //   })
  // ) {
  //   id_order = Math.floor(Math.random() * userList[userStatusLoginIndex].ordersHistory.length + 1) + 1;
  // }

  //tạo thời gian đặt hàng
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
    date_order.getMonth().toString() +
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
      }
    }
  });

  //address để ship
  let address = document.querySelector(
    ".payment-information-info__address"
  ).placeholder;

  const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
  const id_order = orderList.length + 1;

  let data = {
    customerId: userList[userStatusLoginIndex].id,
    orderId: id_order,
    orderDate: date_order,
    orderAddressToShip: address,
    orderStatus: "Pending",
    orderMethod: purchase_method,
    orderTotalPrice:
      calTotalProductItemPriceInShoppingCart(userList, userStatusLoginIndex) +
      18000,
    orderProduct: userList[userStatusLoginIndex].shoppingCart,
  };

  orderList.push(data);

  // xóa dữ liệu trong giỏ hàng, cần settimeout đẻ đồng bộ nếu không thì nó xóa trước khi gán ở dòng 204, Hiệu cũng không hiểu
  // setTimeout(() => {
  //   userList[userStatusLoginIndex].shoppingCart = [];
  // }, 500);

  userList[userStatusLoginIndex].shoppingCart = [];


  
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
function updateBill(userList, userStatusLoginIndex, array_orderProduct) {
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
            <p class="bill__id">Mã hoá đơn: BILLxxxxx</p>
            <p class="bill__date" id="date-bill">Ngày: dd/mm/yyyy</p>
          </div>
        </div>
        <!-- Info -->
        <div class="bill__row">
          <div class="bill__user-info">
            <h3 class="bill__sub-title">KHÁCH HÀNG</h3>
            <p class="bill__detail">${
              userList[userStatusLoginIndex].firstName
            } ${userList[userStatusLoginIndex].lastName}</p>
            <p class="bill__detail">${userList[userStatusLoginIndex].email}</p>
            <p class="bill__detail">${userList[userStatusLoginIndex].phone}</p>
            <p class="bill__detail">${
              userList[userStatusLoginIndex].address
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
                calTotalProductItemPrice(array_orderProduct) + 18000
              )}<u>đ</u></span>
            </p>
          </div>
        </div>
        <!-- Payment Function -->
        <div class="bill__payment-function">
          <h3 class="bill__sub-title">PHƯƠNG THỨC THANH TOÁN</h3>
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
      // lấy danh sách user từ local để lấy vị trí người đang đăng nhập
      let userList = JSON.parse(localStorage.getItem("userList"));
      let userStatusLoginIndex;
      userList.forEach((obj, index) => {
        if (obj.statusLogin == true) {
          userStatusLoginIndex = index;
        }
      });

      // lấy danh sách sản phẩm từ phía admin để đồng bộ, xử lí dữ liệu
      let productList = JSON.parse(localStorage.getItem("productList")) || [];
      if (productList.length == 0) {
        productList = [...productItemArray];
        localStorage.setItem("productList", JSON.stringify(productList));
      }

      // hàm kiểm tra thông tin thanh toán
      if (handle_order_information(userList, userStatusLoginIndex)) {
        //hàm xử lí đơn người dùng đặt hàng
        //array_orderProduct được khai báo ở file getpayment-----------------
        let result = handle_order_product(
          userList,
          userStatusLoginIndex,
          productList,
          array_orderProduct
        );

        // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
        // updateBill();
        if (result) {
          updateBill(userList, userStatusLoginIndex, array_orderProduct);
        }
      }
    });
}
