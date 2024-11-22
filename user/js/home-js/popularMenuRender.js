import { clickToPopularMenu } from "./homePageEvents.js";
import { popularMenuArray } from "../common-js/database.js";

export function renderPopularMenuList() {
  const menuContainer = document.querySelector(".popular-menu__list");
  if (!menuContainer) return;

  // Quy chưa hiểu tại sao phải lấy từ locale về ?
  // let productData = JSON.parse(localStorage.getItem("saleProductData"));

  // if (!productData) {
  //   productData = popularMenuArray; // Sử dụng mảng mặc định
  //   localStorage.setItem("saleProductData", JSON.stringify(productData)); // Lưu vào `localStorage`
  // }

  let menusHTML = "";

  popularMenuArray.forEach((product) => {
    menusHTML += `
        <div class="popular-menu__item" data-popular-menu="${product.categoryID}">
            <figure class="popular-menu__media">
                <img
                    src="${product.src}"
                    alt=""
                    class="popular-menu__image"
                />
            </figure>
            <p class="popular-menu__label">${product.label}</p>
        </div>
    `;
  });

  menuContainer.innerHTML = menusHTML;
  clickToPopularMenu();
}

window.addEventListener("load", () => {
  renderPopularMenuList();
});
