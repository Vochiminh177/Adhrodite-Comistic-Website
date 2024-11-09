import { formatVietNamMoney } from "../common-js/common.js";
import {
  productItemArray,
  productItemAddedToShoppingCart,
  usersList,
} from "../../../database/database.js";
import { comebackProductList } from "./getProductList.js";
import { create_notification_user } from "../home-js/changeUserFormInMenuHeader.js";

let productItemQuantity = 0;

// Hàm thay đổi số lượng sản phẩm trước khi thêm vào Giỏ hàng
function changeProductItemQuantity() {
  let number = document.querySelector(".main-order__number");

  // Nếu người dùng nhấn vào nút tăng/giảm
  let array = document.querySelectorAll(".main-order__count-button");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      // Loại bỏ đi các giá trị mặc định
      event.preventDefault();

      // Lấy ra nội dung mà nút hiển thị
      const countButtonKey = event.currentTarget.textContent;
      if (countButtonKey == "+") {
        productItemQuantity++;
      } else {
        if (productItemQuantity >= 2) {
          productItemQuantity--;
        }
      }
      number.value = `${productItemQuantity}`;
    });
  });

  // Nếu người dùng nhập vào số lượng sản phẩm
  document
    .querySelector(".main-order__number")
    .addEventListener("input", function () {
      productItemQuantity = number.value;
    });
}

// Hàm để thêm sản phẩm hiện tại vào Giỏ hàng
function addProductItemToShoppingCart(productItemKey) {
  document
    .querySelector(".main-order__add-to-shopping-cart-button")
    .addEventListener("click", function () {
      //lấy vị trí người dùng đang đăng nhập để lấy giỏ hàng
      let userList = JSON.parse(localStorage.getItem("userList"));
      let index_user_status_login = -1;
      userList.forEach((obj, index) => {
        if(obj.status_login){
          index_user_status_login = index;
        }
      });

      if(index_user_status_login < 0){
        create_notification_user("Bạn chưa đăng nhập!")
      }
      else{
        // lấy danh sách sản phẩm trên local
        let productList = JSON.parse(localStorage.getItem("productList")) || [];
        if(productList.length == 0){
          productList = [...productItemArray];
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let isExistingProductItem = false;
        let indexProductItem = -1;
        for (let i = 0; i < userList[index_user_status_login].shoppingCart.length; i++) {
          if (userList[index_user_status_login].shoppingCart[i].id === productList[productItemKey].id) {
            isExistingProductItem = true;
            indexProductItem = i;
            break;
          }
        }
      
        // console.log(userList[index_user_status_login].shoppingCart[indexProductItem]);
        if (isExistingProductItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          userList[index_user_status_login].shoppingCart[indexProductItem].quantity += 1;
        } else {
          // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng là 1
          userList[index_user_status_login].shoppingCart.push({
            id: productList[productItemKey].id,
            src: productList[productItemKey].src,
            name: productList[productItemKey].name,
            price: productList[productItemKey].price,
            quantity: productItemQuantity,
            category: productList[productItemKey].category,
          });
        }


        localStorage.setItem("userList", JSON.stringify(userList));
        create_notification_user("Đã thêm vào giỏ hàng!");
      }
    });
}

// Hàm trở về trang chứa danh sách sản phẩm trước đó
function clickToComebackProductList() {
  document
    .querySelector(".main-order__comeback-button")
    .addEventListener("click", function () {
      // Đưa về đầu trang
      window.scrollTo(0, 0);

      // Trở về phần Danh sách sản phẩm
      comebackProductList();
    });
}

// Thông tin của một sản phẩm cụ thể
export function updateProductItem(productItemKey) {
  // Vị trí của sản phẩm trong mảng là stt (number) - 1
  productItemKey = productItemKey - 1;
  if (productItemArray[productItemKey]) {
    // Đưa về đầu trang
    window.scrollTo(0, 0);

    // Hiển thị chi tiết một sản phẩm
    const productItemForm = {
      item: `
        <div class="main__order">
          <button class="main-order__comeback-button">
            <i class="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
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
                  Danh mục: <b>${productItemArray[productItemKey].category}</b>
                </p>
                <p class="main-order__detail">Giá: <b>${formatVietNamMoney(
                  productItemArray[productItemKey].price
                )}đ</b></p>
                <div class="main-order__row">
                  <p class="main-order__detail">Số lượng: </p>
                  <input type="number" name="quantity" class="main-order__number remove-arrow" value="1"/>
                  <div class="main-order__buttons">
                    <button class="main-order__count-button increment">+</button>
                    <button class="main-order__count-button decrement">-</button>
                  </div>
                </div>
              </div>
              <button
                class="main-order__add-to-shopping-cart-button"
              >
                Thêm giỏ hàng
              </button>
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
                  <span class="score-details__rectangle max-score"></span>
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
              <button class="info-rate__rate-input">Đánh giá</button>
            </div>
          </div>
        </div>`,
    };
    const productItemDiv = document.getElementById("products-main");
    productItemDiv.innerHTML = productItemForm["item"];

    // Khi người dùng nhấn các nút tăng/giảm số lượng sản phẩm
    productItemQuantity = 1;
    changeProductItemQuantity();

    // Khi người dùng nhấn nút "Thêm giỏ hàng"
    addProductItemToShoppingCart(productItemKey);

    // Khi người dùng nhấn nút "Quay lại"
    clickToComebackProductList();
  }
}

// Khi người dùng nhấn vào một sản phẩm bất kỳ trong danh sách sản phẩm ở trang Sản phẩm
export function getProductItemInfo() {
  let array = document.querySelectorAll(".main-products__item");
  array.forEach((obj) => {
    obj.addEventListener("click", function (event) {
      const productItemKey = parseInt(
        event.currentTarget.getAttribute("data-product")
      );
      if (productItemKey >= 0) {
        updateProductItem(productItemKey);
      }
    });
  });
}
