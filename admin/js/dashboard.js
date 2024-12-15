import { showProductStatistics, showCustomerStatistics, pagination, showListOrder } from "./showList/show.js";
import { createNotificationAdmin } from "./base/baseFunction.js"
import { showMain } from "./script2.js";

const validOrderList = getValidOrders() || [];
const userList = JSON.parse(localStorage.getItem('userList')) || [];
const productStatistics = generateProductStatistics(validOrderList);

export function DashboardEvent() {
    updateDashboardHighlights(validOrderList, productStatistics);
    pagination(productStatistics, 1, showProductStatistics, "#main-content-dashboard");
    chooseTypeStatistic();
    Filter();
    search();
}

function chooseTypeStatistic() {
    document.getElementById('sortTypeStatistic').addEventListener('change', function () {
        const sortType = this.value;
        const objectIdInput = document.getElementById("object-id");
        if (sortType === 'product') {
            let productStatistics = generateProductStatistics(validOrderList);
            pagination(productStatistics, 1, showProductStatistics, "#main-content-dashboard");
            objectIdInput.placeholder = "Nhập mã sản phẩm";
        }
        else if (sortType === 'customer') {
            let customerStatistics = generateCustomerStatistics(validOrderList);
            pagination(customerStatistics, 1, showCustomerStatistics, "#main-content-dashboard");
            objectIdInput.placeholder = "Nhập mã khách hàng";
        }
    });
}

function Filter() {
    document.getElementById('filterBtn').addEventListener('click', () => {
        // Lấy các giá trị từ giao diện
        const typeStatistic = document.getElementById('sortTypeStatistic').value;
        const sortType = document.getElementById('sortType').value || null;
        const rowCount = parseInt(document.getElementById('row-count').value) || null;
        const startDate = document.getElementById('from-date').value || null;
        const endDate = document.getElementById('to-date').value || null;

        // Sao chép danh sách để không thay đổi dữ liệu gốc
        let filteredOrders = [];

        // Lọc theo loại thống kê (Theo sản phẩm/khách hàng)
        if (typeStatistic === 'product') {
            filteredOrders = generateProductStatistics(validOrderList, sortType, rowCount, startDate, endDate);
            pagination(filteredOrders, 1, showProductStatistics, "#main-content-dashboard");
        } else {
            filteredOrders = generateCustomerStatistics(validOrderList, sortType, rowCount);
            pagination(filteredOrders, 1, showCustomerStatistics, "#main-content-dashboard");
        }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        // Lấy trạng thái hiện tại của select
        const sortType = document.getElementById('sortTypeStatistic').value;
        const objectIdInput = document.getElementById("object-id");

        if (sortType === 'product') {
            // Reset placeholder và dữ liệu theo sản phẩm
            let productStatistics = generateProductStatistics(validOrderList);
            pagination(productStatistics, 1, showProductStatistics, "#main-content-dashboard");
            objectIdInput.placeholder = "Nhập mã sản phẩm";
        } else if (sortType === 'customer') {
            // Reset placeholder và dữ liệu theo khách hàng
            let customerStatistics = generateCustomerStatistics(validOrderList);
            pagination(customerStatistics, 1, showCustomerStatistics, "#main-content-dashboard");
            objectIdInput.placeholder = "Nhập mã khách hàng";
        }

        // Reset các input khác về trạng thái mặc định
        document.getElementById('sortType').value = 'desc';
        document.getElementById('row-count').value = '';
        document.getElementById('from-date').value = "";
        document.getElementById('to-date').value = "";
        objectIdInput.value = '';
    });
}

