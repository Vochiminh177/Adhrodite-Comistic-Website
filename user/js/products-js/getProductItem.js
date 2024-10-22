import { productItemArray } from "../common-js/database.js";

// Thông tin của một sản phẩm cụ thể
function updateProductItem(productItemKey) {
  if (productItemArray[productItemKey]) {
    const productItemForm = {
      item: `
        <div class="main__order">
          <h2 class="main-order__title heading">SẢN PHẨM</h2>
          <div class="main-order__body">
            <div class="main-order__media">
              <img
                src=${productItemArray[productItemKey].src}
                alt=""
                class="main-order__image"
              />
            </div>
            <div class="main-order__content">
              <h2 class="main-order__product-title">
              ${productItemArray[productItemKey].name}
              </h2>
              <div class="main-order__details">
                <p class="main-order__detail">
                  Mã sản phẩm: <b>${productItemArray[productItemKey].id}</b>
                </p>
                <p class="main-order__detail">
                  Hãng: <b>${productItemArray[productItemKey].brand}</b>
                </p>
                <p class="main-order__detail">
                  Danh mục: <b>${productItemArray[productItemKey].menu}</b>
                </p>
                <p class="main-order__detail">Giá: <b>${productItemArray[productItemKey].price}</b></p>
              </div>
              <div class="main-order__row">
                <div class="main-order__count">
                  <p class="main-order__count-number">1</p>
                  <div class="main-order__column">
                    <a
                      href="#!"
                      class="main-order__count-action main-order__increment"
                    >
                      +
                    </a>
                    <a
                      href="#!"
                      class="main-order__count-action main-order__descrement"
                    >
                      -
                    </a>
                  </div>
                </div>
                <div class="main-order__buttons">
                  <a href="#!" class="main-order__button">Mua</a>
                  <a href="#!" class="main-order__button">Thêm giỏ hàng</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main__info">
          <div class="main-info__content">
            <h2 class="info-content__title heading">THÔNG TIN CHI TIẾT</h2>
            <p class="info-content__desc">
            ${productItemArray[productItemKey].desc}
            </p>
          </div>
          <div class="main-info__rate">
            <h2 class="info-rate__title heading">ĐÁNH GIÁ</h2>
            <div class="info-rate__stats">
              <p class="info-rate__score">
                <b>5.0</b>
              </p>
              <div class="info-rate__stars">
                <i class="fa-solid fa-star info-rate__star"></i>
                <i class="fa-solid fa-star info-rate__star"></i>
                <i class="fa-solid fa-star info-rate__star"></i>
                <i class="fa-solid fa-star info-rate__star"></i>
                <i class="fa-solid fa-star info-rate__star"></i>
              </div>
              <div class="info-rate__score-details">
                <div class="score-details__row">
                  <p class="score-details__number">5</p>
                  <i class="fa-solid fa-star score-details__star"></i>
                  <span class="score-details__rectangle"></span>
                </div>
                <div class="score-details__row">
                  <p class="score-details__number">4</p>
                  <i class="fa-solid fa-star score-details__star"></i>
                  <span class="score-details__rectangle"></span>
                </div>
                <div class="score-details__row">
                  <p class="score-details__number">3</p>
                  <i class="fa-solid fa-star score-details__star"></i>
                  <span class="score-details__rectangle"></span>
                </div>
                <div class="score-details__row">
                  <p class="score-details__number">2</p>
                  <i class="fa-solid fa-star score-details__star"></i>
                  <span class="score-details__rectangle"></span>
                </div>
                <div class="score-details__row">
                  <p class="score-details__number">&nbsp;1</p>
                  <i class="fa-solid fa-star score-details__star"></i>
                  <span class="score-details__rectangle"></span>
                </div>
              </div>
              <a href="#!" class="info-rate__rate-input">Đánh giá</a>
            </div>
          </div>
        </div>`,
    };
    const productItemDiv = document.getElementById("products-main");
    productItemDiv.innerHTML = productItemForm["item"];
  }
}
export function getProductItemInfo() {
  let array = document.querySelectorAll(".main-products__item");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      const productItemKey = parseInt(
        event.currentTarget.getAttribute("data-product")
      );
      if (productItemKey >= 0) {
        // Vị trí của sản phẩm trong mảng là stt (number) - 1
        updateProductItem(productItemKey - 1);
      }
    });
  });
}
