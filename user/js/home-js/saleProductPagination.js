let previousAmountOfSaleProducts = -1;
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
// Tạo sự kiện để có thể chuyển qua lại các sản phẩm
let timesNumberAllowToClick = -1
let timesNumberAllowToClickFromLeft = -1;
let timesNumberAllowToClickFromRight = -1;

// Hàm tạo sự kiện phân trang cho Khuyến mãi
export function updateSaleProductPagination() {}

function doUpdateSaleProductPagination(quantityAllowToDisplay){
  const saleProductHeader = document.querySelector(".sale-product__header");
  const saleProductList = document.querySelector(".sale-product__list");

  if(!saleProductHeader || !saleProductList) return;
  let productList = JSON.parse(localStorage.getItem("productList")) || [];
  let saleProducts = productList.filter((product) => product.discountQuantity > 0);

  const saleProductLength = saleProducts.length;
  if (saleProductLength > quantityAllowToDisplay) {
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
    saleProductHeader.innerHTML = "";
    saleProductHeader.appendChild(arrowLeftButton);
    saleProductHeader.appendChild(titleH2);
    saleProductHeader.appendChild(arrowRightButton);

    function applyScrollWidth(width, columns, gap){
      
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
      if(previousAmountOfSaleProducts !== 3){
        // Tạo sự kiện để có thể chuyển qua lại các sản phẩm
        saleProductList.style = `transform: translateX(0px)`;
        previousAmountOfSaleProducts = 3;
        timesNumberAllowToClick = saleProductLength - quantityAllowToDisplay;
        timesNumberAllowToClickFromLeft = 0;
        timesNumberAllowToClickFromRight = timesNumberAllowToClick;
      }
      applyScrollWidth(rect.width, 3, 30);
    } else
    if(quantityAllowToDisplay === 2){
      if(previousAmountOfSaleProducts !== 2){
        // Tạo sự kiện để có thể chuyển qua lại các sản phẩm
        saleProductList.style = `transform: translateX(0px)`;
        previousAmountOfSaleProducts = 2;
        timesNumberAllowToClick = saleProductLength - quantityAllowToDisplay;
        timesNumberAllowToClickFromLeft = 0;
        timesNumberAllowToClickFromRight = timesNumberAllowToClick;
      }
      applyScrollWidth(rect.width, 2, 30);
    } else
    if(quantityAllowToDisplay === 1){
      if(previousAmountOfSaleProducts !== 1){
        // Tạo sự kiện để có thể chuyển qua lại các sản phẩm
        saleProductList.style = `transform: translateX(0px)`;
        previousAmountOfSaleProducts = 1;
        timesNumberAllowToClick = saleProductLength - quantityAllowToDisplay;
        timesNumberAllowToClickFromLeft = 0;
        timesNumberAllowToClickFromRight = timesNumberAllowToClick;
      }
      applyScrollWidth(rect.width, 1, 30);
    }
    
  } else {
    let titleH2 = document.createElement("h2");
    titleH2.className = "sale-product__title";
    titleH2.innerText = "Khuyến mãi";
    saleProductHeader.appendChild(titleH2);
  }
}

export function updateSaleProductPaginationWhenChangeToHome(){
  timesNumberAllowToClick = -1
  timesNumberAllowToClickFromLeft = -1;
  timesNumberAllowToClickFromRight = -1;
  previousAmountOfSaleProducts = -1;
  if(window.innerWidth > 900){
    doUpdateSaleProductPagination(3);
  } else
  if(window.innerWidth > 500){
    doUpdateSaleProductPagination(2);
  }else{
    doUpdateSaleProductPagination(1);
  }
}
