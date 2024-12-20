
import { formatVietNamMoney } from "../common-js/common.js";
import { clickToProductItem } from "./homePageEvents.js";
import { updateSaleProductPagination } from "./saleProductPagination.js";
import { create_notification_user } from "../menuUser/optionMenu.js";

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
  let productList = JSON.parse(localStorage.getItem("productList")) || [];
  
  productList.forEach((product) => {
    if(product.discountQuantity > 0){
      let newPrice = Math.round(product.price - (product.price * product.discountPercent / 100));

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
                  product.discountPercent
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
                  <b class="new">${formatVietNamMoney(newPrice)}đ</b> 
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
      }
  });

  productContainer.innerHTML = productsHTML;
  clickToProductItem();
  updateSaleProductPagination();

  document
    .querySelectorAll(".sale-product__add-to-shopping-cart")
    .forEach((button) => {
      button.onclick = (e) => {
        e.stopPropagation();

        let userList = JSON.parse(localStorage.getItem("userList"));
        let indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"));
  
        if(indexCurrentUserLogin === -1){
          create_notification_user("Bạn chưa đăng nhập");
          return;
        }

        const shoppingCart = userList[indexCurrentUserLogin].shoppingCart;
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

          let productList = JSON.parse(localStorage.getItem("productList"));
          let indexProduct = productList.findIndex((obj) => {
            return obj.id === shoppingCart[indexProductItem].id;
          })
          if(shoppingCart[indexProductItem].quantity > productList[indexProduct].quantity){
            create_notification_user("Hàng tồn không đủ");
            shoppingCart[indexProductItem].quantity = productList[indexProduct].quantity;
            localStorage.setItem("userList", JSON.stringify(userList));
            return;
          }

        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
          const productToAdd = productList.find(
            (product) => product.id === id
          );
          if (productToAdd) {
            shoppingCart.push({
              id: productToAdd.id,
              src: productToAdd.src,
              name: productToAdd.name,
              price: productToAdd.price,
              quantity: 1,
              category: productToAdd.category,
              discountQuantity: productToAdd.discountQuantity,
              discountPercent: productToAdd.discountPercent
            });
          }
        
        
        }
        // Cập nhật `localStorage` với `userList` đã sửa đổi
        localStorage.setItem("userList", JSON.stringify(userList));
        document.querySelector(".header__shopping-cart-notification").style.visibility = "visible";
        create_notification_user("Thêm thành công");
      };
    });
}

window.addEventListener("load", () => {
  renderSaleProductList();
});
