import { formatVietNamMoney } from "../common-js/common.js";
import { salePopularProductArray } from "../common-js/database.js";
import { clickToProductItem } from "./homePageEvents.js";
import { updateSaleProductPagination } from "./saleProductPagination.js";

export function renderSaleProductList() {
  const productContainer = document.querySelector(".sale-product__list");
  if (!productContainer) return;

  // Quy chưa hiểu tại sao phải lấy từ locale về ?
  // let productData = JSON.parse(localStorage.getItem("saleProductData"));

  // if (!productData) {
  //   productData = saleProductArray; // Sử dụng mảng mặc định
  //   localStorage.setItem("saleProductData", JSON.stringify(productData)); // Lưu vào `localStorage`
  // }

  let productsHTML = "";

  salePopularProductArray.forEach((product) => {
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      starsHTML += `<i class="fa-solid fa-star ${
        i < product.starNum ? "yellow" : ""
      }"></i>`;
    }

    productsHTML += `
          <div class="sale-product__item" data-popular-product="${
            product.categoryID
          }">
            <figure class="sale-product__media">
              <div class="sale-product__item-percent"> -${
                product.percent * 100
              }%</div> 
              <img src="${product.src}" alt="" class="sale-product__image" />
            </figure>
            <div class="sale-product__info">
              <h3 class="sale-product__name line-clamp">${product.name}</h3>
              <p class="sale-product__price">
                Giá cũ:
                <b class="old"><del>${formatVietNamMoney(
                  product.price
                )}<sub>đ</sub></del></b></br>
                Giá mới: 
                <b class="new">${formatVietNamMoney(
                  product.price * (1 - product.percent)
                )}đ</b> 
              </p>
              <button
                href="javascript:void(0)"
                class="sale-product__add-to-shopping-cart button-word"
                data-id="${product.id}"
              >
                Thêm&nbsp;giỏ&nbsp;hàng
              </button>
            </div>
          </div>`;
  });

  productContainer.innerHTML = productsHTML;
  clickToProductItem();
  updateSaleProductPagination();

  document
    .querySelectorAll(".sale-product__add-to-shopping-cart")
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();

        let userList = JSON.parse(localStorage.getItem("userList"));
        let userStatusLoginIndex;

        // Tìm người dùng đang đăng nhập
        userList.forEach((user, index) => {
          if (user.status_login) {
            userStatusLoginIndex = index;
          }
        });

        // Nếu không có người dùng đăng nhập
        if (userStatusLoginIndex === undefined) {
          alert("Bạn cần đăng nhập để đặt hàng.");
          return; // Dừng lại nếu chưa đăng nhập
        }

        const shoppingCart = userList[userStatusLoginIndex].shoppingCart;
        const id = e.currentTarget.getAttribute("data-id");
        let isExistingProductItem = false;
        let indexProductItem = -1;

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].id === id) {
            isExistingProductItem = true;
            indexProductItem = i;
            break;
          }
        }

        if (isExistingProductItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          shoppingCart[indexProductItem].quantity += 1;
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
          const productToAdd = salePopularProductArray.find(
            (product) => product.id === id
          );
          if (productToAdd) {
            shoppingCart.push({
              id: productToAdd.id,
              src: productToAdd.src,
              name: productToAdd.name,
              price: productToAdd.price * (1 - productToAdd.percent),
              quantity: 1,
              category: productToAdd.category,
            });
          }
        }

        // Cập nhật `localStorage` với `userList` đã sửa đổi
        localStorage.setItem("userList", JSON.stringify(userList));
        alert("Sản phẩm đã được thêm vào giỏ hàng.");
      });
    });
}

window.addEventListener("load", () => {
  renderSaleProductList();
});
