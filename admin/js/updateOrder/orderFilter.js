export function generateOrderFilter(){
    const orderFilterContainer = document.getElementById('order-filter-container');
    orderFilterContainer.innerHTML = `
        <form id="order-filter-form" name="order-filter-form">
        <div class="order-filter-group">
            <label for="start-date">Ngày đầu</label>
            <input type="date" id="start-date" name="start-date">
        </div>
        <div class="order-filter-group">
            <label for="end-date">Ngày cuối</label>
            <input type="date" id="end-date" name="end-date">
        </div>
        <div class="order-filter-group">
            <label for="status">Trạng thái</label>
            <select id="status" name="order-status">
                <option value="all">Tất cả</option>
                <option value="pending">Chưa xử lý</option>
                <option value="accepted">Đã xác nhận</option>
                <option value="shipped">Đã giao</option>
                <option value="canceled">Đã huỷ</option>
            </select>
        </div>
        <div class="order-filter-group">
            <label for="district">Quận</label>
            <select id="district" name="order-district">
                <option value="all">Tất cả</option>
            </select>
        </div>
        <div class="order-filter-actions">
            <input type="submit" class="order-btn order-btn-apply" id="order-apply-btn" value="Áp dụng"></input>
            <input type="reset" class="order-btn order-btn-reset" id="order-reset-btn" value="Đặt lại"></input>
        </div>
        </form>
    `;

    const applyBtn = document.getElementById('order-apply-btn');
    const resetBtn = document.getElementById('order-reset-btn');

    applyBtn.addEventListener('click', (event) => {
        event.preventDefault();
    
        const orderFilterForm = document.forms["order-filter-form"];
        const startDate = orderFilterForm["start-date"].value;
        const endDate = orderFilterForm["end-date"].value;
        const orderStatus = orderFilterForm["order-status"].value;
        const orderDistrict = orderFilterForm["order-district"].value;
        const orderList = JSON.parse(localStorage.getItem("orderList"));
        const filteredOrders = orderList.filter((order) => {
            if(orderStatus === "all" || order.orderStatus === orderStatus){
            }
            
            if(orderDistrict === "all" || findDistrictOfOrder(order) === orderDistrict){
                console.log(findDistrictOfOrder(order));
            }

            return true;
        });
    });

    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
    });
}

function findDistrictOfOrder(order){
    console.log(order.orderAddressToShip);
    const tmp = order.orderAddressToShip.trim().replace(",", " ").replace(/\s+/g, " ").split(" ");
    return tmp;
}


