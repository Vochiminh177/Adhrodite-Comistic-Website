import { pagination, showListOrder } from "../showList/show.js";
export function generateOrderFilter(){
    const orderFilterContainer = document.getElementById('order-filter-container');
    orderFilterContainer.innerHTML = `
        <h2>Bộ lọc</h2>
        <form id="order-filter-form" name="order-filter-form">
            <div class="order-filter-orderID-search-container">
                <label for="orderID-search">Tìm mã đơn hàng</label>
                <input type="search" id="orderID-search" placeholder="Mã đơn hàng" name="orderID-search">
            </div>
            <div class="order-filter-start-end-date-container">
                <div class="order-filter-start-date-container">
                    <label for="start-date">Ngày đầu</label>
                    <input type="date" id="start-date" name="start-date">
                </div>
                <div class="order-filter-end-date-container">
                    <label for="end-date">Ngày cuối</label>
                    <input type="date" id="end-date" name="end-date">
                </div>
            </div>
        <div class="order-filter-order-status-container">
            <label for="status">Trạng thái</label>
            <select id="status" name="order-status">
                <option value="tat-ca">Tất cả</option>
                <option value="pending">Chưa xử lý</option>
                <option value="accepted">Đã xác nhận</option>
                <option value="shipped">Đã giao</option>
                <option value="canceled">Đã huỷ</option>
            </select>
        </div>
        <div class="order-filter-district-sort-container">
            <label for="district-sort">Sắp xếp quận</label>
            <select id="district-sort" name="order-district-sort">
                <option value="tat-ca">Không xếp</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
        </div>
        <div class="order-filter-buttons">
            <input type="submit" class="order-btn order-btn-apply" id="order-apply-btn" value="Áp dụng"></input>
            <input type="reset" class="order-btn order-btn-reset" id="order-reset-btn" value="Đặt lại"></input>
        </div>
        </form>
    `;

    const applyBtn = document.getElementById('order-apply-btn');
    const resetBtn = document.getElementById('order-reset-btn');

    applyBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    resetBtn.addEventListener('click', (event) => {
        setTimeout(() => {
            applyBtn.click();
            10;
        })
        
    });
}

export function filterOrders(){
    const orderFilterForm = document.forms["order-filter-form"];
    const startDate = orderFilterForm["start-date"].value;
    const endDate = orderFilterForm["end-date"].value;
    const orderStatus = orderFilterForm["order-status"].value;
    const orderSort = orderFilterForm["order-district-sort"].value;
    const orderList = JSON.parse(localStorage.getItem("orderList"));
    const orderIDsearchTerm = orderFilterForm["orderID-search"].value;
    if(startDate && endDate){
        if(startDate > endDate){
            orderFilterForm["start-date"].style.borderColor = "red";
            orderFilterForm["start-date"].onfocus = () => {
                orderFilterForm["start-date"].style.borderColor = "black";
            }
            return;
        }
    }
    const filteredOrders = orderList.filter((order) => {
        if(orderIDsearchTerm && orderIDsearchTerm !== (order.orderId + "")) return false;
        if(orderStatus !== "tat-ca" && order.orderStatus !== orderStatus) return false;
        if(!startDate && !endDate){
            if(!compareDate(order.orderDate, "tat-ca", "tat-ca")){
                return false;
            }
        } else
        if(!startDate){
            if(!compareDate(order.orderDate, "tat-ca", endDate)){
                return false;
            }
        } else
        if(!endDate){
            if(!compareDate(order.orderDate, startDate, "tat-ca")){
                return false;
            }
        } else{
            if(!compareDate(order.orderDate, startDate, endDate)){
                return false;
            }
        }
        return true;
    });

    if(orderSort === "asc"){
        filteredOrders.sort(cmpFuncAsc);
    } else
    if(orderSort === "desc"){
        filteredOrders.sort(cmpFuncDesc);
    }

    return filteredOrders;
}

function compareDate(orderDate, startDate, endDate){
    if(startDate === "tat-ca" && endDate === "tat-ca"){
        return true;
    }
    // orderDate hh:mm:ss dd/mm/yyyy
    // startDate, endDate yyyy-mm-dd
    let tmp = orderDate.split(" ")[1].split("/");
    tmp[2] = tmp[2].padStart(4, "0");
    tmp[1] = tmp[1].padStart(2, "0");
    tmp[0] = tmp[0].padStart(2, "0");
    orderDate = tmp.reverse().join("-");
    if(startDate !== "tat-ca" && endDate !== "tat-ca"){
        if(startDate <= orderDate && orderDate <= endDate){
            return true;
        }

        return false;
    }

    if(startDate === "tat-ca"){
        if(orderDate <= endDate){
            return true;
        }

        return false;
    }

    if(endDate === "tat-ca"){
        if(startDate <= orderDate){
            return true;
        }

        return false;
    }
}

function cmpFuncAsc(first, second){
    first = getDistrictOfOrder(first);
    second = getDistrictOfOrder(second);
    if(first === "Chưa rõ") return 1;
    if(second === "Chưa rõ") return -1;
    return first.localeCompare(second);
}
function cmpFuncDesc(first, second){
    first = getDistrictOfOrder(first);
    second = getDistrictOfOrder(second);
    if(first === "Chưa rõ") return 1;
    if(second === "Chưa rõ") return -1;
    return second.localeCompare(first);
}

export function getDistrictOfOrder(order){
    const arr  = order.orderAddressToShip.trim().replace(/\s+/g, " ").toLowerCase().split(",");
    let district = "";
    const arrLength = arr.length;
    for(let i = 0; i < arrLength; i++){
        if(arr[i].toLowerCase().includes("quận")){
            district = arr[i];
            break;
        }
    }

    district = district.trim();
    if(district !== ""){ 
        let tmp = district.split(" ");
        const idx = tmp.findIndex(item => item === "quận");
        tmp = tmp.slice(idx + 1);
        tmp = tmp.map((word) => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        });
        
        district = tmp.join(" ");
    }
    if(district === ""){
        district = undefined;
    }

    return district;
}

export function getCityOfOrder(order){
    const arr = order.orderAddressToShip.trim().replace(/\s+/g, " ").toLowerCase().split(",");
    let city = "";
    let length = arr.length;
    for(let i = 0; i < length; i++){
        if (
          arr[i].toLowerCase().includes("TP") ||
          arr[i].toLowerCase().includes("thành phố") ||
          arr[i].toLowerCase().includes("tỉnh") ||
          arr[i].toLowerCase().includes("thủ đô")
        ) {
            city = arr[i];
            break;
        }
    }

    city = city.trim();

    if(city !== ""){
        let tmp = city.split(" ");
        let idx = -1;
        length = tmp.length;
        for(let i = 0; i < length - 1; i++){
            if(tmp[i] === "thành" && tmp[i + 1] === "phố"){
                idx = i + 2;
                break;
            } else
            if(tmp[i] === "thủ" && tmp[i + 1] === "đô"){
                idx = i + 2;
                break;
            } else
            if(tmp[i] === "TP"){
                idx = i + 1;
                break;
            } else
            if(tmp[i] == "tỉnh"){
                idx = i + 1;
                break;
            }
        }
        
        tmp = tmp.slice(idx);
        tmp = tmp.map((word) => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        });

        city = tmp.join(" ");
    }

    if(city === ""){
        city = undefined;
    }

    return city;
}


