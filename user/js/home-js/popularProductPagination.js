import { popularProductArray } from "../common-js/database.js";

export function updatePopularProductPagination() {
  const popularProductLength = popularProductArray.length;
  if (popularProductLength >= 5) {
    const popularProductHeader = document.querySelector(
      ".popular-product__header"
    );
    const popularProductList = document.querySelector(".popular-product__list");

    // Tạo các icon để có thể chuyển trang khi có 5 sản phẩm nổi bật
    let arrowLeftButton = document.createElement("button");
    arrowLeftButton.id = "popular-product-to-left";
    arrowLeftButton.className = "popular-product__to-left button-word";
    arrowLeftButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    let arrowRightButton = document.createElement("button");
    arrowRightButton.id = "popular-product-to-right";
    arrowRightButton.className = "popular-product__to-right button-word";
    arrowRightButton.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    let paginationDiv = document.createElement("div");
    paginationDiv.className = "popular-product__pagination";
    paginationDiv.appendChild(arrowLeftButton);
    paginationDiv.appendChild(arrowRightButton);
    popularProductHeader.appendChild(paginationDiv);

    // Tạo sự kiện để có thể chuyển qua lại các sản phẩm (mặc định cho phép hiển thị 4 sản phẩm)
    let timesNumberAllowToClick = popularProductLength - 4;
    let timesNumberAllowToClickFromLeft = 0;
    let timesNumberAllowToClickFromRight = timesNumberAllowToClick;

    document
      .getElementById("popular-product-to-left")
      .addEventListener("click", function () {
        if (
          timesNumberAllowToClickFromLeft > 0 &&
          timesNumberAllowToClickFromLeft <= timesNumberAllowToClick
        ) {
          popularProductList.style = `transform: translateX(-${
            (timesNumberAllowToClickFromLeft - 1) * 288
          }px)`;
          timesNumberAllowToClickFromLeft--;
          timesNumberAllowToClickFromRight++;
        }
      });

    document
      .getElementById("popular-product-to-right")
      .addEventListener("click", function () {
        if (
          timesNumberAllowToClickFromRight > 0 &&
          timesNumberAllowToClickFromRight <= timesNumberAllowToClick
        ) {
          popularProductList.style = `transform: translateX(-${
            (timesNumberAllowToClickFromLeft + 1) * 288
          }px)`;
          timesNumberAllowToClickFromLeft++;
          timesNumberAllowToClickFromRight--;
        }
      });
  } else {
    const paginationDivExisting = document.querySelector(
      ".popular-product__pagination"
    );
    if (paginationDivExisting) paginationDivExisting.remove();
  }
}