function filterForOrder(orderList, sortBy, n, startDate, endDate) {
    // Chuyển startDate và endDate thành đối tượng Date (nếu có) với format MM/dd/yyyy
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    // Kiểm tra nếu ngày kết thúc trước ngày bắt đầu
    if (start && end && end < start) {
        createNotificationAdmin("Ngày kết thúc không được trước ngày bắt đầu!");
    }

    // Lọc danh sách sản phẩm theo khoảng thời gian
    let filteredList = orderList.filter(order => {
        let [time, date] = order.orderDate.split(" "); // Tách thời gian và ngày
        let [day, month, year] = date.split("/");      // Chuyển từ "dd/MM/yyyy" về dạng "MM/dd/yyyy"
        let orderDate = new Date(`${month}/${day}/${year} ${time}`); // Tạo đối tượng Date hợp lệ

        if (start && end) {
            return orderDate >= start && orderDate <= end;
        } else if (start) {
            return orderDate >= start;
        } else if (end) {
            return orderDate <= end;
        }
        return true; // Không có điều kiện lọc
    });

    // Sắp xếp danh sách theo tiêu chí được chọn
    switch (sortBy) {
        case 'asc':
            filteredList.sort((a, b) => a.orderTotalPrice - b.orderTotalPrice); // Sắp xếp giá tăng dần
            break;
        case 'desc':
        case '':
            filteredList.sort((a, b) => b.orderTotalPrice - a.orderTotalPrice); // Sắp xếp giá giảm dần
            break;
        case 'az':
            filteredList.sort((a, b) => a.name.localeCompare(b.name)); // Sắp xếp theo tên từ A-Z
            break;
        case 'za':
            filteredList.sort((a, b) => b.name.localeCompare(a.name)); // Sắp xếp theo tên từ Z-A
            break;
        default:
            filteredList.sort((a, b) => b.orderTotalPrice - a.orderTotalPrice); // Mặc định sắp xếp giá giảm dần
    }

    // Giới hạn kết quả nếu n > 0
    if (n && Number.isInteger(n) && n > 0) {
        return filteredList.slice(0, n);
    }

    return filteredList; // Trả về toàn bộ danh sách
}

function getValidOrders() {
    let orderList = JSON.parse(localStorage.getItem('orderList'));
    return orderList.filter(order => order.orderStatus !== "pending" && order.orderStatus !== "canceled");
}

function generateProductStatistics(productList, sortBy, n, startDate, endDate) {
    let productReport = {};

    // Chuyển startDate và endDate thành đối tượng Date (nếu có) với format MM/dd/yyyy
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    // Kiểm tra nếu ngày kết thúc trước ngày bắt đầu
    if (start && end && end < start) {
        createNotificationAdmin("Ngày kết thúc không được trước ngày bắt đầu!");
        return [];
    }

    // Lọc các đơn hàng theo khoảng thời gian
    let filteredProductList = productList.filter(order => {
        let [time, date] = order.orderDate.split(" "); // Tách thời gian và ngày
        let [day, month, year] = date.split("/");      // Chuyển từ "dd/MM/yyyy" về dạng "MM/dd/yyyy"
        let orderDate = new Date(`${month}/${day}/${year} ${time}`); // Tạo đối tượng Date hợp lệ

        if (start && end) {
            return orderDate >= start && orderDate <= end;
        } else if (start) {
            return orderDate >= start;
        } else if (end) {
            return orderDate <= end;
        }
        return true; // Không có điều kiện lọc
    });

    // Xử lý thống kê sản phẩm từ danh sách đã lọc
    filteredProductList.forEach(order => {
        order.orderProduct.forEach(product => {
            let productId = String(product.id);

            if (!productReport[productId]) {
                productReport[productId] = {
                    id: productId,
                    name: product.name,
                    src: product.src,
                    price: product.price,
                    totalQuantity: 0,
                    totalRevenue: 0,
                    orderCount: 0
                };
            }

            productReport[productId].totalQuantity += parseInt(product.quantity);
            productReport[productId].totalRevenue += product.price * product.quantity;
            productReport[productId].orderCount++;
        });
    });

    // Sắp xếp theo tiêu chí được chọn
    let sortedReport = Object.values(productReport);
    switch (sortBy) {
        case 'asc':
            sortedReport.sort((a, b) => a.totalRevenue - b.totalRevenue);
            break;
        case 'desc':
        case '':
            sortedReport.sort((a, b) => b.totalRevenue - a.totalRevenue);
            break;
        case 'az':
            sortedReport.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'za':
            sortedReport.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedReport.sort((a, b) => b.totalRevenue - a.totalRevenue);
    }

    // Giới hạn kết quả nếu n > 0
    if (n && Number.isInteger(n) && n > 0) {
        return sortedReport.slice(0, n);
    }

    return sortedReport; // Trả về toàn bộ kết quả
}

