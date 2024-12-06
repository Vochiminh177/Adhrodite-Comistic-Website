import { formatVietNamMoney } from "../../../user/js/common-js/common.js";
import { showListOrder, pagination} from "../showList/show.js"
import { getDistrictOfOrder } from "./orderFilter.js";
import { changeOrderStatusQuantity } from "./orderStatistic.js"
// Tạo ra các đơn hàng tóm tắt, chưa chi tiết
export function createOrderRow(order) {
  const trEle = document.querySelector(".content-order-table-body");
  trEle.innerHTML += `
    <tr>
      <td>${order.orderId}</td>
      <td>${order.customerId}</td>
      <td>
        <p>${order.orderDate.split(" ")[1]}</p>
        <p>${order.orderDate.split(" ")[0]}</p>
      </td>
      <td>${getDistrictOfOrder(order)}</td>
      <td>${formatVietNamMoney(order.orderTotalPrice)}</td>
      <td>
        <div class="status-label ${order.orderStatus}">
          <span>${translateOrderStatus(order.orderStatus)}</span>
        </div>
      </td>
      <td><a href="#" class="details-btn"><i class='bx bx-list-ul'></i></a></td>
    </tr>
  `;
}

// Gán các sự kiện cho đơn hàng
// Ẩn / hiện chi tiết đơn hàng, đổi tình trạng đơn hàng
export function generateOrderEvents(start, end, orderList) {
  // Tạo sự kiện xem chi tiết đơn hàng
  const detailEles = document.querySelectorAll(".details-btn");
  detailEles.forEach((ele, idx) => {
    ele.addEventListener("click", (event) => {
      event.preventDefault();
      const orderIndex = idx + start;
      showOrderDetails(orderList[orderIndex]);
      generateOrderButtonsEvents(orderIndex);
    });
  });

  // Đóng modal khi nhấn vào nút tắt
  const closeModalBtn = document.querySelector(".close-btn");
  closeModalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    closeOrderDetails();
  });

  // Đóng modal khi nhấn vào bên ngoài modal-content
  const modal = document.getElementById("order-details-modal");
  modal.onclick = (event) => {
    if (event.target.matches(".modal")) {
      modal.style.display = "none";
    }
  };

  // Tạo sự kiện cho các nút in, xác nhận, huỷ, xác nhận đã giao
  function generateOrderButtonsEvents(orderIndex) {
    const confirmBtn = document.querySelector(".order-confirm-btn");
    const cancelBtn = document.querySelector(".order-cancel-btn");
    const shippedBtn = document.querySelector(".order-shipped-btn");
    const deleteBtn = document.querySelector(".order-delete-btn");
    if (confirmBtn) {
      confirmBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "accepted");
        document.querySelector(".order-details-modal-content").scrollTo(0, 0);
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "canceled");
        document.querySelector(".order-details-modal-content").scrollTo(0, 0);
      };

      const productList = JSON.parse(localStorage.getItem("productList"));
      const orderedProducts = orderList[orderIndex].orderProduct;
      orderedProducts.forEach((orderedProduct) => {
        const toRestoreIndex = productList.findIndex((product) => orderedProduct.id === product.id);
        if (toRestoreIndex !== -1) {
          productList[toRestoreIndex].discountQuantity += Math.min(
            orderedProduct.discountQuantity,
            orderedProduct.quantity
          );
          
          productList[toRestoreIndex].quantity +=
            orderedProduct.quantity -
            Math.min(orderedProduct.discountQuantity, orderedProduct.quantity);
        }
      });
      localStorage.setItem("productList", JSON.stringify(productList));
    }

    if (shippedBtn) {
      shippedBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "shipped");
        document.querySelector(".order-details-modal-content").scrollTo(0, 0);
      };
    }

    if(deleteBtn){
      deleteBtn.onclick = (event) => {
        event.preventDefault();
        const localStorageOrderList = JSON.parse(localStorage.getItem("orderList"));
        const toDeleteIndex = localStorageOrderList.findIndex(
          (order) => orderList[orderIndex].orderId === order.orderId
        );

        if(toDeleteIndex !== -1){
          localStorageOrderList.splice(toDeleteIndex, 1);
          // orderList.splice(toDeleteIndex, 1);
          localStorage.setItem("orderList", JSON.stringify(localStorageOrderList));
          pagination(localStorageOrderList, 1, showListOrder, "#main-content-order");
          document.getElementById("order-details-modal").style.display = "none";
          changeOrderStatusQuantity();
        }
      }

    }
  }

  // Cập nhật lại tình trạng đơn hàng
  // Tham số orderIndex để tạo lại chi tiết đơn hàng orderList[orderIndex]
  // Thâm số newStatus tình trạng mới của đơn hàng
  function updateOrderStatus(orderIndex, newStatus) {
    const modalStatusLabel = document.querySelector(
      ".order-header .status-label"
    );

    modalStatusLabel.classList.remove(modalStatusLabel.classList[0]);
    modalStatusLabel.classList.remove(modalStatusLabel.classList[1]);
    modalStatusLabel.classList.add("status-label");
    modalStatusLabel.classList.add(`${newStatus}`);
    modalStatusLabel.innerHTML = `${translateOrderStatus(newStatus)}`;

    orderList[orderIndex].orderStatus = newStatus;
    localStorage.setItem("orderList", JSON.stringify(orderList));
    showListOrder(start, end, 0, orderList);
    createOrderDetails(orderList[orderIndex]);
    changeOrderStatusQuantity();
    generateOrderButtonsEvents(orderIndex);
  }
}

