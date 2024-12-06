import {pagination, showListOrder} from "../showList/show.js";
import {showMain} from "../script2.js";
//hàm tạo thông báo
export function createNotificationAdmin(mess) {
   // Tạo container nếu chưa có
  let container = document.querySelector(".container-notification");
  if (!container) {
    container = document.createElement("div");
    container.className = "container-notification";
    document.body.appendChild(container);
  }

  // Tạo thẻ <p> mới cho thông báo
  const notification = document.createElement("p");
  notification.className = "notification";
  notification.textContent = mess;

  // Thêm thẻ <p> vào container
  container.appendChild(notification);

  // Thêm class `active` để hiển thị thông báo
  setTimeout(() => {
    notification.classList.add("active");
  }, 10);

  // Xóa thông báo sau 5 giây
  setTimeout(() => {
    notification.classList.remove("active");
    setTimeout(() => {
      notification.remove();
    }, 200); // Đợi hiệu ứng biến mất trước khi xóa khỏi DOM
  }, 1000);
}

//reset input
export function reset_style_input(input){
    input.classList.remove("err-text");
    if(input.className == "id-add"){
        input.placeholder = "Mã sản phẩm";
    }
    else if(input.className === "brand-add") input.placeholder = "Thương hiệu";
    else if(input.className === "name-add") input.placeholder = "Tên sản phẩm";
    else if(input.className === "price-add") input.placeholder = "Giá bán";
    else if(input.className === "quantity-add") input.placeholder = "Số lượng";
    else if(input.className === "description-add") input.placeholder = "Miêu tả sản phẩm";   
    else if(input.className === "username-customer") input.placeholder = "Tên tài khoản";
    else if(input.className === "password-customer") input.placeholder = "Mật khẩu";
    else if(input.className === "phone-customer") input.placeholder = "Số điện thoại";
    else if(input.className === "firstname-customer") input.placeholder = "Họ";
    else if(input.className === "lastname-customer") input.placeholder = "Tên đệm";
    else if(input.className === "email-customer") input.placeholder = "Email";
    else if(input.className === "percent-discount-add") input.placeholder = "Giảm giá %";
    else if(input.className === "quantity-discount") input.placeholder = "Số lượng giảm giá";
    else if(input.className === "address-customer") input.placeholder = "Địa chỉ";
    else if(input.id === "account-admin") input.placeholder = "Tài khoản admin";
    else if(input.id === "password-admin") input.placeholder = "Mật khẩu";
    else input.placeholder = "Số lượng sản phẩm";
    input.style.borderColor = "#000";
}

export function err_input(input, mess){
    if(input.type == "file"){
        let parent = input.parentElement;
        if(!parent.querySelector("p")){
            let ele = document.createElement("p");
            ele.innerText = "*Lỗi! Cần thêm hình ảnh";
            ele.style.fontSize = "0.8rem";
            ele.style.color = "red";
            parent.appendChild(ele);

            input.onclick = () => {
                ele.remove();
            };
        }
    }
    else{
        if(input.value == ""){
            input.placeholder = "*Lỗi! Thiếu dữ liệu";
            input.style.borderColor = "red";
            input.classList.add("err-text");
        }
        else{
            if(mess){
                input.value = "";
                input.placeholder = mess;
                input.style.borderColor = "red";
                input.classList.add("err-text");
            }
        }
        input.onfocus = () => {
            reset_style_input(input);
        }
    }
}
export function updateDashboardHighlights(orderList, productStatistics) {
    //Tổng doanh thu
    const totalRevenue = orderList.reduce((sum, order) => {
        const price = parseFloat(order.orderTotalPrice);
        return sum + price;
    }, 0);

    // Tổng đơn hàng
    const totalOrders = orderList.length;

    // Tổng số khách hàng duy nhất
    const uniqueCustomerIds = [...new Set(orderList.map(order => order.customerId))];
    const totalCustomers = uniqueCustomerIds.length;

    // Sản phẩm bán chạy nhất dựa vào doanh thu
    const bestSellingProduct = productStatistics.length > 0 ? productStatistics[0] : null;

    // Cập nhật DOM
    document.querySelectorAll(".dashboard-highlight-box")[0].querySelector("h3").textContent = `${totalRevenue.toLocaleString()} đ`;
    document.querySelectorAll(".dashboard-highlight-box")[1].querySelector("h3").textContent = totalOrders;
    document.querySelectorAll(".dashboard-highlight-box")[2].querySelector("h3").textContent = totalCustomers;

    // Sản phẩm nổi bật
    if (bestSellingProduct) {
        const productImageElement = document.querySelector(".dashboard-highlight-box-product img");
        const productIdElement = document.querySelector("#productId");

        productImageElement.src = bestSellingProduct.src;
        productIdElement.textContent = bestSellingProduct.id;
    }
}

function filterResult(orders, startDate, endDate, productCode) {
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
    if (start && end && end < start) {
        console.error("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
        return [];
    }

    const filteredOrders = orders.filter(order => {
        let isDateValid = true;
        let isProductValid = true;

        // Kiểm tra điều kiện ngày nếu có
        if (start || end) {
            const orderDate = new Date(order.orderDate.split(" ")[1]);
            if (start) isDateValid = orderDate >= start;
            if (end) isDateValid = isDateValid && orderDate <= end;
        }

        // Kiểm tra điều kiện mã sản phẩm nếu có, nếu không có thì bỏ qua
        if (productCode) {
            isProductValid = order.orderProduct.some(product => product.id === productCode);
        }

        return isDateValid && isProductValid;
    });

    // Kiểm tra nếu không có đơn hàng nào thỏa mãn mã sản phẩm
    if (productCode && filteredOrders.length === 0) {
        console.warn(`Không tìm thấy đơn hàng nào chứa mã sản phẩm: ${productCode}.`);
    }
    return filteredOrders;
}


export function dashboardFilter(){
    document.getElementById("filterBtn").addEventListener("click", function() {
        const fromDate = document.getElementById("from-date").value;
        const toDate = document.getElementById("to-date").value;
        const productId = document.getElementById("product-id").value.trim();
    
        let orders = JSON.parse(localStorage.getItem('orderList')) || [];
        const filteredOrders = filterResult(orders, fromDate, toDate, productId);
        
        if (filteredOrders.length === 0) {
            createNotificationAdmin("Không có đơn hàng thỏa điều kiện!");
        } else {
            createNotificationAdmin("Không có đơn hàng thỏa điều kiện!");
            pagination(filteredOrders, 1, showProductStatistics, "#main-content-dashboard");
        }
    });
}

export function showResult(currentPage) {
    document.querySelectorAll(".order-list-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            let orders = JSON.parse(localStorage.getItem('orderList')) || [];
            const productId = button.getAttribute("data-product-id");
            
            // Lọc các đơn hàng theo mã sản phẩm
            const ordersForProduct = orders.filter(order =>
                order.orderProduct.some(product => product.id === productId)
            );

            console.log(ordersForProduct);
            
            if (ordersForProduct.length === 0) {
                createNotificationAdmin(`Không có đơn hàng nào chứa mã sản phẩm: ${productId}`);
                return;
            }
            
            showMain("main-content-dashboard-orderList");
            
            document.querySelector(".comeback-product").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-dashboard");
                console.log("hahahah");
            };
            pagination(ordersForProduct, 1, showListOrder, "#main-content-dashboard-orderList");
        });
    });
}
