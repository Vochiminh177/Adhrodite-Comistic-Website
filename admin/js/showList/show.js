import { productItemArray, usersList } from "../../../database/database.js"
import { deleteProduct, editProduct, filterProductAdmin, searchProduct } from "../updateProduct/OptionProduct.js";
import { blockCustomer, deleteCustomer, editCustomer, searchCustomer } from "../updateCustomer/optionCustomer.js";
import { createOrderRow, generateOrderEvents } from "../updateOrder/handleOrders.js"
function createPage(list, currentPage, showList, main){
    let itemPerPage = 7;
    let totalPage = Math.ceil(list.length / itemPerPage);
    // console.log(totalPage);
    let firstPage = currentPage - 2;
    let lastPage = currentPage + 2;
    if(firstPage <= 0){
        firstPage = 1;
        lastPage = 5;
    }
    if(lastPage >= totalPage){
        lastPage = totalPage;   
    }
    // Tạo listpage, số trang
    let eleUl = document.createElement("ul");
    eleUl.className = "listPage";
    eleUl.innerHTML += `<li><a href="" class="left-page"><</a></li>`;
    // console.log(firstPage, lastPage, totalPage)
    for(let i = firstPage; i <= lastPage; i++){
        if(currentPage == i){
            eleUl.innerHTML += `<li><a href="" class="page-number active-page">${i}</a></li>`;
        }
        else eleUl.innerHTML += `<li><a href="" class="page-number">${i}</a></li>`;
    }
    eleUl.innerHTML += `<li><a href="" class="right-page">></a></li>`;
    document.querySelector(main).querySelector(".list-page").innerHTML = eleUl.outerHTML;
    //------------------------------------------
    //-----In ra danh sách list---------
    let start = (currentPage - 1) * itemPerPage;
    let end = start + itemPerPage;
    showList(start, end, currentPage, list);
    //------------------------------------------
    //--gán sự kiện----
    document.querySelector(main).querySelector(".left-page").onclick = (e) => {
        e.preventDefault();
        document.getElementById('main-content-product-list').scrollTo(0, 0);
        if(currentPage-1>0){
            createPage(list, currentPage-1, showList, main);
        }
    };
    document.querySelector(main).querySelector(".right-page").onclick = (e) => {
        e.preventDefault();
        document.getElementById('main-content-product-list').scrollTo(0, 0);
        if(currentPage+1<=totalPage){
            createPage(list, currentPage+1, showList, main);
        }
    };
    document.querySelector(main).querySelectorAll(".page-number").forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            document.getElementById('main-content-product-list').scrollTo(0, 0);
            createPage(list, parseInt(obj.textContent), showList, main);
        }
    });
}

export function pagination(list, currentPage, showList, main){
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
        if(index>=start && index < end){
        eleTbody.innerHTML += `
            <tr>
                <td id="piture"><img style="width: 70px; height:90%;" src=${ele.src}></td>
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

export function showListCustomer(start, end, currentPage, userList){
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
        if(index >= start && index < end){
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

export function showListOrder(start, end, curentPage, orderList){  
    document.querySelector('.content-order-table-body').innerHTML = "";
    end = Math.min(end, orderList.length);
    for(let i = start; i < end; i++){
        createOrderRow(orderList[i]);
    }

    generateOrderEvents(start, end, orderList);
}

export function showProductStatistics(start, end, productList) {
    // Tính tổng số lượng và doanh thu
    let totalQuantity = 0;
    let totalRevenue = 0;
    let bestSellingProduct = null;
    let leastSellingProduct = null;

    // Tạo bảng HTML
    let tableContent = `
    <thead>
        <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Thương hiệu</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Doanh thu</th>
            <th>Tùy chọn</th>
        </tr>
    </thead>
    `;

    let eleTbody = document.createElement("tbody");
    productList.forEach((product, index) => {
        if (index >= start && index < end) {
            let revenue = product.price * product.quantity;
            totalQuantity += product.quantity;
            totalRevenue += revenue;

            // Kiểm tra sản phẩm bán chạy và ế nhất
            if (!bestSellingProduct || product.quantity > bestSellingProduct.quantity) {
                bestSellingProduct = product;
            }
            if (!leastSellingProduct || product.quantity < leastSellingProduct.quantity) {
                leastSellingProduct = product;
            }

            // Thêm dòng sản phẩm vào bảng
            eleTbody.innerHTML += `
                <tr>
                    <td><img style="width: 70px; height: 90%;" src="${product.src}"></td>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>${product.category}</td>
                    <td>${product.price.toLocaleString()} đ</td>
                    <td>${product.quantity}</td>
                    <td>${revenue.toLocaleString()} đ</td>
                </tr>
            `;
        }
    });

    tableContent += eleTbody.outerHTML;
    document.querySelector(".content .content-product-list table").innerHTML = tableContent;

    // Hiển thị thống kê
    console.log(`Tổng số lượng bán ra: ${totalQuantity}`);
    console.log(`Tổng doanh thu: ${totalRevenue.toLocaleString()} đ`);
    console.log(`Sản phẩm bán chạy nhất: ${bestSellingProduct?.name} (${bestSellingProduct?.quantity} cái)`);
    console.log(`Sản phẩm ế nhất: ${leastSellingProduct?.name} (${leastSellingProduct?.quantity} cái)`);
}
