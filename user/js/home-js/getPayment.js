import {
  updateHeaderAndFooter,
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import { locationToSelectArray } from "../../../database/database.js";
import { comebackShoppingCart } from "./getShoppingCart.js";
import { getBillInfo } from "./getBill.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { errorInput } from "../userUpdate/handleUserUpdate.js";

// Hàm trở về trang Giỏ hàng
function clickToComebackShoppingCart(userList, indexCurrentUserLogin) {
  document
    .querySelector(".payment-information-info__comeback-button")
    .addEventListener("click", function () {
      // Đưa về đầu trang
      window.scrollTo(0, 0);

      // Hiển thị header và footer
      updateHeaderAndFooter("on");

      // Trở lại trang Giỏ hàng
      comebackShoppingCart(userList, indexCurrentUserLogin);
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
                        <br> ${array_orderProduct[i].id} <br> ${
      array_orderProduct[i].category
    } <br> ${array_orderProduct[i].price}
                    </p>
                </div>
                <p class="payment-information-products__total-price-product">${formatVietNamMoney(
                  array_orderProduct[i].totalPrice
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
function updateChangeAddress(userList, indexCurrentUserLogin) {
  const changeAddressForm = {
    list: `
      <ul class="payment-information-info__change-address-list">
        <li class="payment-information-info__change-address-item from-user-info">
          Nhập địa chỉ từ lần đặt trước
        </li>
        <li class="payment-information-info__change-address-item from-user-input">
          Nhập từ bàn phím
        </li>
      </ul>
    `,
    item2: `
      <div class="form-group">
        <input type="text" class="street" placeholder="Nhập số nhà và đường"/>
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
          addressInput.value = userList[indexCurrentUserLogin].address;
          if(addressInput.value === ""){
            create_notification_user("Bạn chưa đặt hàng lần nào");
          }
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
              if(streetInfo === ""){
                errorInput(document.querySelector(".street"));
              }
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

              if(wardInfo !== "Chọn Phường / Xã" && districtInfo !== "Chọn Quận / Huyện" && cityInfo !== "Chọn Tỉnh thành"){
                let newAddress =
                streetInfo + ", " +
                  wardInfo +
                  ", " +
                  districtInfo +
                  ", " +
                  cityInfo;

                // Cập nhật lại thông tin địa chỉ
                document.querySelector(
                  ".payment-information-info__address"
                ).value = newAddress;
              }
              else{
                if(cityInfo === "Chọn Tỉnh thành"){
                  errorInput(document.querySelector(".city :checked"), null, true);
                }
                else if(districtInfo === "Chọn Quận / Huyện"){
                  errorInput(document.querySelector(".district :checked"), null, true);
                }
                else  errorInput(document.querySelector(".ward :checked"), null, true);
                return;
              }
    

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
function updatePayFunction(userList, indexCurrentUserLogin) {
  const payFunctionForm = {
    internet_banking: `
      <figure><img src="./assets/images/internet-banking-qrcode.svg" alt="" class="payment-information-info__internet-banking-image"/></figure>
      <div class="payment-information-info__internet-banking-details">
        <p class="payment-information-info__internet-banking-detail"><b>Ngân hàng:</b> MB BANK</p>
        <p class="payment-information-info__internet-banking-detail"><b>Tên tài khoản:</b> APHRODITE SHOP</p>
        <p class="payment-information-info__internet-banking-detail"><b>Số tài khoản:</b> 0123456789</p>
      </div>
    `,
    credit_card: `
      <div class="payment-information-info__cards">
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="master-card" checked hidden>
          <label for="master-card"> 
            <i class="fa-brands fa-cc-mastercard"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="visa" hidden>
          <label for="visa">
            <i class="fa-brands fa-cc-visa"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="jcb" hidden>
          <label for="jcb">
            <i class="fa-brands fa-cc-jcb"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="discover" hidden>
          <label for="discover">
            <i class="fa-brands fa-cc-discover"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="paypal" hidden>
          <label for="paypal">
            <i class="fa-brands fa-cc-paypal"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="apple-pay" hidden>
          <label for="apple-pay">
          <i class="fa-brands fa-cc-apple-pay"></i>
          </label>
        </div>
        <div class="payment-information-info__card">
          <input type="radio" name="card" id="stripe" hidden>
          <label for="stripe">
            <i class="fa-brands fa-cc-stripe"></i>
          </label>
        </div>
      </div>
      <div class="payment-information-info__card-form-group">
        <input type="text" name="card-id" id="card-id" placeholder="Mã thẻ">
      </div>
    `,
  };

  document
    .querySelectorAll(
      ".payment-information-info__block:nth-of-type(3) input[type='radio']"
    )
    .forEach((obj) => {
      obj.addEventListener("click", function () {
        const inputValue = obj.value;
        if (inputValue === "cod") {
          const payByInternetBankingDiv = document.querySelector(
            ".payment-information-info__internet-banking-info"
          );
          const payByCreditCardDiv = document.querySelector(
            ".payment-information-info__credit-card-info"
          );
          payByInternetBankingDiv.innerHTML = "";
          payByCreditCardDiv.innerHTML = "";

          // Hiệu lưu thông tin chỗ này
        } else if (inputValue === "internet-banking") {
          const payByCreditCardDiv = document.querySelector(
            ".payment-information-info__credit-card-info"
          );
          payByCreditCardDiv.innerHTML = "";
          const payByInternetBankingDiv = document.querySelector(
            ".payment-information-info__internet-banking-info"
          );
          payByInternetBankingDiv.innerHTML =
            payFunctionForm["internet_banking"];

          // Hiệu lưu thông tin chỗ này
        } else if (inputValue === "credit-card") {
          const payByInternetBankingDiv = document.querySelector(
            ".payment-information-info__internet-banking-info"
          );
          payByInternetBankingDiv.innerHTML = "";
          const payByCreditCardDiv = document.querySelector(
            ".payment-information-info__credit-card-info"
          );
          payByCreditCardDiv.innerHTML = payFunctionForm["credit_card"];

          // Hiệu lưu thông tin chỗ này
        }
      });
    });
}

// Hàm cập nhật thông tin thanh toán từ Giỏ hàng
function updatePaymentInformation(
  userList,
  indexCurrentUserLogin,
  array_orderProduct
) {
  let totalPriceTamTinh = 0;
  array_orderProduct.forEach((obj) => {
    totalPriceTamTinh += obj.totalPrice;
  });




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
        <h2 class="payment-information-info__title">
          THÔNG TIN GIAO HÀNG
        </h2>
        <div class="payment-information-info__block">
          <h3 class="payment-information-info__sub-title">
            Thông tin khách hàng
          </h3>
          <form action="" class="payment-information-info__form">
              <div class="payment-information-info__form-group">
                  <input type="text" class="payment-information-info__firstName" value="${userList[indexCurrentUserLogin].first_name ? userList[indexCurrentUserLogin].first_name : ""}" placeholder="Họ">
                  <input type="text" class="payment-information-info__lastName" value="${userList[indexCurrentUserLogin].last_name ? userList[indexCurrentUserLogin].last_name : ""}" placeholder="Tên">
              </div>
              <div class="payment-information-info__form-group">
                  <input type="email" class="payment-information-info__email" 
                  value="${
                    userList[indexCurrentUserLogin].email
                      ? userList[indexCurrentUserLogin].email
                      : ""}"
                  placeholder="Email">
                  <input type="phone" class="payment-information-info__phone" value="${
                    userList[indexCurrentUserLogin].phone
                      ? userList[indexCurrentUserLogin].phone
                      : ""
                  }"
                  placeholder="Số điện thoại">
              </div>
              <div class="payment-information-info__form-group">
                  <input type="text" class="payment-information-info__address" value="${
                    userList[indexCurrentUserLogin].address
                      ? userList[indexCurrentUserLogin].address
                      : ""}" 
                    placeholder="Địa chỉ">
              </div>
            </form>
          <div class="payment-information-info__change-address">
            <a
              href="#!"
              class="payment-information-info__change-address-action"
            >
              Tuỳ chọn địa điểm giao hàng
              <i class="fa-solid fa-chevron-down"></i>
            </a>
            <div
              class="payment-information-info__change-address-body"
            ></div>
          </div>
        </div>
        <div class="payment-information-info__block">
          <h3 class="payment-information-info__sub-title">
            Phương thức vận chuyển
          </h3>
          <form action="" class="payment-information-info__form">
            <div class="payment-information-info__form-group">
              <input
                type="radio"
                name="ship"
                value="ship"
                id="ship"
                checked
                hidden
              />
              <label for="ship">
                <i class="fa-solid fa-truck"></i>Giao hàng tận nơi
                <span class="ship-price">18.000đ</span>
              </label>
            </div>
          </form>
        </div>
        <div class="payment-information-info__block">
          <h3 class="payment-information-info__sub-title">
            Phương thức thanh toán
          </h3>
          <form
            action=""
            class="payment-information-info__form purchase-method"
          >
            <div class="payment-information-info__form-group">
              <input
                type="radio"
                name="pay"
                value="cod"
                id="cod"
                checked
                hidden
              />
              <label for="cod">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                Thanh toán khi giao hàng (COD)
              </label>
            </div>
            <div class="payment-information-info__form-group">
              <input
                type="radio"
                name="pay"
                value="internet-banking"
                id="internet-banking"
                hidden
              />
              <label for="internet-banking">
                <i class="fa-solid fa-qrcode"></i>
                Thanh toán qua chuyển khoản
              </label>
              <div
                class="payment-information-info__internet-banking-info"
              ></div>
            </div>
            <div
              class="payment-information-info__form-group purchase-atm"
            >
              <input
                type="radio"
                name="pay"
                value="credit-card"
                id="credit-card"
                hidden
              />
              <label class="label-atm" for="credit-card">
                <i class="fa-solid fa-credit-card"></i>Thanh toán qua thẻ
              </label>
              <div
                class="payment-information-info__credit-card-info"
              ></div>
            </div>
          </form>
        </div>
        <div class="payment-information-info__row">
          <button class="payment-information-info__comeback-button">
            Giỏ hàng
          </button>
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
              totalPriceTamTinh
            )}đ</span>
          </p>
          <p class="payment-information-products__ship-price">
            Phí vận chuyển <span id="ship-price">18.000đ</span>
          </p>
        </div>
        <p class="payment-information-products__total-price">
            Tổng cộng <span id="total-price">${formatVietNamMoney(
              totalPriceTamTinh + 18000
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
  updateChangeAddress(userList, indexCurrentUserLogin);

  // Thiết lập sự kiện cho phép người dùng thay đổi phương thức thanh toán
  updatePayFunction(userList, indexCurrentUserLogin);

  // Tạo sự kiện để người dùng có thể trở về trang Giỏ hàng
  clickToComebackShoppingCart(userList, indexCurrentUserLogin);

  // Tạo sự kiện để người dùng nhấn "Hoàn tất" thông tin giao hàng để hiện thị Hoá đơn
  getBillInfo(array_orderProduct);
}

// Hàm hiển thị thông tin thanh toán của người dùng
export function getPaymentInformationInfo(userList, indexCurrentUserLogin) {
  document
    .querySelector(".shopping-cart__pay-button")
    .addEventListener("click", function () {
      //up userList lên local vì khi ấn nút này cần cập nhật giỏ hàng lên local (khúc này chưa cập nhật lên local nên việc xử lí không đồng bộ)
      userList = JSON.parse(localStorage.getItem("userList"));

      if (userList[indexCurrentUserLogin].shoppingCart.length >= 1) {
        // Đưa về đầu trang
        window.scrollTo(0, 0);

        // Ẩn đi header và footer của trang web
        updateHeaderAndFooter("off");

        //mảng chứa những obj đơn hàng gồm id và quantity (giải quyết cho admin)
        let array_orderProduct = [];
        let array_shopping_cart__item = document.querySelectorAll(
          ".shopping-cart__list .shopping-cart__item"
        );

        array_shopping_cart__item.forEach((obj, index) => {
          //lấy id của sản phẩm
          let string_details = obj.querySelector(
            ".shopping-cart__column .shopping-cart__details"
          ).textContent;

          // string_details là chuỗi gồm .../.../...
          let array_split = string_details.split("/");
          let id = array_split[0].trim(); // lấy chuỗi id sản phẩm và loại bỏ 2 khoảng trắng
          let category = array_split[1].trim();
          let price = array_split[2].trim();

          let quantity = obj.querySelector(
            ".shopping-cart__quantity .shopping-cart__number"
          ).value; //lấy số lượng đặt hàng của mỗi sản phẩm
          let name = obj.querySelector(
            ".shopping-cart__column .shopping-cart__name"
          ).textContent;
          let src = obj.querySelector("img").src;

          //do mảng shoppingCart trùng với array_order nên sài index được
          let totalPrice = document.querySelectorAll(
            ".shopping-cart__product-total-price"
          )[index].textContent;
          totalPrice = totalPrice.replaceAll("đ", "").trim();
          totalPrice = totalPrice.replaceAll(".", "");

          let data = {
            id: id,
            price: price,
            category: category,
            quantity: parseInt(quantity),
            name: name.trim(),
            src: src,
            totalPrice: parseInt(totalPrice),
            discountQuantity:
              userList[indexCurrentUserLogin].shoppingCart[index]
                .discountQuantity,
            discountPercent:
              userList[indexCurrentUserLogin].shoppingCart[index]
                .discountPercent,
          };
          array_orderProduct.push(data); //mảng đơn hàng chứa những obj sản phẩm gồm id và quantity,... (giải quyết cho admin)
        });

        // Cập nhật thông tin thanh toán
        updatePaymentInformation(
          userList,
          indexCurrentUserLogin,
          array_orderProduct
        );
      } else {
        create_notification_user(
          "Hiện tại, trong Giỏ hàng của bạn không có sản phẩm nào. Bạn hãy quay lại trang Sản phẩm và đặt mua một vài thứ nhé."
        );
      }
    });
}
