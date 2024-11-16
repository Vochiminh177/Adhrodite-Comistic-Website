import { salePopularProductArray } from "./database.js";

export function updateSaleProductPagination() {
  const saleProductHeader = document.querySelector(".sale-product__header");
  if (saleProductHeader) saleProductHeader.innerHTML = "";

  const saleProductLength = salePopularProductArray.length;
  if (saleProductLength >= 4) {
    const saleProductList = document.querySelector(".sale-product__list");
    // Tạo các phần tử trong header của sale-product
    let arrowLeftButton = document.createElement("button");
    arrowLeftButton.id = "sale-product-to-left";
    arrowLeftButton.className = "sale-product__to-left button-word";
    arrowLeftButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    let titleH2 = document.createElement("h2");
    titleH2.className = "sale-product__title";
    titleH2.innerText = "Khuyến mãi";
    let arrowRightButton = document.createElement("button");
    arrowRightButton.id = "sale-product-to-right";
    arrowRightButton.className = "sale-product__to-right button-word";
    arrowRightButton.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    saleProductHeader.appendChild(arrowLeftButton);
    saleProductHeader.appendChild(titleH2);
    saleProductHeader.appendChild(arrowRightButton);

    // Tạo sự kiện để có thể chuyển qua lại các sản phẩm (mặc định cho phép hiển thị 4 sản phẩm)
    let timesNumberAllowToClick = saleProductLength - 3;
    let timesNumberAllowToClickFromLeft = 0;
    let timesNumberAllowToClickFromRight = timesNumberAllowToClick;

    document
      .getElementById("sale-product-to-left")
      .addEventListener("click", function () {
        if (
          timesNumberAllowToClickFromLeft > 0 &&
          timesNumberAllowToClickFromLeft <= timesNumberAllowToClick
        ) {
          saleProductList.style = `transform: translateX(-${
            (timesNumberAllowToClickFromLeft - 1) * 386
          }px)`;
          timesNumberAllowToClickFromLeft--;
          timesNumberAllowToClickFromRight++;
        }
      });

    document
      .getElementById("sale-product-to-right")
      .addEventListener("click", function () {
        if (
          timesNumberAllowToClickFromRight > 0 &&
          timesNumberAllowToClickFromRight <= timesNumberAllowToClick
        ) {
          saleProductList.style = `transform: translateX(-${
            (timesNumberAllowToClickFromLeft + 1) * 386
          }px)`;
          timesNumberAllowToClickFromLeft++;
          timesNumberAllowToClickFromRight--;
        }
      });
  } else {
    let titleH2 = document.createElement("h2");
    titleH2.className = "sale-product__title";
    titleH2.innerText = "Khuyến mãi";
    saleProductHeader.appendChild(titleH2);
  }
}
