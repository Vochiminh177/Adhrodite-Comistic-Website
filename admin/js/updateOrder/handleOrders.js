import { formatVietNamMoney } from "../../../user/js/common-js/common.js";
import { showListOrder } from "../showList/show.js"
// Tạo ra các đơn hàng tóm tắt, chưa chi tiết
export function createOrderRow(order) {
  const trEle = document.querySelector(".content-order-table-body");
  trEle.innerHTML += `
    <tr>
      <td>${order.orderId}</td>
      <td>${order.customerId}</td>
      <td>${order.orderDate}</td>
      <td>${formatVietNamMoney(order.orderTotalPrice)}</td>
      <td>
        <p class="status-label ${order.orderStatus}">
          ${translateOrderStatus(order.orderStatus)}
        </p>
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
    const printBtn = document.querySelector(".order-print-btn");
    const confirmBtn = document.querySelector(".order-confirm-btn");
    const cancelBtn = document.querySelector(".order-cancel-btn");
    const shippedBtn = document.querySelector(".order-shipped-btn");

    if (printBtn) {
    }

    if (confirmBtn) {
      confirmBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "accepted");
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "canceled");
      };
    }

    if (shippedBtn) {
      shippedBtn.onclick = (event) => {
        event.preventDefault();
        updateOrderStatus(orderIndex, "shipped");
      };
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
        <span class="status-label ${order.orderStatus}">
          ${translateOrderStatus(order.orderStatus)}
        </span>
    </div>
  `;

  // Thông tin khách hàng
  const customerInfo = document.getElementById("customer-info");
  customerInfo.innerHTML = `
    <h3>Thông tin Khách hàng</h3>
    <p>Tên:&nbsp${customer.first_name + " " + customer.last_name}</p>
    <p>Email:&nbsp${customer.email}</p>
    <p>Số điện thoại:&nbsp${customer.phone}</p>
    <p>Địa chỉ:&nbsp${customer.address}</p>
  `;

  // Thông tin sản phẩm đã mua
  const productInfoBody = document.getElementById("order-product-info-body");
  productInfoBody.innerHTML = "";
  order.orderProduct.forEach((product) => {
    productInfoBody.innerHTML += `
    <tr>
      <td>${product.id}</td>
      <td>${product.quantity}</td>
      <td>${formatVietNamMoney(product.price)}</td>
      <td>${formatVietNamMoney(product.price * product.quantity)}</td>
    </tr>
    `;
  });

  // Thông tin giá tiền
  const orderCost = document.getElementById("order-cost");
  orderCost.innerHTML = `
    <h3>Tóm Tắt Đơn Hàng</h3>
    <p>Tổng tiền hàng:&nbsp${formatVietNamMoney(order.orderTotalPrice)}</p>
    <p>Phí vận chuyển:&nbsp${20000}</p>
    <p>Tổng cộng:&nbsp${formatVietNamMoney(order.orderTotalPrice + 20000)}</p>
  `;

  // Các nút in, xác nhận, huỷ, xác nhận đã giao
  const actionBar = document.getElementById("action-bar");
  if (order.orderStatus === "pending") {
    actionBar.innerHTML = `
      <button class="order-print-btn">In Hóa Đơn</button>
      <button class="order-confirm-btn">Xác nhận đơn hàng</button>
      <button class="order-cancel-btn">Hủy đơn hàng</button>
      `;
  } else if (order.orderStatus === "accepted") {
    actionBar.innerHTML = `
      <button class="order-print-btn">In Hóa Đơn</button>
      <button class="order-shipped-btn">Xác nhận giao thành công</button>
    `;
  } else if (order.orderStatus === "shipped") {
    actionBar.innerHTML = `
      <button class="order-print-btn">In Hóa Đơn</button>
    `;
  } else if (order.orderStatus === "canceled") {
    actionBar.innerHTML = `
      <button class="order-print-btn">In Hóa Đơn</button>
    `;
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