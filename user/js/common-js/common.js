import { productItemAddedToShoppingCart } from "../../../database/database.js";

// Hàm xoá dấu
export function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Xoá các thẻ <style> đã tồn tại từ trước đó
export function removeAllStyleTags() {
  document.querySelectorAll("head style").forEach((styleTag) => {
    styleTag.remove();
  });
}

// Hàm cập nhật lại style cho navbar
export function updateNavbarStyle(mainContentKey) {
  // Xoá tất cả thẻ <style> hiện có
  removeAllStyleTags();

  // Đặt lại style mới cho navbarStyle
  const navbarStyle = document.createElement("style");
  navbarStyle.className = "navbar-style";
  navbarStyle.innerHTML = `
    .header-navbar__action#${mainContentKey} {
      color: #fff;
      text-shadow: 1px 0 0 currentColor;
    }
    .header-navbar__action:not(#${mainContentKey}) {
      color: #dbd7d7;
      text-shadow: none;
    }
    .header-navbar__action:not(#${mainContentKey}):hover {
      color: #fff;
      text-shadow: 1px 0 0 currentColor;
    }
  `;
  document.head.appendChild(navbarStyle);
}

// Hàm định dạng việc hiển thị tiền VNĐ
export function formatVietNamMoney(money) {
  let format = String(money).split("").reverse();
  let count = 0;
  for (let i = 0; i < format.length; i++) {
    if (++count === 4) {
      format.splice(i, 0, ".");
      count = 0;
    }
  }
  return format.reverse().join("");
}

// Hàm tính tổng số tiền của các sản phẩm hiện có trong productItemAddedToShoppingCart
export function calTotalProductItemPriceInShoppingCart() {
  let totalPrice = 0;
  productItemAddedToShoppingCart.forEach((productItem) => {
    if (productItem.quantity >= 1)
      totalPrice += productItem.price * productItem.quantity;
  });
  return totalPrice;
}
