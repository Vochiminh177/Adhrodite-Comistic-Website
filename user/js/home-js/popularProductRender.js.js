import { formatVietNamMoney } from "../common-js/common.js";
import { clickToProductItem } from "./homePageEvents.js";
import { popularProductArray } from "./database.js";
import { updatePopularProductPagination } from "./popularProductPagination.js";

export function renderPopularProductList() {
  const popularProductList = document.querySelector(".popular-product__list");
  if (!popularProductList) return;

  let productsHTML = "";

  popularProductArray.forEach((product) => {
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      if (i < product.starNum) {
        starsHTML += `<i class="fa-solid fa-star yellow"></i>`;
      } else {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      }
    }

    productsHTML += `
      <div class="popular-product__item" data-popular-product="${
        product.categoryID
      }">
        <figure class="popular-product__media">
          <img src="${product.src}" alt="" class="popular-product__image" />
        </figure>
        <div class="popular-product__info">
          <p class="popular-product__detail-brand"><b>${product.brand}</b></p>
          <h3 class="popular-product__name line-clamp">${product.name}</h3>
          <div class="starContainer">
            ${starsHTML}
            <p class="danhGia">(${product.review_Count} đánh giá)</p>
          </div>
          <p class="popular-product__detail" style="display: none;">
            Danh mục: <b>${product.category}</b>
          </p>
          <div class="popular-product__price-container">
            <p class="popular-product__detail-price"><b>${formatVietNamMoney(
              product.price
            )}đ</b></p> 
            <p class="popular-product__detail-bottle"> / ${product.Bottle}</p>
          </div>
          <button
            href="javascript:void(0)"
            class="popular-product__add-to-shopping-cart button-word"
            data-id="${product.id}"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>`;
  });

  popularProductList.innerHTML = productsHTML;
  clickToProductItem();
  updatePopularProductPagination();

  document
    .querySelectorAll(".popular-product__add-to-shopping-cart")
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation(); // Ngăn chặn nổi bọt để không kích hoạt sự kiện trên phần tử cha
      });

      button.addEventListener("click", function (e) {
        let userList = JSON.parse(localStorage.getItem("userList"));
        let userStatusLoginIndex;
        // Tìm vị trí của người dùng đang đăng nhập
        userList.forEach((user, index) => {
          if (user.status_login) {
            userStatusLoginIndex = index;
          }
        });
        if (userStatusLoginIndex === undefined) {
          alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
          return;
        }
        let id = e.currentTarget.getAttribute("data-id");
        let isExistingProductItem = false;
        let indexProductItem = -1;
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
        const shoppingCart = userList[userStatusLoginIndex].shoppingCart;
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
          const productToAdd = popularProductArray.find(
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
            });
          }
        }
        // Lưu cập nhật giỏ hàng vào `localStorage`
        localStorage.setItem("userList", JSON.stringify(userList));
        alert("Sản phẩm đã được thêm vào giỏ hàng.");
      });
    });
}

window.addEventListener("load", () => {
  renderPopularProductList();
});