function generateCustomerStatistics(customerList, sortBy, n, startDate, endDate) {
    let customerReport = {};

    // Chuyển startDate và endDate thành đối tượng Date (nếu có)
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    // Kiểm tra nếu ngày kết thúc trước ngày bắt đầu
    if (start && end && end < start) {
        createNotificationAdmin("Ngày kết thúc không được trước ngày bắt đầu!");
        return [];
    }

    // Tạo bản đồ userList để tăng hiệu suất tìm kiếm
    const userMap = new Map(userList.map(user => [String(user.id), user.username]));

    // Lọc các đơn hàng theo khoảng thời gian
    let filteredCustomerList = customerList.filter(order => {
        let [time, date] = order.orderDate.split(" ");  // Tách thời gian và ngày
        let [day, month, year] = date.split("/");      // Chuyển từ "dd/MM/yyyy" về dạng "MM/dd/yyyy"
        let orderDate = new Date(`${month}/${day}/${year} ${time}`); // Tạo đối tượng Date hợp lệ

        if (start && end) {
            return orderDate >= start && orderDate <= end;
        } else if (start) {
            return orderDate >= start;
        } else if (end) {
            return orderDate <= end;
        }
        return true; // Không có điều kiện lọc
    });

    // Lặp qua danh sách đã lọc và tổng hợp dữ liệu
    filteredCustomerList.forEach(order => {
        let customerId = String(order.customerId); // Chuyển về chuỗi

        // Khởi tạo khách hàng nếu chưa tồn tại
        if (!customerReport[customerId]) {
            customerReport[customerId] = {
                customerId: customerId,
                totalSpent: 0,
                orderCount: 0,
                username: "",
            };
        }

        // Cập nhật số liệu
        customerReport[customerId].orderCount++;
        customerReport[customerId].totalSpent += order.orderTotalPrice || 0;
    });

    // Thêm tên người dùng từ userMap
    Object.keys(customerReport).forEach(customerId => {
        customerReport[customerId].username = userMap.get(customerId) || "Unknown";
    });

    // Sắp xếp báo cáo theo yêu cầu
    let sortedReport;
    if (sortBy === 'asc') {
        // Tăng dần theo tổng chi tiêu
        sortedReport = Object.values(customerReport).sort((a, b) => a.totalSpent - b.totalSpent);
    } else if (sortBy === 'desc' || sortBy === '') {
        // Giảm dần theo tổng chi tiêu
        sortedReport = Object.values(customerReport).sort((a, b) => b.totalSpent - a.totalSpent);
    } else if (sortBy === 'az') {
        // A-Z theo tên người dùng
        sortedReport = Object.values(customerReport).sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === 'za') {
        // Z-A theo tên người dùng
        sortedReport = Object.values(customerReport).sort((a, b) => b.username.localeCompare(a.username));
    } else {
        // Mặc định giảm dần theo tổng chi tiêu
        sortedReport = Object.values(customerReport).sort((a, b) => b.totalSpent - a.totalSpent);
    }

    // Cắt số dòng theo tham số n nếu được cung cấp
    if (n && Number.isInteger(n) && n > 0) {
        return sortedReport.slice(0, n);
    }

    return sortedReport;
}

