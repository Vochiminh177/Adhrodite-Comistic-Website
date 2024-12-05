window.addEventListener('resize', () => {
  if(window.innerWidth > 900){
    doUpdateSaleProductPagination(3);
  } else
  if(window.innerWidth > 500){
    doUpdateSaleProductPagination(2);
  }else{
    doUpdateSaleProductPagination(1);
  }
});

window.addEventListener('load', () => {
  if(window.innerWidth > 900){
    doUpdateSaleProductPagination(3);
  } else
  if(window.innerWidth > 500){
    doUpdateSaleProductPagination(2);
  }else{
    doUpdateSaleProductPagination(1);
  }
});
// Hàm tạo sự kiện phân trang cho Khuyến mãi
export function updateSaleProductPagination() {

}
function doUpdateSaleProductPagination(quantityAllowToDisplay){
  let productList = JSON.parse(localStorage.getItem("productList")) || [];
  let saleProductList = productList.filter((product) => product.discountQuantity > 0);
  const saleProductHeader = document.querySelector(".sale-product__header");
  if (saleProductHeader) saleProductHeader.innerHTML = "";

  const saleProductLength = saleProductList.length;
  if (saleProductLength > quantityAllowToDisplay) {
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
    let timesNumberAllowToClick = saleProductLength - quantityAllowToDisplay;
    let timesNumberAllowToClickFromLeft = 0;
    let timesNumberAllowToClickFromRight = timesNumberAllowToClick;

    function applyScrollWidth(width, columns, gap){
      saleProductList.style = `transform: translateX(-${
        (timesNumberAllowToClickFromLeft - 1) * (width / columns + gap / columns)
      }px)`;
      document
        .getElementById("sale-product-to-left")
        .onclick = function () {
          if (
            timesNumberAllowToClickFromLeft > 0 &&
            timesNumberAllowToClickFromLeft <= timesNumberAllowToClick
          ) {
            saleProductList.style = `transform: translateX(-${
              (timesNumberAllowToClickFromLeft - 1) * (width / columns + gap / columns)
            }px)`;
            timesNumberAllowToClickFromLeft--;
            timesNumberAllowToClickFromRight++;
          }
        }

      document
        .getElementById("sale-product-to-right")
        .onclick = function () {
          if (
            timesNumberAllowToClickFromRight > 0 &&
            timesNumberAllowToClickFromRight <= timesNumberAllowToClick
          ) {
            saleProductList.style = `transform: translateX(-${
              (timesNumberAllowToClickFromLeft + 1) * (width / columns + gap / columns)
            }px)`;
            timesNumberAllowToClickFromLeft++;
            timesNumberAllowToClickFromRight--;
          }
        }
      }
    const rect = document.querySelector(".sale-product__list").getBoundingClientRect();
    if(quantityAllowToDisplay === 3){
      applyScrollWidth(rect.width, 3, 30);
    } else
    if(quantityAllowToDisplay === 2){
      applyScrollWidth(rect.width, 2, 30);
    } else
    if(quantityAllowToDisplay === 1){
      applyScrollWidth(rect.width, 1, 30);
    }
    
  } else {
    let titleH2 = document.createElement("h2");
    titleH2.className = "sale-product__title";
    titleH2.innerText = "Khuyến mãi";
    saleProductHeader.appendChild(titleH2);
  }
}
