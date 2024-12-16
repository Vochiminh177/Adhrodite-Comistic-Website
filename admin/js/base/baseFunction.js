import { formatVietNamMoney } from "../../../user/js/common-js/common.js";
let idTimeout = null;
//hàm tạo thông báo
export function createNotificationAdmin(mess) {
    let ele = document.querySelector("#empty-notification");
    ele.innerHTML = mess;
    ele.className = "notification";

    function removeNoti(){
        ele.innerHTML = "";
        ele.classList.remove("notification");
        idTimeout = null;
    }


    if(idTimeout) clearTimeout(idTimeout);
    idTimeout = setTimeout(removeNoti, 1100);



   // Tạo container nếu chưa có
//   let container = document.querySelector(".container-notification");
//   if (!container) {
//     container = document.createElement("div");
//     container.className = "container-notification";
//     document.body.appendChild(container);
//   }

//   // Tạo thẻ <p> mới cho thông báo
//   const notification = document.createElement("p");
//   notification.className = "notification";
//   notification.textContent = mess;

//   // Thêm thẻ <p> vào container
//   container.appendChild(notification);

//   // Thêm class `active` để hiển thị thông báo
//   setTimeout(() => {
//     notification.classList.add("active");
//   }, 10);

//   // Xóa thông báo sau 5 giây
//   setTimeout(() => {
//     notification.classList.remove("active");
//     setTimeout(() => {
//       notification.remove();
//     }, 200); // Đợi hiệu ứng biến mất trước khi xóa khỏi DOM
//   }, 1500);
}
//reset input
export function reset_style_input(input) {
    input.classList.remove("err-text");
    if (input.className == "id-add") {
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

export function err_input(input, mess, checkSelect) {
    if(checkSelect){
        input.parentElement.style.border = "2px solid red";
        input.parentElement.onfocus = () => {
          input.parentElement.style.border = "2px solid #000";
        }
        return;
      }
    if (input.type == "file") {
        let parent = input.parentElement;
        if (!parent.querySelector("p")) {
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
    else {
        if (input.value == "") {
            input.placeholder = "Thiếu dữ liệu";
            input.style.borderColor = "red";
            input.classList.add("err-text");
        }
        else {
            if (mess) {
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
    // Tổng doanh thu
    const totalRevenue = orderList.reduce((sum, order) => {
        const price = parseFloat(order.orderTotalPrice);
        return sum + price;
    }, 0);

    // Tổng đơn hàng
    const totalOrders = orderList.length;

    // Sản phẩm bán chạy nhất dựa vào doanh thu
    const bestSellingProduct = productStatistics.length > 0 ? productStatistics[0] : null;

    // Tính tổng tiền mua của từng khách hàng
    const customerRevenueMap = orderList.reduce((acc, order) => {
        if (acc[order.customerId]) {
            acc[order.customerId] += parseFloat(order.orderTotalPrice);
        } else {
            acc[order.customerId] = parseFloat(order.orderTotalPrice);
        }
        return acc;
    }, {});

    // Sắp xếp khách hàng theo tổng tiền mua giảm dần
    const topCustomers = Object.entries(customerRevenueMap)
        .map(([customerId, totalSpent]) => ({ customerId, totalSpent }))
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 3); // Lấy 3 khách hàng đầu tiên

    // Cập nhật DOM cho các phần tử highlight
    document.querySelectorAll(".dashboard-highlight-box")[0].querySelector("h3").textContent = `${formatVietNamMoney(totalRevenue)}đ`;
    document.querySelectorAll(".dashboard-highlight-box")[1].querySelector("h3").textContent = totalOrders;

    // Hiển thị Top 3 Khách Hàng
    const topCustomersList = document.querySelector("#topCustomersList");
    topCustomersList.innerHTML = ''; // Xoá nội dung cũ
    topCustomers.forEach((customer, index) => {
        const customerElement = document.createElement("div");
        customerElement.classList.add("customer-item");
        customerElement.innerHTML = `
            <p>${index + 1}: ${customer.customerId}</p>
        `;
        topCustomersList.appendChild(customerElement);
    });

    // // Cập nhật thông tin tổng số khách hàng
    // const totalCustomersCount = document.querySelector("#totalCustomersCount");
    // totalCustomersCount.textContent = totalCustomers;

    // Cập nhật sản phẩm bán chạy
    if (bestSellingProduct) {
        const productImageElement = document.querySelector(".dashboard-highlight-box-product img");
        const productIdElement = document.querySelector("#productId");

        productImageElement.src = bestSellingProduct.src;
        productIdElement.textContent = bestSellingProduct.id;
    }
}


export function filterByDate() {

    const doneOrder = getNonPendingOrders(JSON.parse(localStorage.getItem('orderList')));
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');

    // Lắng nghe sự kiện input cho fromDateInput
    fromDateInput.addEventListener('input', () => {
        if (fromDateInput.value === '' && toDateInput.value === '') {
            pagination(doneOrder, 1, showListOrder, "#main-content-dashboard-orderList");
        }
    });

    // Lắng nghe sự kiện input cho toDateInput
    toDateInput.addEventListener('input', () => {
        if (fromDateInput.value === '' && toDateInput.value === '') {
            pagination(doneOrder, 1, showListOrder, "#main-content-dashboard-orderList");
        }
    });

    // Lắng nghe sự kiện click trên filter button
    document.querySelectorAll("#filterBtn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Lấy giá trị từ input và chuyển thành đối tượng Date
            const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
            const toDate = toDateInput.value ? new Date(toDateInput.value) : null;

            // Kiểm tra nếu cả hai ngày đều trống
            if (!fromDate && !toDate) {
                createNotificationAdmin("Vui lòng chọn ít nhất một ngày!");
                return;
            }

            // Kiểm tra nếu khoảng ngày không hợp lệ
            if (fromDate && toDate && fromDate > toDate) {
                createNotificationAdmin("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
                return;
            }

            // Lọc danh sách đơn hàng theo ngày
            const filteredOrders = doneOrder.filter((order) => {
                const orderDate = new Date(order.date); // Chuyển đổi ngày của đơn hàng
                if (fromDate && !toDate) {
                    return orderDate >= fromDate;
                } else if (!fromDate && toDate) {
                    return orderDate <= toDate;
                } else if (fromDate && toDate) {
                    return orderDate >= fromDate && orderDate <= toDate;
                }
                return false;
            });

            // Hiển thị kết quả
            if (filteredOrders.length === 0) {
                createNotificationAdmin("Không có đơn hàng thỏa điều kiện!");
            } else {
                pagination(filteredOrders, 1, showListOrder, "#main-content-dashboard-orderList");
            }
        });
    });
}

export function searchByProductId(productStatistic) {
    const inputField = document.getElementById('product-id');
    const searchButton = document.getElementById("searchBtn");

    // Kiểm tra nếu `productStatistic` không hợp lệ
    if (!Array.isArray(productStatistic)) {
        console.error("Danh sách sản phẩm không hợp lệ!");
        return;
    }

    // Xử lý khi người dùng xóa nội dung input
    inputField.addEventListener('input', () => {
        if (inputField.value.trim() === '') {
            console.log('Đã xóa nội dung bằng nút clear!');
            pagination(productStatistic, 1, showProductStatistics, "#main-content-dashboard");
        }
    });

    // Xử lý sự kiện khi bấm nút tìm kiếm
    searchButton.addEventListener("click", function () {
        const productId = inputField.value.trim().toUpperCase();

        // Kiểm tra input rỗng
        if (!productId) {
            createNotificationAdmin("Vui lòng nhập mã sản phẩm!");
            return;
        }

        // Lọc danh sách sản phẩm theo mã
        const productReport = productStatistic.filter(product =>
            product.id && product.id.toUpperCase().includes(productId)
        );

        // Kiểm tra kết quả lọc
        if (productReport.length === 0) {
            createNotificationAdmin("Không tìm thấy mã sản phẩm!");
        } else {
            pagination(productReport, 1, showProductStatistics, "#main-content-dashboard");
        }
    });
}

export function showOrdersListByProductId(currentPage) {
    document.querySelectorAll(".order-list-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            //let orders = JSON.parse(localStorage.getItem('orderList')) || [];
            let doneOrder = getNonPendingOrders(JSON.parse(localStorage.getItem('orderList')));
            const productId = button.getAttribute("data-product-id");

            // Lọc các đơn hàng theo mã sản phẩm
            const ordersForProduct = doneOrder.filter(order =>
                order.orderProduct.some(product => product.id === productId)
            );

            showMain("main-content-dashboard-orderList");

            document.querySelector(".comeback-product").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-dashboard");
            };
            pagination(ordersForProduct, currentPage, showListOrder, "#main-content-dashboard-orderList");
        });
    });
}
