document
  .getElementById("see-filter-menu")
  .addEventListener("click", function () {
    // Kiểm tra thẻ mainProductsExistingStyle có tồn tại hay không và xoá đi
    const mainProductsExistingStyle = document.querySelector(
      ".main-products-style"
    );
    if (mainProductsExistingStyle) {
      mainProductsExistingStyle.remove();
    }
    // Thêm style mới cho mainProductsExistingStyle (liên quan đến thuộc tính sticky)
    let mainProductsStyle = document.createElement("style");
    mainProductsStyle.className = "main-products-style";

    // ...
    const filterMenu = document.getElementById("filter-menu");
    if (getComputedStyle(filterMenu).getPropertyValue("display") === "none") {
      mainProductsStyle.innerHTML = `
        .body__products .products__main {
          position: sticky;
          top: -212px;
        }
      `;
      filterMenu.style.display = "block";
    } else {
      mainProductsStyle.innerHTML = `
      .body__products .products__left {
        position: sticky;
        top: 112px;
      }
      `;
      filterMenu.style.display = "none";
    }
    document.head.appendChild(mainProductsStyle);
  });
