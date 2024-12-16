import { pagination, showListOrder } from "../showList/show.js";
import { locationToSelectArray } from "../../../database/database.js";
export function generateOrderFilter(){
    const orderFilterContainer = document.getElementById('order-filter-container');
    orderFilterContainer.innerHTML = `
    <form class="order-filter-form" id="order-filter-form" name="order-filter-form">
        <div class="order-filter-row">
            <div class="order-filter-group">
                <label for="orderID-search">Tìm kiếm</label>
                <input type="text" id="orderID-search" placeholder="Nhập mã đơn hàng" name="orderID-search">
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
            <div class="order-filter-buttons">
                <input type="submit" class="order-filter-button" id="order-apply-btn" value="Lọc"></input>
                <input type="reset" class="order-filter-button" id="order-reset-btn" value="Xoá"></input>
            </div>
        </div>
        <div class="order-filter-row">
            <div class="order-filter-group">
                <label for="city-select">Tỉnh/TP</label>
                <select id="city-select" name="order-city">
                </select>
            </div>
            <div class="order-filter-group">
                <label for="district-select">Quận</label>
                <select id="district-select" name="order-district">
                </select>
            </div>
            <div class="order-filter-group">
                <label for="order-date-sort">Thời gian đặt hàng</label>
                <select id="order-date-sort" name="order-date-sort">
                    <option value="asc">Cũ nhất</option>
                    <option value="desc">Mới nhất</option>
                </select>
            </div>
            <div class="order-filter-group">
                <label for="status">Trạng thái</label>
                <select id="order-status" name="order-status">
                    <option value="tat-ca">Tất cả</option>
                    <option value="pending">Chưa xử lý</option>
                    <option value="accepted">Đã xác nhận</option>
                    <option value="shipped">Đã giao</option>
                    <option value="canceled">Đã huỷ</option>
                </select>
            </div>
        </div>
    </form>
    `;

    generateCityAdDistrictSelect();
    setUpEventListener();
}