// Hiện lên chi tiết đơn hàng, modal-content
function showOrderDetails(order) {
  createOrderDetails(order);
  const modal = document.getElementById("order-details-modal");
  modal.style.display = "block";
}

// Ẩn chi tiết đơn hàng, modal-content
function closeOrderDetails() {
  const modal = document.getElementById("order-details-modal");
  modal.style.display = "none";
}

// Tạo chi tiết đơn hàng, modal-content
function createOrderDetails(order) {
  const userList = JSON.parse(localStorage.getItem("userList"));
  const customer = userList.find((user) => {
    return user.id === order.customerId;
  });

  // Header
  const orderHeader = document.getElementById("order-header");
  orderHeader.innerHTML = `
    <h2>Chi tiết đơn hàng #${order.orderId}</h2>
    <div class="order-status">
        <span>Tình trạng:</span>
        <div class="status-label ${order.orderStatus}">
          <span>${translateOrderStatus(order.orderStatus)}</span>
        </div>
    </div>
  `;

  // Thông tin khách hàng
  const customerInfo = document.getElementById("customer-info");
  customerInfo.innerHTML = `
    <h3>Thông tin Khách hàng</h3>
    <p>Tên:&nbsp${customer.first_name + " " + customer.last_name}</p>
    <p>Email:&nbsp${customer.email}</p>
    <p>Số điện thoại:&nbsp${customer.phone}</p>
    <p>Địa chỉ giao hàng:&nbsp${order.orderAddressToShip}</p>
  `;

  // Thông tin giá tiền
  const orderCost = document.getElementById("order-cost");
  if(orderCost){
    orderCost.innerHTML = `
      <h3>Tóm Tắt Đơn Hàng</h3>
      <p>Tổng tiền hàng:&nbsp${formatVietNamMoney(order.orderTotalPrice)}</p>
      <p>Phí vận chuyển:&nbsp${18000}</p>
      <p>Tổng cộng:&nbsp${formatVietNamMoney(order.orderTotalPrice + 18000)}</p>
    `;
  }

  // Thông tin sản phẩm đã mua
  const productInfoBody = document.getElementById("order-product-info-body");
  productInfoBody.innerHTML = "";
  order.orderProduct.forEach((product) => {
    if(product.discountQuantity > 0){
      const currentDiscountQuantity = Math.min(product.discountQuantity, product.quantity);
      const currentDiscountPercent = ((100 - product.discountPercent) / 100);
      productInfoBody.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${currentDiscountQuantity}</td>
        <td>${formatVietNamMoney(product.price * currentDiscountPercent)}</td>
        <td>${formatVietNamMoney(Math.round(product.price * currentDiscountPercent * currentDiscountQuantity))}</td>
      </tr>
      `;

      if(product.quantity > currentDiscountQuantity){
        productInfoBody.innerHTML += `
        <tr>
          <td>${product.id}</td>
          <td>${product.quantity - currentDiscountQuantity}</td>
          <td>${formatVietNamMoney(product.price)}</td>
          <td>${formatVietNamMoney(product.price * (product.quantity - currentDiscountQuantity))}</td>
        </tr>
        `;
      }
    } else{
      productInfoBody.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.quantity}</td>
        <td>${formatVietNamMoney(product.price)}</td>
        <td>${formatVietNamMoney(product.price * product.quantity)}</td>
      </tr>
      `;
    }

  });
  
  // Các nút xác nhận, huỷ, xác nhận đã giao
  const actionBar = document.getElementById("action-bar");
  if(actionBar){
    if (order.orderStatus === "pending") {
      actionBar.innerHTML = `
        <button class="order-btn order-confirm-btn">Xác nhận đơn hàng</button>
        <button class="order-btn order-cancel-btn">Hủy đơn hàng</button>
        `;
    } else if (order.orderStatus === "accepted") {
      actionBar.innerHTML = `
        <button class="order-btn order-shipped-btn">Xác nhận giao thành công</button>
      `;
    } else if (order.orderStatus === "shipped") {
      actionBar.innerHTML = "";
    } else if (order.orderStatus === "canceled"){
      actionBar.innerHTML = `<button class="order-btn order-delete-btn">Xoá đơn hàng</button>`;
    }
  }
}

// Hiện tình trạng đơn hàng bằng tiếng Việt
function translateOrderStatus(orderStatus) {
  if (orderStatus === "pending") {
    return "Chưa xử lý";
  } else if (orderStatus === "accepted") {
    return "Đã xác nhận";
  } else if (orderStatus === "shipped") {
    return "Đã giao";
  } else if (orderStatus === "canceled") {
    return "Đã huỷ";
  }

  return "";
}
