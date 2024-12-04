// import { productItemArray, userList } from "../../../user/./"
import { deleteProduct, editProduct, filterProductAdmin, searchProduct } from "../updateProduct/OptionProduct.js";
import { blockCustomer, deleteCustomer, editCustomer, searchCustomer } from "../updateCustomer/optionCustomer.js";
import { createOrderRow, generateOrderEvents } from "../updateOrder/handleOrders.js";
import {showResult} from "../base/baseFunction.js";
function createPage(list, currentPage, showList, main) {
    let itemPerPage = 7;
    let totalPage = Math.ceil(list.length / itemPerPage);

    let pageList = main + " .list-page"
    console.log(pageList)
    if(totalPage === 1){
        document.querySelector(pageList).style.display = "none";
    }
    else document.querySelector(pageList).style.display = "block";

    let firstPage = currentPage - 2;
    let lastPage = currentPage + 2;

    if (firstPage <= 0) {
        firstPage = 1;
        lastPage = 5;
    }
    if (lastPage >= totalPage) {
        lastPage = totalPage;
    }

    // Tạo listpage, số trang
    let eleUl = document.createElement("ul");
    eleUl.className = "listPage";
    eleUl.innerHTML += `<li><a href="" class="left-page"><</a></li>`;
    
    // Tạo các số trang
    for (let i = firstPage; i <= lastPage; i++) {
        if (currentPage == i) {
            eleUl.innerHTML += `<li><a href="" class="page-number active-page">${i}</a></li>`;
        } else {
            eleUl.innerHTML += `<li><a href="" class="page-number">${i}</a></li>`;
        }
    }
    eleUl.innerHTML += `<li><a href="" class="right-page">></a></li>`;
    
    // Gán phần tử phân trang vào DOM
    const listPageElement = document.querySelector(main).querySelector(".list-page");
    if (listPageElement) {
        listPageElement.innerHTML = eleUl.outerHTML;
    }

    //------------------------------------------
    //----- In ra danh sách list
    let start = (currentPage - 1) * itemPerPage;
    let end = start + itemPerPage;
    showList(start, end, currentPage, list);
    //------------------------------------------

    //-- Gán sự kiện cho các nút phân trang
    const leftPageButton = document.querySelector(main).querySelector(".left-page");
    const rightPageButton = document.querySelector(main).querySelector(".right-page");
    const pageNumberButtons = document.querySelector(main).querySelectorAll(".page-number");

    if (leftPageButton) {
        leftPageButton.onclick = (e) => {
            e.preventDefault();
            if (currentPage - 1 > 0) {
                createPage(list, currentPage - 1, showList, main);
            }
        };
    }

    if (rightPageButton) {
        rightPageButton.onclick = (e) => {
            e.preventDefault();
            if (currentPage + 1 <= totalPage) {
                createPage(list, currentPage + 1, showList, main);
            }
        };
    }

    pageNumberButtons.forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            createPage(list, parseInt(obj.textContent), showList, main);
        };
    });
}

export function pagination(list, currentPage, showList, main) {

    createPage(list, currentPage, showList, main);
}


export function showListProduct(start, end, currentPage, productList) {

    //tạo danh sách sản phẩm từ mảng chèn vô bảng table
    let product = `
    <thead>
        <tr>
            <th class="picture-list">Hình ảnh</th>
            <th class="id-list">Mã</th>
            <th class="name-list">Tên</th>
            <th class="brand-list">Thương hiệu</th>
            <th class="category-list">Danh mục</th>
            <th class="price-list">Giá</th>
            <th class="quantity-list">Số lượng</th>
            <th class="option-list">Tùy chỉnh</th>
        </tr>
    </thead>    
    `;
    let eleTbody = document.createElement("tbody");
    productList.forEach((ele, index) => {
        if (index >= start && index < end) {
            eleTbody.innerHTML += `
            <tr>
                <td id="piture"><img src=${ele.src}></td>
                <td id="id">${ele.id}</td>
                <td id="name">${ele.name}</td>
                <td id="brand">${ele.brand}</td>
                <td id="category">${ele.category}</td>
                <td id="price">${ele.price}</td>
                <td id="quantity">${ele.quantity}</td>
                <td>
                    <a href="" class="edit-product" index-item=${index}>Sửa</a>
                    <a href="" class="delete-product" index-item=${index}>Xóa</a>
                </td>
            </tr>
        `;
        }
    });
    product += eleTbody.outerHTML;
    document.querySelector(".content .content-product-list table").innerHTML = product;
    deleteProduct();
    editProduct(currentPage);
    searchProduct();
}

export function showListCustomer(start, end, currentPage, userList) {
    let user = `
    <thead>
        <tr>
            <th class="id-user-list">Id</th>
            <th class="username-list">Tài khoản</th>
            <th class="fullname-list">Họ tên</th>
            <th class="type-user">Loại</th>
            <th class="edit-user">Chỉnh sửa</th>
        </tr>
    </thead>
    `;
    let eleTbody = document.createElement("tbody");
    let objType = {
        customer: "Khách hàng",
        employer: "Nhân viên",
        admin: "Admin"
    }
    userList.forEach((ele, index) => {
        if (index >= start && index < end) {
            eleTbody.innerHTML += `
                <tr>
                    <td id="id-user">${ele.id}</td>
                    <td id="username">${ele.username}</td>
                    <td id="fullname">${(ele.first_name ? ele.first_name : 'chưa') + " " + (ele.last_name ? ele.last_name : 'có')}</td>
                     <td id="fullname">${objType[ele.type]}</td>
                    <td>
                        <a href="" class="edit-customer" index-item=${index}>Sửa</a>
                        <a href="" class="delete-customer" index-item=${index}>Xóa</a>
                        <a href="" class="block-customer" index-item=${index}>${ele.blockStatus ? "Mở khóa" : "Khóa"}</a>
                    </td>
                </tr>
            `;
        }
    });
    user += eleTbody.outerHTML;
    document.querySelector(".content .content-customer-list table").innerHTML = user;
    deleteCustomer();
    editCustomer(currentPage);
    searchCustomer();
    blockCustomer();
}

export function showListOrder(start, end, curentPage, orderList) {
    document.querySelector('.content-order-table-body').innerHTML = "";
    end = Math.min(end, orderList.length);
    for (let i = start; i < end; i++) {
        createOrderRow(orderList[i]);
    }

    generateOrderEvents(start, end, orderList);
}

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

    console.log(productReport); 

    // Chuyển đổi thành mảng và sắp xếp theo doanh thu giảm dần
    return Object.values(productReport).sort((a, b) => b.totalRevenue - a.totalRevenue);
}

// hàm tạo bảng thống kê từ dữ liệu phân tích được 
export function showProductStatistics(start, end, currentPage, productStatistics) {

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

    let eleTbody = document.createElement("tbody");

    productStatistics.forEach((product, index) => {
        if (index >= start && index < end) {
            eleTbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.src}" style="width: 70px; height:70px;"></td>
                <td>${product.price.toLocaleString()}</td>
                <td>${product.totalQuantity}</td>
                <td>${product.totalRevenue.toLocaleString()}</td>
                <td>
                    <button class="order-list-btn" data-product-id="${product.id}">Đơn hàng</button>
                </td>
            </tr>`;
        }
    });

    tableContent += eleTbody.outerHTML;
    document.querySelector(".dashboardTable").innerHTML = tableContent;

    showResult(currentPage);
}