function setUpEventListener(){
    const applyBtn = document.getElementById('order-apply-btn');
    const resetBtn = document.getElementById('order-reset-btn');
    const citySelect = document.getElementById("city-select");
    const districtSelect = document.getElementById("district-select");
    const orderDateSortSelect = document.getElementById("order-date-sort");
    const orderStatusSelect = document.getElementById("order-status");

    applyBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    resetBtn.addEventListener('click', () => {
        setTimeout(() => {
            applyBtn.click();
            10;
        })
    });

    citySelect.addEventListener("change", () => {
        generateDistrictOfCity(citySelect.value);
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    districtSelect.addEventListener("change", () => {
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    orderDateSortSelect.addEventListener("change", () => {
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });

    orderStatusSelect.addEventListener("change", () => {
        const filteredOrders = filterOrders();
        pagination(filteredOrders, 1, showListOrder, "#main-content-order");
    });
}

export function filterOrders(){
    const orderFilterForm = document.forms["order-filter-form"];
    const orderIDsearchTerm = orderFilterForm["orderID-search"].value;
    const startDate = orderFilterForm["start-date"].value;
    const endDate = orderFilterForm["end-date"].value;
    const orderCity = orderFilterForm["order-city"].value;
    const orderDistrict = orderFilterForm["order-district"].value;
    const orderDateSort = orderFilterForm["order-date-sort"].value;
    const orderStatus = orderFilterForm["order-status"].value;
    const orderList = JSON.parse(localStorage.getItem("orderList"));

    if(startDate && endDate){
        if(startDate > endDate){
            orderFilterForm["start-date"].style.borderColor = "red";
            orderFilterForm["start-date"].onfocus = () => {
                orderFilterForm["start-date"].style.borderColor = "black";
            }
            return [];
        }
    }
    const filteredOrders = orderList.filter((order) => {
        if(orderIDsearchTerm && orderIDsearchTerm !== (order.orderId + "")) return false;
        if(orderStatus !== "tat-ca" && order.orderStatus !== orderStatus) return false;
        if(orderCity !== "tat-ca" && getCityOfString(orderCity) !== getCityOfString(order.orderAddressToShip)) return false;
        if(orderDistrict !== "tat-ca" && getDistrictOfString(orderDistrict) !== getDistrictOfString(order.orderAddressToShip)) return false;
        if(!startDate && !endDate){
            if(!compareDate(order.orderDate, null, null)){
                return false;
            }
        } else
        if(!startDate){
            if(!compareDate(order.orderDate, null, endDate)){
                return false;
            }
        } else
        if(!endDate){
            if(!compareDate(order.orderDate, startDate, null)){
                return false;
            }
        } else{
            if(!compareDate(order.orderDate, startDate, endDate)){
                return false;
            }
        }
        return true;
    });

    if(orderStatus === "tat-ca"){
        if(orderDateSort === "asc"){
            filteredOrders.sort(orderStatusAndOrderdateSortAsc);
        } else
        if(orderDateSort === "desc"){
            filteredOrders.sort(orderStatusAndOrderdateSortDesc);
        }
    } else
    if(orderDateSort === "asc"){
        filteredOrders.sort(sortOrderByDateAsc);
    } else
    if(orderDateSort === "desc"){
        filteredOrders.sort(sortOrderByDateDesc);
    }
    return filteredOrders;
}

function getDate(orderDate){
    // orderDate hh:mm:ss dd/mm/yyyy
    let tmp = orderDate.split(" ")[1].split("/");
    tmp[2] = tmp[2].padStart(4, "0");
    tmp[1] = tmp[1].padStart(2, "0");
    tmp[0] = tmp[0].padStart(2, "0");
    orderDate = tmp.reverse().join("-");
    return orderDate;
}

function getTime(orderDate){
    // orderDate hh:mm:ss dd/mm/yyyy
    let tmp = orderDate.split(" ")[0].split(":");
    tmp[0] = tmp[0].padStart(2, "0");
    tmp[1] = tmp[1].padStart(2, "0");
    tmp[2] = tmp[2].padStart(2, "0");
    orderDate = tmp.join(":");
    return orderDate;
}
function compareDate(orderDate, startDate, endDate){
    if(!startDate && !endDate){
        return true;
    }

    orderDate = getDate(orderDate);
    // startDate, endDate yyyy-mm-dd
    if(startDate && endDate){
        if(startDate <= orderDate && orderDate <= endDate){
            return true;
        }

        return false;
    }

    if(!startDate){
        if(orderDate <= endDate){
            return true;
        }

        return false;
    }

    if(!endDate){
        if(startDate <= orderDate){
            return true;
        }

        return false;
    }
}

// function cmpFuncAsc(first, second){
//     first = getDistrictOfString(first.orderAddressToShip);
//     second = getDistrictOfString(second.orderAddressToShip);
//     if(!first) return 1;
//     if(!second) return -1;
//     return first.localeCompare(second);
// }
// function cmpFuncDesc(first, second){
//     first = getDistrictOfString(first.orderAddressToShip);
//     second = getDistrictOfString(second.orderAddressToShip);
//     if(!first) return 1;
//     if(!second) return -1;
//     return second.localeCompare(first);
// }

function sortOrderByDateAsc(first, second){
    if(getDate(first.orderDate) < getDate(second.orderDate)){
        return -1;
    }

    if(getDate(first.orderDate) > getDate(second.orderDate)){
        return 1;
    }

    if(getTime(first.orderDate) < getTime(second.orderDate)){
        return -1;
    }

    return 1;
}
function sortOrderByDateDesc(first, second){
    if(getDate(first.orderDate) < getDate(second.orderDate)){
        return 1;
    }

    if(getDate(first.orderDate) > getDate(second.orderDate)){
        return -1;
    }

    if(getTime(first.orderDate) < getTime(second.orderDate)){
        return 1;
    }

    return -1;
}
export function orderStatusAndOrderdateSortAsc(first, second){
    const orderStatusValueMap = {
        "pending": 0,
        "accepted": 1,
        "canceled": 2,
        "shipped": 3
      };

    if(orderStatusValueMap[first.orderStatus] < orderStatusValueMap[second.orderStatus]){
        return -1;
    } else
    if(orderStatusValueMap[first.orderStatus] > orderStatusValueMap[second.orderStatus]){
        return 1;
    }

    return sortOrderByDateAsc(first, second);
}
function orderStatusAndOrderdateSortDesc(first, second){
    const orderStatusValueMap = {
        "pending": 0,
        "accepted": 1,
        "canceled": 2,
        "shipped": 3
      };

    if(orderStatusValueMap[first.orderStatus] < orderStatusValueMap[second.orderStatus]){
        return -1;
    } else
    if(orderStatusValueMap[first.orderStatus] > orderStatusValueMap[second.orderStatus]){
        return 1;
    }

    return sortOrderByDateDesc(first, second);
}

function generateDistrictOfCity(cityName){
    const districtSelect = document.getElementById("district-select");
    const selectedDistrict = districtSelect.value;
    if(cityName === "tat-ca"){
        const myMap = {};
        const cities = locationToSelectArray;
        const cityArrLength = locationToSelectArray.length;
        for(let i = 1; i < cityArrLength; i++){
            const districts = cities[i].districts;
            const districtArrLength = districts.length;
            for(let j = 1; j < districtArrLength; j++){
                const key = JSON.stringify(districts[j]);
                if(!myMap[key]){
                    myMap[key] = true;
                    const districtOption = document.createElement("option");
                    districtOption.value = districts[j].name;
                    districtOption.innerHTML = districts[j].name;
                    if(districts[j].name === selectedDistrict){
                        districtOption.setAttribute("selected", "");
                    }
                    districtSelect.appendChild(districtOption);
                }
            }
        }
    } else{
        districtSelect.innerHTML = `<option value="tat-ca">Tất cả</option>`;        
        const toDisplayCity = locationToSelectArray.find((city) => {
            return city.name === cityName;
        });

        const districts = toDisplayCity.districts;
        const districtsLength = districts.length;
        for(let i = 1; i < districtsLength; i++){
            const districtOption = document.createElement("option");
            districtOption.value = districts[i].name;
            districtOption.innerHTML = districts[i].name;
            if(districts[i].name === selectedDistrict){
                districtOption.setAttribute("selected", "");
            }
            districtSelect.appendChild(districtOption);
        }

    }
}

function generateCityAdDistrictSelect(){
    const myMap = {};
    const districtSelect = document.getElementById("district-select");
    const citySelect = document.getElementById("city-select");
    citySelect.innerHTML = `<option value="tat-ca">Tất cả</option>`;
    districtSelect.innerHTML = `<option value="tat-ca">Tất cả</option>`;
    const cities = locationToSelectArray;
    const cityArrLength = cities.length;
    for(let i = 1; i < cityArrLength; i++){
        const cityOption = document.createElement("option");
        cityOption.value = cities[i].name;
        cityOption.innerHTML = cities[i].name;
        citySelect.appendChild(cityOption);
        const districts = cities[i].districts;
        const districtArrLength = districts.length;
        for(let j = 1; j < districtArrLength; j++){
            const key = JSON.stringify(districts[j]);
            if(!myMap[key]){
                myMap[key] = true;
                const districtOption = document.createElement("option");
                districtOption.value = districts[j].name;
                districtOption.innerHTML = districts[j].name;
                districtSelect.appendChild(districtOption);
            }
        }
    }
}

export function getDistrictOfString(str){
    const arr = str.trim().replace(/\s+/g, " ").toLowerCase().split(",");
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

export function getCityOfString(str){
    const arr = str.trim().replace(/\s+/g, " ").toLowerCase().split(",");
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


