import { pagination, showListOrder } from "../showList/show.js";
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
                <option value="tat-ca">Tất cả</option>
                <option value="pending">Chưa xử lý</option>
                <option value="accepted">Đã xác nhận</option>
                <option value="shipped">Đã giao</option>
                <option value="canceled">Đã huỷ</option>
            </select>
        </div>
        <div class="order-filter-group">
        <label for="district-sort">Sắp xếp quận</label>
        <select id="district-sort" name="order-district-sort">
            <option value="tat-ca">Không xếp</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
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
        const orderSort = orderFilterForm["order-district-sort"].value;
        const orderList = JSON.parse(localStorage.getItem("orderList"));

        const filteredOrders = orderList.filter((order) => {
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
        // console.log(orderSort);
        if(orderSort === "asc"){
            filteredOrders.sort(cmpFuncAsc);
        } else
        if(orderSort === "desc"){
            filteredOrders.sort(cmpFuncDesc);
        }
        // console.log(filteredOrders);
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    resetBtn.addEventListener('click', (event) => {
        setTimeout(() => {
            applyBtn.click();
            10;
        })
        
    });
}

function compareDate(orderDate, startDate, endDate){
    if(startDate === "tat-ca" && endDate === "tat-ca"){
        return true;
    }

    let tmp = orderDate.split(" ")[1].split("/");
    orderDate = "";
    orderDate += tmp[2] + "-";
    if(tmp[1].length === 1){
        orderDate += ("0" + tmp[1] + "-");
    } else{
        orderDate += (tmp[1] + "-");
    }

    if(tmp[0].length === 1){
        orderDate += ("0" + tmp[0]);
    } else{
        orderDate += tmp[0];
    }

    if(startDate !== "tat-ca" && endDate !== "tat-ca"){
        const d1 = new Date(startDate);
        const d2 = new Date(orderDate);
        const d3 = new Date(endDate);
        if(d1.getTime() <= d2.getTime() && d2.getTime() <= d3.getTime()){
            return true;
        }

        return false;
    }

    if(startDate === "tat-ca"){
        const d2 = new Date(orderDate);
        const d3 = new Date(endDate);
        if(d2.getTime() <= d3.getTime()){
            return true;
        }

        return false;
    }

    if(endDate === "tat-ca"){
        const d1 = new Date(startDate);
        const d2 = new Date(orderDate);
        console.log(startDate + " " + orderDate);
        console.log(d1.getTime() + " " + d2.getTime());
        if(d1.getTime() <= d2.getTime()){
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
    const arr  = order.orderAddressToShip.split(",");
    // console.log(arr);
    let district = "";
    const arrLength = arr.length;
    for(let i = 0; i < arrLength; i++){
        if(arr[i].toLowerCase().includes("quận")){
            district = arr[i];
            break;
        }
    }

    if(district !== ""){ 
        district = district.trim().replace(/\s+/g, " ").toLowerCase();
        const tmp = district.split(" ");

        const newTmp = tmp.map((word) => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        });
        district = newTmp.join(" ");
    }
    if(district.trim() === ""){
        district = "Chưa rõ";
    }
    return district;
}


