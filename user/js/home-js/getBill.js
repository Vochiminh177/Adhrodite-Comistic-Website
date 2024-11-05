import { productItemAddedToShoppingCart as productItemAddedArray } from "../../../database/database.js";

// Hàm cập nhật thông tin hoá đơn
function updateBill() {}

export function getBillInfo(currentPage) {
  document
    .querySelector(".payment-information-info__submit")
    .addEventListener("click", function () {
      // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
      updateBill();
    });
}
