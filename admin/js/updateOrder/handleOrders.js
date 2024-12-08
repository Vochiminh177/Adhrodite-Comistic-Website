import { formatVietNamMoney } from "../../../user/js/common-js/common.js";
import { showListOrder, pagination} from "../showList/show.js"
import { getDistrictOfOrder, filterOrders } from "./orderFilter.js";
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
// Ẩn / hiện chi tiết đơn hàng, đổi trạng thái đơn hàng
export function generateOrderEvents(start, end, curentPage, orderList) {
  // Tạo sự kiện xem chi tiết đơn hàng
  const detailEles = document.querySelectorAll(".details-btn");
  if(detailEles){
    detailEles.forEach((ele, idx) => {
      ele.addEventListener("click", (event) => {
        event.preventDefault();
        const orderIndex = idx + start;
        showOrderDetails(orderList[orderIndex]);
        generateOrderButtonsEvents(orderIndex);
      });
    });
  } else{
    //console.error(`".details-btn not found!"`);
  }
  
  closeModalEvents();
  // Tạo sự kiện cho các nút in, xác nhận, huỷ, xác nhận đã giao
  function generateOrderButtonsEvents(orderIndex) {
    const confirmBtn = document.querySelector(".order-confirm-btn");
    const cancelBtn = document.querySelector(".order-cancel-btn");
    const shippedBtn = document.querySelector(".order-shipped-btn");
    const deleteBtn = document.querySelector(".order-delete-btn");
    if (confirmBtn) {
      confirmBtn.onclick = (event) => {
        event.preventDefault();
        showOrderConfirmModal(orderIndex, "accepted");
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = (event) => {
        event.preventDefault();
        showOrderConfirmModal(orderIndex, "canceled");
      };
    }

    if (shippedBtn) {
      shippedBtn.onclick = (event) => {
        event.preventDefault();
        showOrderConfirmModal(orderIndex, "shipped");
      };
    }

    if(deleteBtn){
      deleteBtn.onclick = (event) => {
        event.preventDefault();
        showOrderConfirmModal(orderIndex, "delete");
      }
    }
  }

  function showOrderConfirmModal(orderIndex, newStatus){
    const orderConfirmMessage = document.getElementById("order-confirm-modal-message");
    if(orderConfirmMessage){
      if(newStatus === "accepted"){
        orderConfirmMessage.innerHTML = `Xác nhận đã xác nhận đơn hàng ?`;
      } else
      if(newStatus === "canceled"){
        orderConfirmMessage.innerHTML = `Xác nhận đã huỷ đơn hàng ?`;
      } else
      if(newStatus === "shipped"){
        orderConfirmMessage.innerHTML = `Xác nhận đã giao đơn hàng ?`;
      } else
      if(newStatus === "delete"){
        orderConfirmMessage.innerHTML = `Xác nhận đã xoá đơn hàng ?`;
      }
    } else{
      //console.error(`#order-confirm-message not found!`);
    }
    
    const orderConfirmModal = document.getElementById("order-confirm-modal");
    if(orderConfirmModal){
      orderConfirmModal.style.display = "block";
    } else{
      //console.error(`#order-confirm-modal not found!`);
    }
  
    const orderConfirmConfirmButton = document.getElementById("order-confirm-confirm-btn");
    if(orderConfirmConfirmButton){
      orderConfirmConfirmButton.onclick = (event) => {
        event.preventDefault();
        orderConfirmModal.style.display = "none";
        if(newStatus === "accepted"){
          updateOrderStatus(orderIndex, "accepted");
        } else
        if(newStatus === "canceled"){
          updateOrderStatus(orderIndex, "canceled");
        } else
        if(newStatus === "shipped"){
          updateOrderStatus(orderIndex, "shipped");
        } else
        if(newStatus === "delete"){
          deleteOrder(orderIndex);
        }

        pagination(filterOrders(), curentPage, showListOrder, "#main-content-order");
        document.getElementById("order-details-modal").style.display = "none";
        changeOrderStatusQuantity();
      }
    } else{
      //console.error(`#order-confirm-confirm-btn not found`);
    }
  
    const orderConfirmCancelButton = document.getElementById("order-confirm-cancel-btn");
    if(orderConfirmCancelButton){
      orderConfirmCancelButton.onclick = (event) => {
        event.preventDefault();
        orderConfirmModal.style.display = "none";
      }
    } else{
      //console.error(`#order-confirm-cancel-btn not found!`);
    }
  }

  // Cập nhật lại Trạng thái đơn hàng
  // Tham số orderIndex để tạo lại chi tiết đơn hàng orderList[orderIndex]
  // Thâm số newStatus Trạng thái mới của đơn hàng
  function updateOrderStatus(orderIndex, newStatus) {
    const modalStatusLabel = document.querySelector(
      ".order-header .status-label"
    );

    modalStatusLabel.classList.remove(modalStatusLabel.classList[0]);
    modalStatusLabel.classList.remove(modalStatusLabel.classList[1]);
    modalStatusLabel.classList.add("status-label");
    modalStatusLabel.classList.add(`${newStatus}`);
    modalStatusLabel.innerHTML = `${translateOrderStatus(newStatus)}`;
    const localStorageOrderList = JSON.parse(localStorage.getItem("orderList"));

    const toUpdateStatusIndex = localStorageOrderList.findIndex(
      (localOrder) => localOrder.orderId === orderList[orderIndex].orderId
    );
    if(toUpdateStatusIndex !== -1){
      localStorageOrderList[toUpdateStatusIndex].orderStatus = newStatus;
      localStorage.setItem("orderList", JSON.stringify(localStorageOrderList));
    }
  }
  function deleteOrder(orderIndex){
    const localStorageOrderList = JSON.parse(localStorage.getItem("orderList"));
    const toDeleteIndex = localStorageOrderList.findIndex(
      (order) => orderList[orderIndex].orderId === order.orderId
    );

    if(toDeleteIndex !== -1){
      localStorageOrderList.splice(toDeleteIndex, 1);
      localStorage.setItem("orderList", JSON.stringify(localStorageOrderList));
    }
  }
}

// Hiện lên chi tiết đơn hàng, modal-content
function showOrderDetails(order) {
  createOrderDetails(order);
  const modal = document.getElementById("order-details-modal");
  modal.style.display = "block";
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
        <span>Trạng thái:</span>
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
  const orderSummary = document.getElementById("order-summary");
  if(orderSummary){
    orderSummary.innerHTML = `
      <h3>Tóm Tắt Đơn Hàng</h3>
      <p>Phương thức thanh toán:&nbsp${order.orderMethod.name}</p>
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

// Hiện trạng thái đơn hàng bằng tiếng Việt
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

function closeModalEvents(){
  // Đóng modal khi nhấn vào nút tắt
  const closeOrderDetailsModalBtn = document.querySelector(".order-details-modal .close-btn");
  if(closeOrderDetailsModalBtn){
    closeOrderDetailsModalBtn.onclick = (event) => {
      event.preventDefault();
      const modal = document.getElementById("order-details-modal");
      if(modal){
        modal.style.display = "none";
      } else{
        console.log(`#order-details-modal not found!`);
      }
    };
  } else{
    //console.error(`.order-details-modal .close-btn not found!`);
  }

  const closeOrderConfirmModalBtn = document.querySelector(".order-confirm-modal .close-btn");
  if(closeOrderConfirmModalBtn){
    closeOrderConfirmModalBtn.onclick = (event) => {
      event.preventDefault();
      const modal = document.getElementById("order-confirm-modal");
      if(modal){
        modal.style.display = "none";
      } else{
        //console.error(`order-confirm-modal not found!`);
      }
    }
  } else{
    //console.error(`order-confirm-modal .close-btn not found!`);
  }
  // Đóng modal khi nhấn vào bên ngoài modal-content
  const orderDetailsmodal = document.getElementById("order-details-modal");
  if(orderDetailsmodal){
    orderDetailsmodal.onclick = (event) => {
      if (event.target.matches(".order-details-modal")) {
        orderDetailsmodal.style.display = "none";
      }
    };
  } else{
    //console.error(`#order-details-modal not found!`);
  }

  const orderConfirmModal = document.getElementById("order-confirm-modal");
  if(orderConfirmModal){
    orderConfirmModal.onclick = (event) => {
      if(event.target.matches(".order-confirm-modal")){
        orderConfirmModal.style.display = "none";
      }
    }
  } else{
    //console.error(`#order-confirm-modal not found!`);
  }
}