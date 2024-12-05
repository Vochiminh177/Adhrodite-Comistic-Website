import { formatVietNamMoney } from "../common-js/common.js";
import { productItemArray } from "../../../database/database.js";
import { comebackProductList } from "./getProductList.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { generateFilter } from "./generateFilter.js";

let productItemQuantity = 0;

// Hàm tạo giá tiền của sản phẩm đã giảm giá (nếu có)
function createProductPriceByAfterDiscount() {}

// Hàm thay đổi số lượng sản phẩm trước khi thêm vào Giỏ hàng
function changeProductItemQuantity(productList, productItemKey) {
  let number = document.querySelector(".main-order__number");

  // Nếu người dùng nhấn vào nút tăng/giảm
  let array = document.querySelectorAll(".main-order__count");
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

      //css phần giảm giá
      if (productItemQuantity > productList[productItemKey].discountQuantity) {
        const originPrice = document.querySelector(".originPrice");
        originPrice.style.color = "black";
        originPrice.style.fontSize = "2.2rem";
        originPrice.style.textDecoration = "none";

        const discountPrice = document.querySelector(".discountPrice");
        discountPrice.style.color = "#ccc";
        discountPrice.style.fontSize = "1.8rem";
        discountPrice.style.textDecoration = "line-through";
      } else {
        const discountPrice = document.querySelector(".discountPrice");
        discountPrice.style.color = "black";
        discountPrice.style.fontSize = "2.2rem";
        discountPrice.style.textDecoration = "none";

        const originPrice = document.querySelector(".originPrice");
        originPrice.style.color = "#ccc";
        originPrice.style.fontSize = "1.8rem";
        originPrice.style.textDecoration = "line-through";
      }
    });
  });

  // Nếu người dùng nhập vào số lượng sản phẩm
  document
    .querySelector(".main-order__number")
    .addEventListener("input", function () {
      productItemQuantity = number.value;

      //css phần giảm giá
      if (productItemQuantity > productList[productItemKey].discountQuantity) {
        const originPrice = document.querySelector(".originPrice");
        originPrice.style.color = "black";
        originPrice.style.fontSize = "2.2rem";
        originPrice.style.textDecoration = "none";

        const discountPrice = document.querySelector(".discountPrice");
        discountPrice.style.color = "#ccc";
        discountPrice.style.fontSize = "1.8rem";
        discountPrice.style.textDecoration = "line-through";
      } else {
        const discountPrice = document.querySelector(".discountPrice");
        discountPrice.style.color = "black";
        discountPrice.style.fontSize = "2.2rem";
        discountPrice.style.textDecoration = "none";

        const originPrice = document.querySelector(".originPrice");
        originPrice.style.color = "#ccc";
        originPrice.style.fontSize = "1.8rem";
        originPrice.style.textDecoration = "line-through";
      }
    });
}

// Hàm để thêm sản phẩm hiện tại vào Giỏ hàng
function addProductItemToShoppingCart(productItemKey) {
  document
    .querySelector(".main-order__add-to-shopping-cart")
    .addEventListener("click", function () {
      //lấy vị trí người dùng đang đăng nhập để lấy giỏ hàng
      let userList = JSON.parse(localStorage.getItem("userList"));
      let indexCurrentUserLogin =
        JSON.parse(localStorage.getItem("indexCurrentUserLogin")) || -1;

      if (indexCurrentUserLogin < 0) {
        create_notification_user("Bạn chưa đăng nhập!");
      } else {
        // lấy danh sách sản phẩm trên local
        let productList = JSON.parse(localStorage.getItem("productList"));
        let valueOfinputQuantity = parseInt(document.querySelector(".remove-arrow").value);
        if(valueOfinputQuantity > productList[productItemKey].quantity){
          create_notification_user("Hàng tồn không đủ");
          return;
        }
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let isExistingProductItem = false;
        let indexProductItem = -1;
        for (
          let i = 0;
          i < userList[indexCurrentUserLogin].shoppingCart.length;
          i++
        ) {
          if (
            userList[indexCurrentUserLogin].shoppingCart[i].id ===
            productList[productItemKey].id
          ) {
            isExistingProductItem = true;
            indexProductItem = i;
            break;
          }
        }

        // console.log(userList[indexCurrentUserLogin].shoppingCart[indexProductItem]);
        if (isExistingProductItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          userList[indexCurrentUserLogin].shoppingCart[
            indexProductItem
          ].quantity += parseInt(
            document.querySelector(".main-order__number").value,
            10
          );
        } else {
          // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng là 1
          userList[indexCurrentUserLogin].shoppingCart.push({
            id: productList[productItemKey].id,
            src: productList[productItemKey].src,
            name: productList[productItemKey].name,
            price: productList[productItemKey].price,
            quantity: parseInt(productItemQuantity),
            category: productList[productItemKey].category,
            discountQuantity: productList[productItemKey].discountQuantity,
            discountPercent: productList[productItemKey].discountPercent,
          });
        }

        localStorage.setItem("userList", JSON.stringify(userList));
        create_notification_user("Đã thêm vào giỏ hàng!");
      }
    });
}

