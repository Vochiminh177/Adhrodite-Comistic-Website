export function updateDashboardHighlights(orderList, productStatistics) {
    // Tổng doanh thu
    // const totalRevenue = orderList.reduce((sum, order) => {
    //     const price = parseFloat(order.orderTotalPrice); 
    //     return sum + price;
    // }, 0);

    const totalRevenue = orderList.reduce((sum, order, index) => {
        const price = parseFloat(order.orderTotalPrice) || 0; // Kiểm tra giá trị chuyển đổi
        console.log(`Bước ${index + 1}:`);
        console.log(`- Giá trị đơn hàng hiện tại: ${order.orderTotalPrice}`);
        console.log(`- Giá trị sau khi parseFloat: ${price}`);
        console.log(`- Tổng trước khi cộng: ${sum}`);
        const newSum = sum + price;
        console.log(`- Tổng sau khi cộng: ${newSum}`);
        console.log('--------------------------------------');
        return newSum;
    }, 0);
    
    console.log(`Tổng doanh thu cuối cùng: ${totalRevenue}`);
    

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

    if (bestSellingProduct) {
        const productImageElement = document.querySelector(".dashboard-highlight-box-product img");
        const productIdElement = document.querySelector("#productId");

        productImageElement.src = bestSellingProduct.src; // Đảm bảo truy cập đúng thuộc tính chứa hình ảnh
        productIdElement.textContent = bestSellingProduct.id;
    }
}
