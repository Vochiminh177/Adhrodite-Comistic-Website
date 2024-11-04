import {
  formatVietNamMoney,
  calTotalProductItemPriceInShoppingCart,
} from "../common-js/common.js";
import {
  productItemAddedToShoppingCart as productItemAddedArray,
  basicInformationFromUser,
} from "../common-js/database.js";
import { comebackShoppingCart } from "./getShoppingCart.js";
import { getBillInfo } from "./getBill.js";

// Hàm ẩn hiển header và footer của trang web
function updateHeaderAndFooter(condition) {
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  if (condition === "off") {
    header.style.display = "none";
    footer.style.display = "none";
  } else {
    header.style.display = "block";
    footer.style.display = "block";
  }
}

// Hàm trở về trang Giỏ hàng
function clickToComebackShoppingCart() {
  document
    .querySelector(".payment-information-info__comeback-button")
    .addEventListener("click", function () {
      // Đưa về đầu trang
      window.scrollTo(0, 0);

      // Hiển thị header và footer
      updateHeaderAndFooter("on");

      // Trở lại trang Giỏ hàng
      comebackShoppingCart();
    });
}

// Hàm tạo thông tin tóm tắt của các sản phẩm sẽ được thanh toán trong Thông tin giao hàng
function createPaymentInformationItemsByHtml() {
  function getQuantityFormat(productItemQuantity) {
    if (productItemQuantity >= 100) productItemQuantity = "+99";
    return productItemQuantity;
  }

  let productListDivToHtml = document.createElement("div");
  for (let i = 0; i < productItemAddedArray.length; i++) {
    let productItemForm = `
            <figure class="payment-information-products__media">
                <img src="${
                  productItemAddedArray[i].src
                }" alt="" class="payment-information-products__image">
            </figure>
            <div class="payment-information-products__info">
                <div class="payment-information-products__column">
                    <h3 class="payment-information-products__name">${
                      productItemAddedArray[i].name
                    }</h3>
                    <p class="payment-information-products__details">
                        ${productItemAddedArray[i].id} / ${
      productItemAddedArray[i].category
    } / ${formatVietNamMoney(productItemAddedArray[i].price)}đ
                    </p>
                </div>
                <p class="payment-information-products__total-price-product">${formatVietNamMoney(
                  productItemAddedArray[i].price *
                    productItemAddedArray[i].quantity
                )}đ</p>
            </div>
            <span class="payment-information-products__numbers">${getQuantityFormat(
              productItemAddedArray[i].quantity
            )}</span>
    `;
    let productItemDiv = document.createElement("div");
    productItemDiv.className = "payment-information-products__item";
    productItemDiv.innerHTML = productItemForm;
    productListDivToHtml.appendChild(productItemDiv);
  }
  return productListDivToHtml.innerHTML;
}

// Hàm cập nhật thông tin thanh toán từ Giỏ hàng
function updatePaymentInformation() {
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
                        basicInformationFromUser.fullname
                      }" readonly="">
                  </div>
                  <div class="payment-information-info__form-group">
                      <input type="email" class="payment-information-info__email" placeholder="${
                        basicInformationFromUser.email
                      }" readonly="">
                      <input type="phone" class="payment-information-info__phone" placeholder="${
                        basicInformationFromUser.phone
                      }" readonly="">
                  </div>
                  <div class="payment-information-info__form-group">
                      <input type="text" class="payment-information-info__location">
                  </div>
                </form>
                <div class="payment-information-info__change-location">
                <a href="#!" class="payment-information-info__change-location-action">
                    Tuỳ chọn địa điểm giao hàng
                    <i class="fa-solid fa-chevron-down"></i>
                </a>
                <ul class="payment-information-info__change-location-list">
                    <li class="payment-information-info__change-location-item">
                    Nhập từ thông tin cá nhân
                    </li>
                    <li class="payment-information-info__change-location-item">
                    Nhập từ bàn phím
                    </li>
                </ul>
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
                <form action="" class="payment-information-info__form">
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
                    <i class="fa-solid fa-money-check-dollar"></i>
                    Thanh toán qua chuyển khoản
                    </label>
                </div>
                <div class="payment-information-info__form-group">
                    <input type="radio" name="pay" value="credit-card" id="credit-card" hidden="">
                    <label for="credit-card">
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
            <div class="payment-information-products__list">${createPaymentInformationItemsByHtml()}</div>
            <div class="payment-information-products__calculation">
                <p class="payment-information-products__temp-price">
                Tạm tính <span id="temp-price">${formatVietNamMoney(
                  calTotalProductItemPriceInShoppingCart()
                )}đ</span>
                </p>
                <p class="payment-information-products__ship-price">
                Phí vận chuyển <span id="ship-price">18.000đ</span>
                </p>
            </div>
            <p class="payment-information-products__total-price">
                Tổng cộng <span id="total-price">${formatVietNamMoney(
                  calTotalProductItemPriceInShoppingCart() + 18000
                )}<u>đ</u></span>
            </p>
            </div>
        </div>
        </div>
  `;
  let paymentInformationFormToHTML = document.createElement("div");
  paymentInformationFormToHTML.innerHTML = paymentInformationForm;

  // Cập nhật thông tin thanh toán ở body (main-content)
  let mainContent = document.getElementById("main-content");
  mainContent.innerHTML = paymentInformationFormToHTML.innerHTML;

  // Tạo sự kiện để người dùng có thể trở về trang Giỏ hàng
  clickToComebackShoppingCart();

  // Tạo sự kiện để người dùng nhấn "Hoàn tất" thông tin giao hàng để hiện thị Hoá đơn
  getBillInfo(currentPage)
}

// Hàm hiển thị thông tin thanh toán của người dùng
export function getPaymentInformationInfo() {
  document
    .querySelector(".shopping-cart__payment-button")
    .addEventListener("click", function () {
      if (productItemAddedArray.length >= 1) {
        // Đưa về đầu trang
        window.scrollTo(0, 0);

        // Ẩn đi header và footer của trang web
        updateHeaderAndFooter("off");

        // Cập nhật thông tin thanh toán
        updatePaymentInformation();
      } else {
        window.alert(
          "Hiện tại, trong Giỏ hàng của bạn không có sản phẩm nào. Bạn hãy quay lại trang Sản phẩm và đặt mua một vài thứ nhé."
        );
      }
    });
}