// Hàm trở về trang chứa danh sách sản phẩm trước đó
function clickToComebackProductList(currentPage) {
  document
    .querySelector(".main-order__comeback")
    .addEventListener("click", function () {
      // Đưa về đầu trang
      window.scrollTo(0, 0);

      // Thiết lập lại bộ lọc
      generateFilter();

      // Trở về phần Danh sách sản phẩm
      comebackProductList(currentPage);
    });
}

// Thông tin của một sản phẩm cụ thể
export function updateProductItem(productItemKey) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  // Vị trí của sản phẩm trong mảng là stt (number) - 1
  productItemKey = productItemKey - 1;
  let newPrice = productList[productItemKey].price;
  if (productList[productItemKey].discountQuantity > 0) {
    newPrice =
      productList[productItemKey].price -
      (productList[productItemKey].price *
        productList[productItemKey].discountPercent) /
        100;
  }
  if (productList[productItemKey]) {
    // Đưa về đầu trang
    window.scrollTo(0, 0);

    // Hiển thị chi tiết một sản phẩm
    const productItemForm = {
      item: `
        <div class="main__order">
          <button class="main-order__comeback">
            <i class="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          <div class="main-order__body">
            <div class="main-order__media">
              <img
                src=${productList[productItemKey].src}
                alt=""
                class="main-order__image"
              />
            </div>
            <div class="main-order__content">
              <h2 class="main-order__product-title">
              ${productList[productItemKey].name}
              </h2>
              <div class="main-order__details">
                <p class="main-order__detail">
                  Mã sản phẩm: <b>${productList[productItemKey].id}</b>
                </p>
                <p class="main-order__detail">
                  Hãng: <b>${productList[productItemKey].brand}</b>
                </p>
                <p class="main-order__detail">
                  Danh mục: <b>${productList[productItemKey].category}</b>
                </p>
                <p class="main-order__detail">Giá: <b class="originPrice">${formatVietNamMoney(
                  productList[productItemKey].price
                )}đ</b> <b class="discountPrice">${formatVietNamMoney(
        newPrice
      )}đ (-${productList[productItemKey].discountPercent}%)</b></p>
                <div class="main-order__row">
                  <p class="main-order__detail">Số lượng: </p>
                  <input type="number" name="quantity" class="main-order__number remove-arrow" value="1"/>
                  <div class="main-order__buttons">
                    <button class="main-order__count increment">+</button>
                    <button class="main-order__count decrement">-</button>
                  </div>
                  <p class="quantity-details" style="font-size: 2.2rem; margin-left: 5%;">SL: ${productList[productItemKey].quantity}</p>
                </div>
              </div>
              <button
                class="main-order__add-to-shopping-cart"
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
            ${productList[productItemKey].desc}
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
    let currentPageEle = document.querySelector(
      ".main-products__number.active"
    );
    let currentPage = 1;
    if (currentPageEle) {
      currentPage = parseInt(currentPageEle.getAttribute("data-page"), 10);
    }
    const productItemDiv = document.getElementById("products-main");
    productItemDiv.innerHTML = productItemForm["item"];

    // function addHr(tagP){
    //   let hr = document.createElement("hr");
    //   document.querySelector(tagP).appendChild(hr);
    //   document.querySelector(tagP).style.position = "relative";
    //   document.querySelector(tagP).style.color = "#ccc";
    //   hr.style.position = "absolute";
    //   hr.style.border = "1px solid #ccc";
    //   hr.style.top = "5%";
    //   hr.style.width = "50%";
    // }
    //css phần giá giảm
    if (productList[productItemKey].discountQuantity <= 0) {
      document.querySelector(".discountPrice").style.display = "none";
    } else {
      const originPrice = document.querySelector(".originPrice");
      originPrice.style.color = "#ccc";
      originPrice.style.fontSize = "1.8rem";
      originPrice.style.textDecoration = "line-through";
    }

    // Khi người dùng nhấn các nút tăng/giảm số lượng sản phẩm
    productItemQuantity = 1;
    changeProductItemQuantity(productList, productItemKey);

    // Khi người dùng nhấn nút "Thêm giỏ hàng"
    addProductItemToShoppingCart(productItemKey);

    // Khi người dùng nhấn nút "Quay lại"
    clickToComebackProductList(currentPage);
  }
}

// Khi người dùng nhấn vào một sản phẩm bất kỳ trong danh sách sản phẩm ở trang Sản phẩm
export function getProductItemInfo() {
  let array = document.querySelectorAll(".main-products__item");
  array.forEach((obj) => {
    obj.onclick = (event) => {
      const productItemKey = parseInt(
        event.currentTarget.getAttribute("data-product")
      );
      if (productItemKey >= 0) {
        updateProductItem(productItemKey);
      }
    };
  });
}
