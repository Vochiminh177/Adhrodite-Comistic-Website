
const storedOrderList = JSON.parse(localStorage.getItem("orderList"));
const productStatistics = generateProductStatistics(storedOrderList);
console.log(productStatistics);
// hàm thống kê dữ liệu từ giỏ hàng
export function generateProductStatistics(orderList) {
    let productReport = {};

    orderList.forEach(order => {
        order.orderProduct.forEach(product => {
            let productId = product.id;

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

    // Chuyển đổi thành mảng và sắp xếp theo doanh thu giảm dần
    return Object.values(productReport).sort((a, b) => b.totalRevenue - a.totalRevenue);
}

// hàm tạo bảng thống kê từ dữ liệu phân tích được 
export function showProductStatistics(start, end, curentPage, productStatistics) {
    let tableContent = `
    <thead>
        <tr>
            <th>Mã sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá sản phẩm</th>
            <th>Tổng đơn hàng</th>
            <th>Tổng doanh thu</th>
            <th>Tùy chỉnh</th>
        </tr>
    </thead>`;

    let eleTbody = document.createElement('tbody');

    productStatistics.forEach((product, index) => {
        if (index >= start && index < end) {
            eleTbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.src}" alt="${product.name}" style="width:50px;height:50px;"></td>
                <td>${product.price.toLocaleString()}</td>
                <td>${product.totalQuantity}</td>
                <td>${product.totalRevenue.toLocaleString()}</td>
                <td>
                    <button id="orderListBtn" index-item=${index}>Đơn hàng</button>
                    <button onclick="editProduct('${product.id}')">Chỉnh sửa</button>
                </td>
            </tr>`;
        }
    });

    tableContent += eleTbody.outerHTML;
    document.querySelector(".content table").innerHTML = tableContent;
}