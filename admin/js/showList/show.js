import { productItemArray, usersList } from "../../../database/database.js"
import { deleteProduct, editProduct } from "../updateProduct/OptionProduct.js";
import { deleteCustomer, editCustomer } from "../updateCustomer/optionCustomer.js";

function createPage(list, currentPage, showList, main){
    let itemPerPage = 3;
    let totalPage = Math.ceil(list.length / itemPerPage);
    // console.log(totalPage);
    let firstPage = currentPage-2;
    let lastPage = currentPage+2;
    if(firstPage <= 0){
        firstPage=1;
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
    for(let i=firstPage; i<=lastPage; i++){
        if(currentPage == i){
            eleUl.innerHTML += `<li><a href="" class="page-number active-page">${i}</a></li>`;
        }
        else eleUl.innerHTML += `<li><a href="" class="page-number">${i}</a></li>`;
    }
    eleUl.innerHTML += `<li><a href="" class="right-page">></a></li>`;
    document.querySelector(main).querySelector(".content .list-page").innerHTML = eleUl.outerHTML;
    //------------------------------------------
    //-----In ra danh sách list---------
    let start = (currentPage-1) * itemPerPage;
    let end = start + itemPerPage;
    showList(start, end, currentPage);
    //------------------------------------------
    //--gán sự kiện----
    document.querySelector(main).querySelector(".left-page").onclick = (e) => {
        e.preventDefault();
        if(currentPage-1>0){
            createPage(list, currentPage-1, showList, main);
        }
    };
    document.querySelector(main).querySelector(".right-page").onclick = (e) => {
        e.preventDefault();
        if(currentPage+1<=totalPage){
            createPage(list, currentPage+1, showList, main);
        }
    };
    document.querySelector(main).querySelectorAll(".page-number").forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            createPage(list, parseInt(obj.textContent), showList, main);
        }
    });
}

export function pagination(list, currentPage, showList, main){
    createPage(list, currentPage, showList, main);
}

export function showListProduct(start, end, currentPage) {
    let productList = JSON.parse(localStorage.getItem('productList')) || [];
    if (productList.length == 0) {
        productList = [...productItemArray];
        localStorage.setItem("productList", JSON.stringify(productList));
    }

    //tạo danh sách sản phẩm từ mảng chèn vô bảng table
    let product = `
    <thead>
        <tr>
            <th class="picture-list">Hình ảnh</th>
            <th class="id-list">Mã</th>
            <th class="name-list">Tên</th>
            <th class="brand-list">Thương hiệu</th>
            <th class="category-list">Loại</th>
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
}

export function showListCustomer(start, end, currentPage){
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if(userList.length ==0){
        userList = [...usersList];
    }
    let user = `
    <thead>
        <tr>
            <th class="id-user-list">Id</th>
            <th class="username-list">Tài khoản</th>
            <th class="fullname-list">Họ tên</th>
            <th class="edit-user">Chỉnh sửa</th>
        </tr>
    </thead>
    `;
    let eleTbody = document.createElement("tbody");
    userList.forEach((ele, index) => {
        if(index >= start && index < end){
            eleTbody.innerHTML += `
                <tr>
                    <td id="id-user">${ele.id}</td>
                    <td id="username">${ele.username}</td>
                    <td id="fullname">${(ele.first_name ? ele.first_name : 'chưa') + " " + (ele.last_name ? ele.last_name : 'có')}</td>
                    <td>
                        <a href="" class="edit-customer" index-item=${index}>Sửa</a>
                        <a href="" class="delete-customer" index-item=${index}>Xóa</a>
                    </td>
                </tr>
            `;
        }
    });
    user += eleTbody.outerHTML;
    document.querySelector(".content .content-customer-list table").innerHTML = user;
    deleteCustomer();
    editCustomer(currentPage);
}