import { productItemAddedToShoppingCart } from "./database.js";

// Hàm xoá dấu
export function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm tìm tất cả các thẻ <style> trong <head> và xóa chúng
export function removeAllStyleTags() {
  document.querySelectorAll("head style").forEach((styleTag) => {
    styleTag.remove();
  });
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
