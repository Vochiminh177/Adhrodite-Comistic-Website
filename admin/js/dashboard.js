// import { createNotificationAdmin } from "./base/baseFunction";


// export function updateDashboardHighlights(orderList, productStatistics) {
//     //Tổng doanh thu
//     const totalRevenue = orderList.reduce((sum, order) => {
//         const price = parseFloat(order.orderTotalPrice); 
//         return sum + price;
//     }, 0);
    

//     // Tổng đơn hàng
//     const totalOrders = orderList.length;

//     // Tổng số khách hàng duy nhất
//     const uniqueCustomerIds = [...new Set(orderList.map(order => order.customerId))];
//     const totalCustomers = uniqueCustomerIds.length;

//     // Sản phẩm bán chạy nhất dựa vào doanh thu
//     const bestSellingProduct = productStatistics.length > 0 ? productStatistics[0] : null;

//     // Cập nhật DOM
//     document.querySelectorAll(".dashboard-highlight-box")[0].querySelector("h3").textContent = `${totalRevenue.toLocaleString()} đ`;
//     document.querySelectorAll(".dashboard-highlight-box")[1].querySelector("h3").textContent = totalOrders;
//     document.querySelectorAll(".dashboard-highlight-box")[2].querySelector("h3").textContent = totalCustomers;

//     if (bestSellingProduct) {
//         const productImageElement = document.querySelector(".dashboard-highlight-box-product img");
//         const productIdElement = document.querySelector("#productId");

//         productImageElement.src = bestSellingProduct.src; // Đảm bảo truy cập đúng thuộc tính chứa hình ảnh
//         productIdElement.textContent = bestSellingProduct.id;
//     }
// }

// function filterResult(orders, startDate, endDate, productCode) {
//     let start = startDate ? new Date(startDate) : null;
//     let end = endDate ? new Date(endDate) : null;

//     // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
//     if (start && end && end < start) {
//         console.error("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
//         return [];
//     }

//     const filteredOrders = orders.filter(order => {
//         let isDateValid = true;
//         let isProductValid = true;

//         // Kiểm tra điều kiện ngày nếu có
//         if (start || end) {
//             const orderDate = new Date(order.orderDate.split(" ")[1]);
//             if (start) isDateValid = orderDate >= start;
//             if (end) isDateValid = isDateValid && orderDate <= end;
//         }

//         // Kiểm tra điều kiện mã sản phẩm nếu có, nếu không có thì bỏ qua
//         if (productCode) {
//             isProductValid = order.orderProduct.some(product => product.id === productCode);
//         }

//         return isDateValid && isProductValid;
//     });

//     // Kiểm tra nếu không có đơn hàng nào thỏa mãn mã sản phẩm
//     if (productCode && filteredOrders.length === 0) {
//         console.warn(`Không tìm thấy đơn hàng nào chứa mã sản phẩm: ${productCode}.`);
//     }
//     return filteredOrders;
// }

// export function dashboardFilter(){
//     document.getElementById("filterBtn").addEventListener("click", function() {
//         const fromDate = document.getElementById("from-date").value;
//         const toDate = document.getElementById("to-date").value;
//         const productId = document.getElementById("product-id").value.trim();
    
//         const filteredOrders = filterResult(orders, fromDate, toDate, productId);
        
//         if (filteredOrders.length === 0) {
//             createNotificationAdmin("Không có đơn hàng thỏa điều kiện!");
//         } else {
//             createNotificationAdmin("Không có đơn hàng thỏa điều kiện!");
//             pagination(filteredOrders, 1, showProductStatistics, "#main-content-dashboard");
//         }
//     });
// }