function updateDashboardHighlights(orderList, productStatistics) {
    // Kiểm tra nếu danh sách truyền vào rỗng hoặc null
    if (!orderList || orderList.length === 0) {
        orderList = [];
    }
    if (!productStatistics || productStatistics.length === 0) {
        productStatistics = [];
    }

    // Tổng doanh thu
    const totalRevenue = orderList.reduce((sum, order) => {
        const price = parseFloat(order.orderTotalPrice) || 0;
        return sum + price;
    }, 0);

    // Tổng đơn hàng
    const totalOrders = orderList.length;

    // Sản phẩm bán chạy nhất dựa vào doanh thu
    const bestSellingProduct = productStatistics.reduce((max, product) =>
        (product.totalRevenue > max.totalRevenue ? product : max),
        { totalRevenue: 0, src: "", id: "Mã sản phẩm" }
    );

    // Tính tổng khách mua hàng duy nhất
    const uniqueCustomers = new Set(orderList.map(order => order.customerId));
    const totalCustomer = uniqueCustomers.size;

    // Cập nhật DOM cho các phần tử highlight
    document.querySelectorAll(".dashboard-highlight-box")[0].querySelector("h3").textContent = `${totalRevenue.toLocaleString()} đ`;
    document.querySelectorAll(".dashboard-highlight-box")[1].querySelector("h3").textContent = totalOrders;
    document.querySelectorAll(".dashboard-highlight-box")[2].querySelector("h3").textContent = totalCustomer;

    // Cập nhật sản phẩm nổi bật
    const productImageElement = document.querySelector(".dashboard-highlight-box-product img");
    const productIdElement = document.querySelector("#productId");

    if (bestSellingProduct && bestSellingProduct.src) {
        productImageElement.src = bestSellingProduct.src || "default-image-path.jpg"; // Đường dẫn ảnh mặc định nếu cần
        productIdElement.textContent = bestSellingProduct.id;
    } else {
        productImageElement.src = "./assets/images/default-highlight.png"; // Đường dẫn ảnh mặc định
        productIdElement.textContent = "Mã sản phẩm";
    }
}

function search() {
    document.getElementById('object-id').addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            const sortType = document.getElementById('sortTypeStatistic').value;

            if (sortType === 'product') {
                let productStatistics = generateProductStatistics(validOrderList);
                searchByProduct(productStatistics);
            } else if (sortType === 'customer') {
                let customerStatistics = generateCustomerStatistics(validOrderList);
                searchByCustomer(customerStatistics);
            }
        }
    });

    document.getElementById('object-id').addEventListener('input', function () {
        if (this.value.trim() === "") {
            const sortType = document.getElementById('sortTypeStatistic').value;
            const objectIdInput = document.getElementById("object-id");

            if (sortType === 'product') {
                // Reset placeholder và dữ liệu theo sản phẩm
                let productStatistics = generateProductStatistics(validOrderList);
                pagination(productStatistics, 1, showProductStatistics, "#main-content-dashboard");
                objectIdInput.placeholder = "Nhập mã sản phẩm";
            } else if (sortType === 'customer') {
                // Reset placeholder và dữ liệu theo khách hàng
                let customerStatistics = generateCustomerStatistics(validOrderList);
                pagination(customerStatistics, 1, showCustomerStatistics, "#main-content-dashboard");
                objectIdInput.placeholder = "Nhập mã khách hàng";
            }
        }
    });
}

function searchByProduct(productStatistic) {
    const inputField = document.getElementById('object-id').value.trim().toUpperCase();

    if (!inputField) {
        createNotificationAdmin("Vui lòng nhập mã hoặc tên sản phẩm!");
        return;
    }

    const productReport = productStatistic.filter(product => {
        const productId = product.id ? product.id.toUpperCase() : "";
        const productName = product.name ? product.name.toUpperCase() : "";
        return productId.includes(inputField) || productName.includes(inputField);
    });

    if (productReport.length === 0) {
        createNotificationAdmin("Không tìm thấy sản phẩm phù hợp!");
    } else {
        pagination(productReport, 1, showProductStatistics, "#main-content-dashboard");
    }
}

