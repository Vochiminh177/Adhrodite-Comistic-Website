import {
  updateHeaderAndFooter,
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { locationToSelectArray } from "../common-js/database.js";
import { comebackShoppingCart } from "./getShoppingCart.js";
import { getBillInfo } from "./getBill.js";

// Hàm trở về trang Giỏ hàng
function clickToComebackShoppingCart(userList, userStatusLoginIndex) {
  document
    .querySelector(".payment-information-info__comeback-button")
    .addEventListener("click", function () {
      // Đưa về đầu trang
      window.scrollTo(0, 0);

      // Hiển thị header và footer
      updateHeaderAndFooter("on");

      // Trở lại trang Giỏ hàng
      comebackShoppingCart(userList, userStatusLoginIndex);
    });
}

// Hàm tạo thông tin tóm tắt của các sản phẩm sẽ được thanh toán trong Thông tin giao hàng
function createPaymentInformationItems(array_orderProduct) {
  function getQuantityFormat(productItemQuantity) {
    if (productItemQuantity >= 100) productItemQuantity = "+99";
    return productItemQuantity;
  }

  let items = "";
  for (let i = 0; i < array_orderProduct.length; i++) {
    items += `
          <div class="payment-information-products__item"> 
            <figure class="payment-information-products__media">
                <img src="${
                  array_orderProduct[i].src
                }" alt="" class="payment-information-products__image">
            </figure>
            <div class="payment-information-products__info">
                <div class="payment-information-products__column">
                    <h3 class="payment-information-products__name">${
                      array_orderProduct[i].name
                    }</h3>
                    <p class="payment-information-products__details">
                        ${array_orderProduct[i].id} / ${
      array_orderProduct[i].category
    } / ${formatVietNamMoney(array_orderProduct[i].price)}đ
                    </p>
                </div>
                <p class="payment-information-products__total-price-product">${formatVietNamMoney(
                  array_orderProduct[i].price * array_orderProduct[i].quantity
                )}đ</p>
            </div>
            <span class="payment-information-products__numbers">${getQuantityFormat(
              array_orderProduct[i].quantity
            )}</span>
          </div>
    `;
  }
  return items;
}

// Hàm thay đổi địa chỉ giao hàng mới từ người dùng nhập vào
function updateUserAddressByInput() {
  // Biến giữ thông tin các select lần lượt là Tỉnh thành - Quận / Huyện - Phường / Xã
  const citySelect = document.querySelector(".city");
  const districtSelect = document.querySelector(".district");
  const wardSelect = document.querySelector(".ward");

  // Hàm đặt lại các lựa chọn
  function resetAllSelect(condition) {
    if (condition === 1) {
      citySelect.innerHTML = `<option>Chọn Tỉnh thành</option>`;
      districtSelect.innerHTML = `<option>Chọn Quận / Huyện</option>`;
    }
    if (condition === 2) {
      districtSelect.innerHTML = `<option>Chọn Quận / Huyện</option>`;
    }
    wardSelect.innerHTML = `<option>Chọn Phường / Xã</option>`;
  }

  // Đặt lại các lựa chọn
  resetAllSelect(1);
  // Cập nhật dữ liệu Thành phố
  let cityItems = "";
  for (let i = 0; i < locationToSelectArray.length; i++) {
    const city = locationToSelectArray[i];
    cityItems += `<option value="${city.id}">${city.name}</option>`;
  }
  citySelect.innerHTML = cityItems;

  //Khi người dùng lựa chọn Thành phố
  citySelect.addEventListener("change", function () {
    const cityIDSelected = citySelect.value;
    let districtsFromCitySelected;
    for (let i = 0; i < locationToSelectArray.length; i++) {
      if (locationToSelectArray[i].id == cityIDSelected) {
        districtsFromCitySelected = locationToSelectArray[i].districts;
        break;
      }
    }

    // Đặt lại các lựa chọn
    resetAllSelect(2);
    // Cập nhật dữ liệu Quận / Huyện khi đã biết tên Thành phố
    let districtItems = "";
    for (let i = 0; i < districtsFromCitySelected.length; i++) {
      const district = districtsFromCitySelected[i];
      districtItems += `<option value="${district.id}">${district.name}</option>`;
    }
    districtSelect.innerHTML = districtItems;

    //Khi người dùng lựa chọn Quận / Huyện
    districtSelect.addEventListener("change", function () {
      const districtIDSelected = districtSelect.value;
      let wardsFromDistrictSelected;
      for (let i = 0; i < districtsFromCitySelected.length; i++) {
        if (districtsFromCitySelected[i].id == districtIDSelected) {
          wardsFromDistrictSelected = districtsFromCitySelected[i].wards;
          break;
        }
      }

      // Đặt lại các lựa chọn
      resetAllSelect(0);
      // Cập nhật dữ liệu Phường / Xã khi đã biết tên Quận / Huyện
      let wardItems = "";
      for (let i = 0; i < wardsFromDistrictSelected.length; i++) {
        const ward = wardsFromDistrictSelected[i];
        wardItems += `<option value="${ward.id}">${ward.name}</option>`;
      }
      wardSelect.innerHTML = wardItems;
    });
  });
}
// Hàm cho phép người dùng thay đổi địa chỉ giao hàng
function updateChangeAddress(userList, userStatusLoginIndex) {
  const changeAddressForm = {
    list: `
      <ul class="payment-information-info__change-address-list">
        <li class="payment-information-info__change-address-item from-user-info">
          Nhập từ thông tin cá nhân
        </li>
        <li class="payment-information-info__change-address-item from-user-input">
          Nhập từ bàn phím
        </li>
      </ul>
    `,
    item2: `
      <div class="form-group">
        <input type="text" class="street" placeholder="Nhập địa chỉ"/>
      </div>
      <div class="form-group">
        <select class="city"><option></option></select>
        <select class="district"><option></option></select>
        <select class="ward"><option></option></select>
      </div>
      <div class="form-group">
        <input type="submit" class="comeback-change-address-list-button button-block" value="Áp dụng"/>
      </div>
    `,
  };

  // gán sự kiện cho hành động chọn địa điểm giao hàng
  const changeAddressAction = document.querySelector(
    ".payment-information-info__change-address-action"
  );
  changeAddressAction.addEventListener("click", (event) => {
    event.preventDefault();

    const changeAddressDiv = document.querySelector(
      ".payment-information-info__change-address-body"
    );
    if (changeAddressDiv.innerHTML === "") {
      // Cập nhật style cho thẻ a có nội dung "Tuỳ chọn"
      changeAddressAction.style.color = "#000";
      changeAddressAction.style.fontStyle = "normal";
      // Cập nhật lại nội dung cho phần thân của vùng thay đổi địa chỉ
      changeAddressDiv.innerHTML = changeAddressForm["list"];

      // Sự kiện khi chọn "Nhập từ thông tin cá nhân"
      document
        .querySelector(
          ".payment-information-info__change-address-item.from-user-info"
        )
        .addEventListener("click", function () {
          // Cập nhật lại thông tin địa chỉ
          const addressInput = document.querySelector(
            ".payment-information-info__address"
          );
          addressInput.setAttribute(
            "placeholder",
            userList[userStatusLoginIndex].address
          );
        });

      // Sự kiện khi nhập từ bàn phím
      document
        .querySelector(
          ".payment-information-info__change-address-item.from-user-input"
        )
        .addEventListener("click", function () {
          changeAddressDiv.innerHTML = changeAddressForm["item2"];

          // Thiết lập sự kiện cho phép người dùng nhập thông tin của địa chỉ mới
          updateUserAddressByInput();

          // Thiết lập sự kiện cho phép người dùng quay về danh sách các lựa chọn địa chỉ
          document
            .querySelector(".comeback-change-address-list-button")
            .addEventListener("click", function () {
              // Số nhà, tên đường
              const streetInfo = document.querySelector(".street").value;
              // Phường hoặc Xã
              const wardInfo =
                document.querySelector(".ward :checked").innerText;
              // Quận hoặc Huyện
              const districtInfo =
                document.querySelector(".district :checked").innerText;
              // Tỉnh thành
              const cityInfo =
                document.querySelector(".city :checked").innerText;
              // Biến tổng hợp lại các thông tin trên
              let newAddress =
                streetInfo +
                ", " +
                wardInfo +
                ", " +
                districtInfo +
                ", " +
                cityInfo;

              // Cập nhật lại thông tin địa chỉ
              const addressInput = document.querySelector(
                ".payment-information-info__address"
              );
              addressInput.setAttribute("placeholder", newAddress);

              // Cập nhật style cho thẻ a có nội dung "Tuỳ chọn"
              changeAddressAction.style.color = "#ccc";
              changeAddressAction.style.fontStyle = "italic";
              // Cập nhật lại nội dung cho phần thân của vùng thay đổi địa chỉ
              changeAddressDiv.innerHTML = "";

              //
            });
        });
    } else {
      // Cập nhật style cho thẻ a có nội dung "Tuỳ chọn"
      changeAddressAction.style.color = "#ccc";
      changeAddressAction.style.fontStyle = "italic";
      // Cập nhật lại nội dung cho phần thân của vùng thay đổi địa chỉ
      changeAddressDiv.innerHTML = "";
    }
  });
}

// Hàm cho phép người dùng thay đổi phương thức thanh toán
function updatePayFunction() {}

// Hàm cập nhật thông tin thanh toán từ Giỏ hàng
function updatePaymentInformation(
  userList,
  userStatusLoginIndex,
  array_orderProduct
) {
  const paymentInformationForm = `
      <div class="body__payment-information">
        <div class="payment-information__header">
            <h1 class="payment-information__icon">APHRODITE</h1>
            <p class="payment-information__desc">
            Làm đẹp không chỉ là một lựa chọn, mà là một phong cách sống.
            </p>
        </div>
        <div class="payment-information__content">
            <div class="payment-information__info">
            <h2 class="payment-information-info__title">THÔNG TIN GIAO HÀNG</h2>
            <div class="payment-information-info__block">
                <h3 class="payment-information-info__sub-title">Thông tin khách hàng</h3>
                <form action="" class="payment-information-info__form">
                  <div class="payment-information-info__form-group">
                      <input type="text" class="payment-information-info__name" placeholder="${
                        userList[userStatusLoginIndex].firstName +
                        " " +
                        userList[userStatusLoginIndex].lastName
                          ? userList[userStatusLoginIndex].firstName +
                            " " +
                            userList[userStatusLoginIndex].lastName
                          : "Nhập họ và tên"
                      }" readonly="">
                  </div>
                  <div class="payment-information-info__form-group">
                      <input type="email" class="payment-information-info__email" placeholder="${
                        userList[userStatusLoginIndex].email
                          ? userList[userStatusLoginIndex].email
                          : "Nhập email"
                      }" readonly="">
                      <input type="phone" class="payment-information-info__phone" placeholder="${
                        userList[userStatusLoginIndex].phone
                          ? userList[userStatusLoginIndex].phone
                          : "Nhập số điện thoại"
                      }" readonly="">
                  </div>
                  <div class="payment-information-info__form-group">
                      <input type="text" class="payment-information-info__address" placeholder="${
                        userList[userStatusLoginIndex].address
                          ? userList[userStatusLoginIndex].address
                          : "Nhập địa chỉ giao hàng"
                      }" readonly="">
                  </div>
                </form>
                <div class="payment-information-info__change-address">
                  <a href="#!" class="payment-information-info__change-address-action">
                      Tuỳ chọn địa điểm giao hàng
                      <i class="fa-solid fa-chevron-down"></i>
                  </a>
                  <div class="payment-information-info__change-address-body"></div>
                </div>
            </div>
            <div class="payment-information-info__block">
                <h3 class="payment-information-info__sub-title">Phương thức vận chuyển</h3>
                <form action="" class="payment-information-info__form">
                <div class="payment-information-info__form-group">
                    <input type="radio" name="ship" value="ship" id="ship" checked="" hidden="">
                    <label for="ship">
                    <i class="fa-solid fa-truck"></i>Giao hàng tận nơi
                    <span class="ship-price">18.000đ</span>
                    </label>
                </div>
                </form>
            </div>
            <div class="payment-information-info__block">
                <h3 class="payment-information-info__sub-title">Phương thức thanh toán</h3>
                <form action="" class="payment-information-info__form purchase-method">
                <div class="payment-information-info__form-group">
                    <input type="radio" name="pay" value="cod" id="cod" checked="" hidden="">
                    <label for="cod">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    Thanh toán khi giao hàng (COD)
                    </label>
                </div>
                <div class="payment-information-info__form-group">
                    <input type="radio" name="pay" value="internet-banking" id="internet-banking" hidden="">
                    <label for="internet-banking">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    Thanh toán qua chuyển khoản
                    </label>
                </div>
                <div class="payment-information-info__form-group purchase-atm">
                    <input type="radio" name="pay" value="credit-card" id="credit-card" hidden="">
                    <label class="label-atm" for="credit-card">
                    <i class="fa-solid fa-credit-card"></i>Thanh toán qua thẻ
                    </label>
                </div>
                </form>
            </div>
            <div class="payment-information-info__row">
                <button class="payment-information-info__comeback-button">Giỏ hàng</button>
                <button class="payment-information-info__submit btn">
                  Hoàn tất đơn hàng
                </button>
            </div>
            </div>
            <div class="payment-information__products">
            <div class="payment-information-products__list">${createPaymentInformationItems(
              array_orderProduct
            )}</div>
            <div class="payment-information-products__calculation">
                <p class="payment-information-products__temp-price">
                Tạm tính <span id="temp-price">${formatVietNamMoney(
                  calTotalProductItemPriceInShoppingCart(
                    userList,
                    userStatusLoginIndex
                  )
                )}đ</span>
                </p>
                <p class="payment-information-products__ship-price">
                Phí vận chuyển <span id="ship-price">18.000đ</span>
                </p>
            </div>
            <p class="payment-information-products__total-price">
                Tổng cộng <span id="total-price">${formatVietNamMoney(
                  calTotalProductItemPriceInShoppingCart(
                    userList,
                    userStatusLoginIndex
                  ) + 18000
                )}<u>đ</u></span>
            </p>
            </div>
        </div>
      </div>
  `;

  // Cập nhật thông tin thanh toán ở body (main-content)
  let mainContent = document.getElementById("main-content");
  mainContent.innerHTML = paymentInformationForm;

  // Thiết lập sự kiện cho phép người dùng thay đổi địa chỉ giao hàng
  updateChangeAddress(userList, userStatusLoginIndex);

  // Thiết lập sự kiện cho phép người dùng thay đổi phương thức thanh toán
  updatePayFunction();

  // Thiết lập sự kiện cho phép người dùng thay đổi phương thức thanh toán
  // // gán sự kiện chọn thanh toán qua thẻ
  // document.querySelector("#credit-card").onclick = () => {
  //   let form_purchase_method = document.querySelector(".purchase-method");
  //   let array_input_text =
  //     form_purchase_method.querySelectorAll("input[type=text]");
  //   if (array_input_text.length != 0) {
  //     array_input_text.forEach((obj) => {
  //       obj.remove();
  //     });
  //   }

  //   let ele_1 = document.createElement("input");
  //   ele_1.type = "text";
  //   ele_1.style.borderBottom = "1px solid #000";
  //   ele_1.style.width = "100%";
  //   ele_1.style.padding = "10px";
  //   ele_1.style.margin = "10px 0px";
  //   ele_1.disabled = true;
  //   ele_1.value = userList[userStatusLoginIndex].ma_the;

  //   let ele_2 = document.createElement("input");
  //   ele_2.type = "text";
  //   ele_2.style.borderBottom = "1px solid #000";
  //   ele_2.style.width = "100%";
  //   ele_2.style.padding = "10px";
  //   ele_2.style.margin = "5px 0px";
  //   ele_2.disabled = true;
  //   ele_2.value = userList[userStatusLoginIndex].code_the;

  //   let ele_3 = document.createElement("input");
  //   ele_3.type = "text";
  //   ele_3.style.borderBottom = "1px solid #000";
  //   ele_3.style.width = "100%";
  //   ele_3.style.padding = "10px";
  //   ele_3.style.margin = "5px 0px";
  //   ele_3.disabled = true;
  //   ele_3.value = userList[userStatusLoginIndex].bank;

  //   document.querySelector(".purchase-atm").appendChild(ele_1);
  //   document.querySelector(".purchase-atm").appendChild(ele_2);
  //   document.querySelector(".purchase-atm").appendChild(ele_3);
  // };

  // // gán sự kiện khi chọn chuyển khoản
  // document.querySelector("#internet-banking").onclick = () => {
  //   let form_purchase_method = document.querySelector(".purchase-method");
  //   let array_input_text =
  //     form_purchase_method.querySelectorAll("input[type=text]");
  //   if (array_input_text.length != 0) {
  //     array_input_text.forEach((obj) => {
  //       obj.remove();
  //     });
  //   }
  // };

  // // gán sự kiện khi chọn tiền mặt
  // document.querySelector("#cod").onclick = () => {
  //   let form_purchase_method = document.querySelector(".purchase-method");
  //   let array_input_text =
  //     form_purchase_method.querySelectorAll("input[type=text]");
  //   if (array_input_text.length != 0) {
  //     array_input_text.forEach((obj) => {
  //       obj.remove();
  //     });
  //   }
  // };

  // Tạo sự kiện để người dùng có thể trở về trang Giỏ hàng
  clickToComebackShoppingCart(userList, userStatusLoginIndex);

  // Tạo sự kiện để người dùng nhấn "Hoàn tất" thông tin giao hàng để hiện thị Hoá đơn
  getBillInfo(array_orderProduct);
}

// Hàm hiển thị thông tin thanh toán của người dùng
export function getPaymentInformationInfo() {
  document
    .querySelector(".shopping-cart__payment-button")
    .addEventListener("click", function () {
      //lấy danh sách user từ local để lấy vị trí người đang đăng nhập
      let userList = JSON.parse(localStorage.getItem("userList"));
      let userStatusLoginIndex;
      userList.forEach((obj, index) => {
        if (obj.statusLogin) {
          userStatusLoginIndex = index;
        }
      });

      if (userList[userStatusLoginIndex].shoppingCart.length >= 1) {
        // Đưa về đầu trang
        window.scrollTo(0, 0);

        // Ẩn đi header và footer của trang web
        updateHeaderAndFooter("off");

        //mảng chứa những obj đơn hàng gồm id và quantity (giải quyết cho admin)
        let array_orderProduct = [];
        let array_shopping_cart__item = document.querySelectorAll(
          ".shopping-cart__list .shopping-cart__item"
        );

        array_shopping_cart__item.forEach((obj) => {
          //lấy id của sản phẩm
          let string_details = obj.querySelector(
            ".shopping-cart__column .shopping-cart__details"
          ).textContent;

          // string_details là chuỗi gồm .../.../...
          let array_split = string_details.split("/");
          let id = array_split[0].trim(); // lấy chuỗi id sản phẩm và loại bỏ 2 khoảng trắng
          let category = array_split[1].trim();
          let price = array_split[2].trim();

          price = price.replaceAll("đ", "");
          price = price.replaceAll(".", "");

          let quantity = obj.querySelector(
            ".shopping-cart__quantity .shopping-cart__number"
          ).value; //lấy số lượng đặt hàng của mỗi sản phẩm
          let name = obj.querySelector(
            ".shopping-cart__column .shopping-cart__name"
          ).textContent;
          let src = obj.querySelector("img").src;
          let data = {
            id: id,
            price: price,
            category: category,
            quantity: quantity,
            name: name,
            src: src,
          };

          array_orderProduct.push(data); //mảng chứa những obj đơn hàng gồm id và quantity (giải quyết cho admin)
        });

        // Cập nhật thông tin thanh toán
        updatePaymentInformation(
          userList,
          userStatusLoginIndex,
          array_orderProduct
        );
      } else {
        window.alert(
          "Hiện tại, trong Giỏ hàng của bạn không có sản phẩm nào. Bạn hãy quay lại trang Sản phẩm và đặt mua một vài thứ nhé."
        );
      }
    });
}
