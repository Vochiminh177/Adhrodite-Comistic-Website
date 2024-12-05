import { popularProductArray } from "../common-js/database.js";

export function updatePopularProductPagination() {}

window.addEventListener('resize', () => {
  if(window.innerWidth > 1000){
    doUpdatePopularProductPagination(4);
  } else
  if(window.innerWidth > 725){
    doUpdatePopularProductPagination(3);
  } else
  if(window.innerWidth > 500){
    doUpdatePopularProductPagination(2);
  } else{
    doUpdatePopularProductPagination(1);
  }
});

window.addEventListener('load', () => {
  if(window.innerWidth > 1000){
    doUpdatePopularProductPagination(4);
  } else
  if(window.innerWidth > 725){
    doUpdatePopularProductPagination(3);
  } else
  if(window.innerWidth > 500){
    doUpdatePopularProductPagination(2);
  } else{
    doUpdatePopularProductPagination(1);
  }
});
function doUpdatePopularProductPagination(quantityAllowToDisplay){
  const popularProductLength = popularProductArray.length;
  if (popularProductLength > quantityAllowToDisplay) {
    const popularProductHeader = document.querySelector(
      ".popular-product__header"
    );
    const popularProductList = document.querySelector(".popular-product__list");
    if(!popularProductHeader || !popularProductList) return;

    let h2 = document.createElement("h2");
    h2.classList.add("popular-product__title");
    h2.classList.add("heading-lv2");
    h2.textContent = "Các sản phẩm nổi bật";

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
    popularProductHeader.innerHTML = "";
    popularProductHeader.appendChild(h2);
    popularProductHeader.appendChild(paginationDiv);

    // Tạo sự kiện để có thể chuyển qua lại các sản phẩm (mặc định cho phép hiển thị 4 sản phẩm)
    let timesNumberAllowToClick = popularProductLength - quantityAllowToDisplay;
    let timesNumberAllowToClickFromLeft = 0;
    let timesNumberAllowToClickFromRight = timesNumberAllowToClick;

    function applyScrollWidth(width, columns, gap){
      popularProductList.style = `transform: translateX(-${
        (timesNumberAllowToClickFromLeft - 1) * (width / columns - gap + gap / columns + gap)
      }px)`;
      document
      .getElementById("popular-product-to-left")
      .onclick = function () {
        if (
          timesNumberAllowToClickFromLeft > 0 &&
          timesNumberAllowToClickFromLeft <= timesNumberAllowToClick
          ) {
            popularProductList.style = `transform: translateX(-${
            (timesNumberAllowToClickFromLeft - 1) * (width / columns + gap / columns)
          }px)`;
          timesNumberAllowToClickFromLeft--;
          timesNumberAllowToClickFromRight++;
        }
      }

      document
        .getElementById("popular-product-to-right")
        .onclick = function () {
          if (
            timesNumberAllowToClickFromRight > 0 &&
            timesNumberAllowToClickFromRight <= timesNumberAllowToClick
          ) {
            popularProductList.style = `transform: translateX(-${
              (timesNumberAllowToClickFromLeft + 1) * (width / columns + gap / columns)
            }px)`;
            timesNumberAllowToClickFromLeft++;
            timesNumberAllowToClickFromRight--;
          }
        }
      }
    const rect = document.querySelector(".popular-product__list").getBoundingClientRect();
    if(quantityAllowToDisplay === 4){
      applyScrollWidth(rect.width, 4, 24);
    } else
    if(quantityAllowToDisplay === 3){
      applyScrollWidth(rect.width, 3, 24);
    } else
    if(quantityAllowToDisplay === 2){
      applyScrollWidth(rect.width, 2, 24);
    } else
    if(quantityAllowToDisplay === 1){
      applyScrollWidth(rect.width, 1, 24);
    }

  } else {
    const paginationDivExisting = document.querySelector(
      ".popular-product__pagination"
    );
    if (paginationDivExisting) paginationDivExisting.remove();
  }
}