function searchByCustomer(customerStatistic) {
    const inputField = document.getElementById('object-id').value.trim().toUpperCase();

    if (!inputField) {
        createNotificationAdmin("Vui lòng nhập mã hoặc tên khách hàng!");
        return;
    }

    const customerReport = customerStatistic.filter(customer => {
        const customerId = customer.customerId ? customer.customerId.toUpperCase() : "";
        const customerName = customer.username ? customer.username.toUpperCase() : "";
        return customerId.includes(inputField) || customerName.includes(inputField);
    });

    if (customerReport.length === 0) {
        createNotificationAdmin("Không tìm thấy khách hàng phù hợp!");
    } else {
        pagination(customerReport, 1, showCustomerStatistics, "#main-content-dashboard");
    }
}

export function showOrdersListByProductId() {
    document.querySelectorAll(".order-list-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = button.getAttribute("data-product-id");

            // Lọc các đơn hàng theo mã sản phẩm
            const ordersForProduct = filterForOrder(validOrderList.filter(order =>
                order.orderProduct.some(product => product.id === productId)));

            showMain("main-content-dashboard-orderList");

            // Quay lại trang trướctrước
            document.querySelector(".comeback-product").onclick = (e) => {
                showMain("main-content-dashboard");
                pagination(productStatistics, 1, showProductStatistics, "#main-content-dashboard");
            };
            pagination(ordersForProduct, 1, showListOrder, "#main-content-dashboard-orderList");

            document.getElementById('filterBtn').addEventListener('click', () => {
                // Lấy các giá trị từ giao diện
                const sortType = document.getElementById('sortType').value || null;
                const rowCount = parseInt(document.getElementById('row-count').value) || null;
                const startDate = document.getElementById('from-date').value || null;
                const endDate = document.getElementById('to-date').value || null;

                // Sao chép danh sách để không thay đổi dữ liệu gốc
                let filteredOrders = [];

                // Lọc theo input
                filteredOrders = filterForOrder(ordersForProduct, sortType, rowCount, startDate, endDate);
                pagination(filteredOrders, 1, showListOrder, "#main-content-dashboard-orderList");
            });

            document.getElementById('resetBtn').addEventListener('click', () => {

                pagination(ordersForProduct, 1, showListOrder, "#main-content-dashboard-orderList");

                // Reset các input khác về trạng thái mặc định
                document.getElementById('sortType').value = 'desc';
                document.getElementById('row-count').value = '';
                document.getElementById('from-date').value = "";
                document.getElementById('to-date').value = "";
            });
        });
    });
}

export function showOrdersListByCustomerId() {
    document.querySelectorAll(".order-list-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            let doneOrder = getValidOrders();
            const customerId = button.getAttribute("data-customer-id");
            const ordersForCustomer = filterForOrder(doneOrder.filter(order => String(order.customerId) === customerId));

            showMain("main-content-dashboard-orderList");

            document.querySelector(".comeback-product").onclick = (e) => {
                showMain("main-content-dashboard");
                const customerStatistics = generateCustomerStatistics(validOrderList);
                pagination(customerStatistics, 1, showCustomerStatistics, "#main-content-dashboard");
            };
            pagination(ordersForCustomer, 1, showListOrder, "#main-content-dashboard-orderList");

            document.getElementById('filterBtn').addEventListener('click', () => {
                // Lấy các giá trị từ giao diện
                const sortType = document.getElementById('sortType').value || null;
                const rowCount = parseInt(document.getElementById('row-count').value) || null;
                const startDate = document.getElementById('from-date').value || null;
                const endDate = document.getElementById('to-date').value || null;

                // Sao chép danh sách để không thay đổi dữ liệu gốc
                let filteredOrders = [];

                // Lọc theo input
                filteredOrders = filterForOrder(ordersForCustomer, sortType, rowCount, startDate, endDate);
                pagination(filteredOrders, 1, showListOrder, "#main-content-dashboard-orderList");
            });

            document.getElementById('resetBtn').addEventListener('click', () => {

                pagination(ordersForCustomer, 1, showListOrder, "#main-content-dashboard-orderList");

                // Reset các input khác về trạng thái mặc định
                document.getElementById('sortType').value = 'desc';
                document.getElementById('row-count').value = '';
                document.getElementById('from-date').value = "";
                document.getElementById('to-date').value = "";
            });
        });
    });
}
