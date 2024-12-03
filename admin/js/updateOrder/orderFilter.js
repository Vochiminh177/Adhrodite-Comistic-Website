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
        const orderSort = orderFilterForm["order-district-sort"];
        const orderList = JSON.parse(localStorage.getItem("orderList"));
        console.log(startDate);
        console.log(endDate);
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
        if(orderSort === "asc"){
            
        } else
        if(orderSort === "desc"){

        }
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
    });
}

function compareDate(orderDate, startDate, endDate){
    if(startDate === "tat-ca" && endDate === "tat-ca"){
        return true;
    }

    let tmp = orderDate.split(" ").split("/");
    let orderDay = parseInt(tmp[0], 10);
    let orderMonth = parseInt(tmp[1], 10);
    let orderYear = parseInt(tmp[2], 10);
    
    let startDay = 0;
    let startMonth = 0;
    let startYear = 0;

    let endDay = 0;
    let endMonth = 0;
    let endYear = 0;
    
    if(startDate === "tat-ca"){
        tmp = endDate.split("-");
        endDay = parseInt(tmp[0], 10);
        endMonth = parseInt(tmp[1], 10);
        endYear = parseInt(tmp[2], 10);

        if(orderYear <= endYear){
            if(orderMonth <= endMonth){
                if(orderDay <= endDay){
                    return true;
                }
            }
        }
    }

    if(endDate === "tat-ca"){
        tmp = startDate.split("-");
        startDay = parseInt(tmp[0], 10);
        startMonth = parseInt(tmp[1], 10);
        startYear = parseInt(tmp[2], 10);
        if(startYear <= orderYear){
            if(startMonth <= orderMonth){
                if(startDay <= orderDay){
                    return true;
                }
            }
        }
    }

    if(startYear <= orderYear && orderYear <= endYear){
        if(startMonth <= orderMonth && orderMonth <= endMonth){
            if(startDay <= orderDay && orderDay <= endDay){
                return true;
            }
        }
    }

    return false;
}

function getDistrictOfOrder(order){
    console.log(order.orderAddressToShip);
    const arr  = order.orderAddressToShip.trim().replace(",", " ").replace(/\s+/g, " ").split(" ");
    let district = "";
    const arrLength = arr.lenth;
    for(let i = 0; i < arrLength; i++){
        if(arr[i].toLowerCase() === "quận"){
            if(i + 1 < arrLength){
                district = arr[i + 1];
                break;
            }
        }
    }
    return tmp;
}


