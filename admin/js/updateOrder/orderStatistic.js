export function generateOrderStatistic(){
    document.getElementById("order-statistic-container").innerHTML = `
    <h2>Thống kê đơn hàng</h2>
    <div>
        <div class="order-statistic-group">
            <span>Tổng đơn hàng:</span><span id="total-count"></span>
        </div>
        <div class="order-statistic-group">
            <span>Đang xử lý:</span><span id="pending-count"></span>
        </div>

        <div class="order-statistic-group">
            <span>Đã xác nhận:</span><span id="accepted-count"></span>
        </div>

        <div class="order-statistic-group">
            <span>Đã huỷ:</span><span id="canceled-count"></span>
        </div>

        <div class="order-statistic-group">
            <span>Đã giao:</span><span id="shipped-count"></span>
        </div>
    </div>
    `
    changeOrderStatusQuantity();
}

export function changeOrderStatusQuantity(){
    const orderList = JSON.parse(localStorage.getItem("orderList"));
    let totalCnt = 0;
    let pendingCnt = 0;
    let canceledCnt = 0;
    let acceptedCnt = 0;
    let shippedCnt = 0;
    orderList.forEach((order) => {
        totalCnt++;
        if(order.orderStatus === "pending"){
            pendingCnt++;
        } else
        if(order.orderStatus === "accepted"){
            acceptedCnt++;
        } else
        if(order.orderStatus === "canceled"){
            canceledCnt++;
        } else
        if(order.orderStatus === "shipped"){
            shippedCnt++;
        }
    });

    document.getElementById("total-count").innerHTML = totalCnt;
    document.getElementById("pending-count").innerHTML = pendingCnt;
    document.getElementById("accepted-count").innerHTML = acceptedCnt;
    document.getElementById("canceled-count").innerHTML = canceledCnt;
    document.getElementById("shipped-count").innerHTML = shippedCnt;
}
